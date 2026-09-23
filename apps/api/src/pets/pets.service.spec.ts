import { Test, TestingModule } from '@nestjs/testing';
import { HttpException, NotFoundException } from '@nestjs/common';
import { PetsService } from './pets.service';
import { PrismaService } from '../prisma/prisma.service';
import { ContactRelation } from '../generated/prisma/enums';

const PET_ID = 'pet-1';
const OWNER_ID = 'owner-1';

describe('PetsService', () => {
    let service: PetsService;
    let prisma: Record<string, any>;
    // Every call made inside the transaction, in order, so the test can assert
    // that children go before the pet rather than just that they all ran.
    let txCalls: string[];

    beforeEach(async () => {
        txCalls = [];

        const record = (name: string) =>
            vi.fn(async () => {
                txCalls.push(name);
                return { count: 0 };
            });

        const tx = {
            medication: { deleteMany: record('medication.deleteMany') },
            treatment: { deleteMany: record('treatment.deleteMany') },
            diagnostic: { deleteMany: record('diagnostic.deleteMany') },
            immunization: { deleteMany: record('immunization.deleteMany') },
            emergencyContact: { updateMany: record('emergencyContact.updateMany') },
            medicalRecord: { deleteMany: record('medicalRecord.deleteMany') },
            pet: {
                delete: vi.fn(async () => {
                    txCalls.push('pet.delete');
                    return { id: PET_ID, name: 'Biscuit' };
                }),
            },
        };

        prisma = {
            pet: {
                findUnique: vi.fn().mockResolvedValue({ id: PET_ID, ownerId: OWNER_ID }),
                findMany: vi.fn(),
                create: vi.fn(),
                update: vi.fn().mockResolvedValue({ id: PET_ID }),
            },
            emergencyContact: { findMany: vi.fn().mockResolvedValue([]) },
            $transaction: vi.fn(async (callback: (client: typeof tx) => unknown) => callback(tx)),
            __tx: tx,
        };

        const module: TestingModule = await Test.createTestingModule({
            providers: [PetsService, { provide: PrismaService, useValue: prisma }],
        }).compile();

        service = module.get(PetsService);
    });

    describe('deletePetById', () => {
        it('refuses a pet that does not exist', async () => {
            prisma.pet.findUnique.mockResolvedValue(null);

            await expect(service.deletePetById(PET_ID)).rejects.toThrow(HttpException);
            expect(prisma.$transaction).not.toHaveBeenCalled();
        });

        it('removes the whole history before the pet, in one transaction', async () => {
            await service.deletePetById(PET_ID);

            expect(prisma.$transaction).toHaveBeenCalledTimes(1);
            // Each attachment's petId is NOT NULL, so the database refuses to
            // delete the pet while any of them still points at it.
            expect(txCalls).toEqual([
                'medication.deleteMany',
                'treatment.deleteMany',
                'diagnostic.deleteMany',
                'immunization.deleteMany',
                'emergencyContact.updateMany',
                'medicalRecord.deleteMany',
                'pet.delete',
            ]);
        });

        it('unlinks emergency contacts rather than deleting them', async () => {
            await service.deletePetById(PET_ID);

            // They belong to the owner too, so they outlive the pet.
            expect(prisma.__tx.emergencyContact.updateMany).toHaveBeenCalledWith({
                where: { petId: PET_ID },
                data: { petId: null },
            });
        });

        it('returns the deleted pet, not a count', async () => {
            await expect(service.deletePetById(PET_ID)).resolves.toEqual({
                id: PET_ID,
                name: 'Biscuit',
            });
        });
    });

    describe('getVetContactsByPetId', () => {
        it('returns null for a pet that does not exist', async () => {
            prisma.pet.findUnique.mockResolvedValue(null);

            await expect(service.getVetContactsByPetId(PET_ID)).resolves.toBeNull();
        });

        it("asks only for the owner's vets", async () => {
            await service.getVetContactsByPetId(PET_ID);

            expect(prisma.emergencyContact.findMany).toHaveBeenCalledWith(
                expect.objectContaining({
                    where: { petOwnerId: OWNER_ID, relationship: ContactRelation.VET },
                }),
            );
        });

        it('selects names only, not phone numbers and emails', async () => {
            await service.getVetContactsByPetId(PET_ID);

            const [query] = prisma.emergencyContact.findMany.mock.calls[0];
            expect(query.select).toEqual({ id: true, firstName: true, lastName: true });
        });
    });

    describe('updatePetById', () => {
        it('refuses a pet that does not exist', async () => {
            prisma.pet.findUnique.mockResolvedValue(null);

            await expect(service.updatePetById(PET_ID, { name: 'New' })).rejects.toThrow(
                HttpException,
            );
            expect(prisma.pet.update).not.toHaveBeenCalled();
        });

        it('checks existence without pulling the pet’s whole history', async () => {
            await service.updatePetById(PET_ID, { name: 'New' });

            // A lean lookup: an update should not fetch every medication and
            // visit just to decide whether the row is there.
            const [query] = prisma.pet.findUnique.mock.calls[0];
            expect(query.select).toEqual({ id: true });
            expect(query.include).toBeUndefined();
        });
    });
});

// Keeps the import list honest: NotFoundException is what the vet-contacts
// controller turns a null into, and is asserted there rather than here.
void NotFoundException;
