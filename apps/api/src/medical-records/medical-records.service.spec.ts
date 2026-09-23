import { Test, TestingModule } from '@nestjs/testing';
import { HttpException, NotFoundException } from '@nestjs/common';
import { MedicalRecordsService } from './medical-records.service';
import { PrismaService } from '../prisma/prisma.service';

const PET_ID = 'pet-1';
const RECORD_ID = 'record-1';

describe('MedicalRecordsService', () => {
    let service: MedicalRecordsService;
    let prisma: Record<string, any>;

    beforeEach(async () => {
        prisma = {
            pet: { findUnique: vi.fn().mockResolvedValue({ id: PET_ID }) },
            medicalRecord: {
                create: vi.fn().mockResolvedValue({ id: RECORD_ID }),
                findMany: vi.fn().mockResolvedValue([]),
                findUnique: vi.fn().mockResolvedValue({ id: RECORD_ID, petId: PET_ID }),
                update: vi.fn().mockResolvedValue({ id: RECORD_ID }),
                delete: vi.fn().mockResolvedValue({ id: RECORD_ID }),
            },
        };

        const module: TestingModule = await Test.createTestingModule({
            providers: [MedicalRecordsService, { provide: PrismaService, useValue: prisma }],
        }).compile();

        service = module.get(MedicalRecordsService);
    });

    describe('createMedicalRecord', () => {
        it('refuses a pet that does not exist', async () => {
            prisma.pet.findUnique.mockResolvedValue(null);

            // Without this the foreign key fails at the database and surfaces
            // as a bare 500 instead of a 404 naming the problem.
            await expect(service.createMedicalRecord('nobody', { recordDate: new Date() })).rejects.toThrow(
                NotFoundException,
            );
            expect(prisma.medicalRecord.create).not.toHaveBeenCalled();
        });

        it('stamps the pet from the URL onto the record', async () => {
            await service.createMedicalRecord(PET_ID, { recordDate: new Date('2026-02-01') });

            const [query] = prisma.medicalRecord.create.mock.calls[0];
            expect(query.data).toEqual(
                expect.objectContaining({ petId: PET_ID, recordDate: new Date('2026-02-01') }),
            );
        });

        it('passes nested children through untouched, so they are written in the same transaction', async () => {
            const children = {
                recordDate: new Date('2026-02-01'),
                medications: { create: [{ name: 'Amoxicillin', petId: PET_ID }] },
                treatments: { create: [{ name: 'Nail trim', petId: PET_ID }] },
            };

            await service.createMedicalRecord(PET_ID, children as never);

            const [query] = prisma.medicalRecord.create.mock.calls[0];
            expect(query.data.medications).toEqual(children.medications);
            expect(query.data.treatments).toEqual(children.treatments);
        });

        it('returns the record with its children, so the caller need not re-read it', async () => {
            await service.createMedicalRecord(PET_ID, { recordDate: new Date() });

            const [query] = prisma.medicalRecord.create.mock.calls[0];
            expect(query.include).toEqual({
                treatments: true,
                immunizations: true,
                diagnostics: true,
                medications: true,
            });
        });
    });

    describe('getMedicalRecordsByPetId', () => {
        it('refuses a pet that does not exist', async () => {
            prisma.pet.findUnique.mockResolvedValue(null);

            await expect(service.getMedicalRecordsByPetId('nobody')).rejects.toThrow(
                NotFoundException,
            );
        });

        it('returns the pet’s visits newest first', async () => {
            await service.getMedicalRecordsByPetId(PET_ID);

            expect(prisma.medicalRecord.findMany).toHaveBeenCalledWith({
                where: { petId: PET_ID },
                orderBy: { recordDate: 'desc' },
            });
        });

        it('leaves the children out — this is a list, not five nested ones', async () => {
            await service.getMedicalRecordsByPetId(PET_ID);

            const [query] = prisma.medicalRecord.findMany.mock.calls[0];
            expect(query.include).toBeUndefined();
        });
    });

    describe('getMedicalRecordById', () => {
        it('joins the pet and the linked vet', async () => {
            await service.getMedicalRecordById(RECORD_ID);

            const [query] = prisma.medicalRecord.findUnique.mock.calls[0];
            expect(query.include.pet).toEqual({ select: { id: true, name: true, type: true } });
            expect(query.include.vet).toEqual({
                select: { id: true, firstName: true, lastName: true },
            });
        });

        it('orders every child list newest first', async () => {
            await service.getMedicalRecordById(RECORD_ID);

            const { include } = prisma.medicalRecord.findUnique.mock.calls[0][0];
            expect(include.treatments.orderBy).toEqual({ date: 'desc' });
            expect(include.diagnostics.orderBy).toEqual({ date: 'desc' });
            expect(include.medications.orderBy).toEqual({ startDate: 'desc' });
            expect(include.immunizations.orderBy).toEqual({ dateAdministered: 'desc' });
        });

        it('joins each immunization to its vaccine', async () => {
            await service.getMedicalRecordById(RECORD_ID);

            // A bare immunization is two dates and a foreign key; without the
            // join there is no vaccine name to render.
            const { include } = prisma.medicalRecord.findUnique.mock.calls[0][0];
            expect(include.immunizations.include).toEqual({ vaccine: true });
        });
    });

    describe('getMedicalRecordRefById', () => {
        it('reads two fields, not the whole visit', async () => {
            await service.getMedicalRecordRefById(RECORD_ID);

            // Update and delete use this. Pointing them back at the full read
            // would fetch every child just to test for null.
            expect(prisma.medicalRecord.findUnique).toHaveBeenCalledWith({
                where: { id: RECORD_ID },
                select: { id: true, petId: true },
            });
        });
    });

    describe('deleteMedicalRecordById', () => {
        it('refuses a record that does not exist', async () => {
            prisma.medicalRecord.findUnique.mockResolvedValue(null);

            await expect(service.deleteMedicalRecordById(RECORD_ID)).rejects.toThrow(HttpException);
            expect(prisma.medicalRecord.delete).not.toHaveBeenCalled();
        });

        it('checks existence with the lean lookup', async () => {
            await service.deleteMedicalRecordById(RECORD_ID);

            const [query] = prisma.medicalRecord.findUnique.mock.calls[0];
            expect(query.select).toEqual({ id: true, petId: true });
            expect(query.include).toBeUndefined();
        });
    });

    describe('updateMedicalRecordById', () => {
        it('refuses a record that does not exist', async () => {
            prisma.medicalRecord.findUnique.mockResolvedValue(null);

            await expect(service.updateMedicalRecordById(RECORD_ID, { notes: 'x' })).rejects.toThrow(
                HttpException,
            );
            expect(prisma.medicalRecord.update).not.toHaveBeenCalled();
        });

        it('checks existence with the lean lookup', async () => {
            await service.updateMedicalRecordById(RECORD_ID, { notes: 'x' });

            const [query] = prisma.medicalRecord.findUnique.mock.calls[0];
            expect(query.select).toEqual({ id: true, petId: true });
        });

        it('applies the changes it was given', async () => {
            await service.updateMedicalRecordById(RECORD_ID, { notes: 'Updated', vetName: null });

            const [query] = prisma.medicalRecord.update.mock.calls[0];
            expect(query.where).toEqual({ id: RECORD_ID });
            // null is how a field gets cleared, so it has to survive the trip.
            expect(query.data).toEqual({ notes: 'Updated', vetName: null });
        });
    });
});
