import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { PrismaService } from '../prisma/prisma.service';
import { MedicationStatus, PetType, WeightUnit } from '../generated/prisma/enums';

// "Now" is pinned so that "overdue" and "in the future" mean something fixed.
const NOW = new Date('2026-06-15T12:00:00.000Z');

const OWNER_ID = 'owner-1';

function immunization(overrides: {
    id: string;
    vaccineId: string;
    name: string;
    dateAdministered: string;
    nextDueDate?: string | null;
}) {
    return {
        id: overrides.id,
        vaccineId: overrides.vaccineId,
        dateAdministered: new Date(overrides.dateAdministered),
        nextDueDate: overrides.nextDueDate ? new Date(overrides.nextDueDate) : null,
        vaccine: { name: overrides.name },
    };
}

function pet(overrides: Partial<Record<string, unknown>> = {}) {
    return {
        id: 'pet-1',
        name: 'Biscuit',
        type: PetType.DOG,
        weight: 10,
        weightUnit: WeightUnit.LB,
        medications: [],
        diagnostics: [],
        immunizations: [],
        ...overrides,
    };
}

describe('DashboardService', () => {
    let service: DashboardService;
    let prisma: {
        petOwner: { findFirst: ReturnType<typeof vi.fn>; findUnique: ReturnType<typeof vi.fn> };
        pet: { findMany: ReturnType<typeof vi.fn> };
    };

    beforeEach(async () => {
        vi.useFakeTimers();
        vi.setSystemTime(NOW);

        prisma = {
            petOwner: {
                findFirst: vi.fn().mockResolvedValue({ id: OWNER_ID }),
                findUnique: vi.fn().mockResolvedValue({ id: OWNER_ID }),
            },
            pet: { findMany: vi.fn().mockResolvedValue([]) },
        };

        const module: TestingModule = await Test.createTestingModule({
            providers: [DashboardService, { provide: PrismaService, useValue: prisma }],
        }).compile();

        service = module.get(DashboardService);
    });

    afterEach(() => {
        vi.useRealTimers();
    });

    describe('owner scoping', () => {
        it('only asks for pets belonging to the owner', async () => {
            await service.getDashboardByOwnerId(OWNER_ID);

            // Without this the dashboard returns every pet in the database,
            // which is how one owner ends up looking at another's animals.
            expect(prisma.pet.findMany).toHaveBeenCalledWith(
                expect.objectContaining({ where: { ownerId: OWNER_ID } }),
            );
        });

        it('reports the owner it resolved alongside the pets', async () => {
            const view = await service.getDashboardByOwnerId(OWNER_ID);

            expect(view).toEqual({ ownerId: OWNER_ID, pets: [] });
        });

        it('rejects an owner that does not exist', async () => {
            prisma.petOwner.findUnique.mockResolvedValue(null);

            await expect(service.getDashboardByOwnerId('nobody')).rejects.toThrow(
                NotFoundException,
            );
        });

        it('rejects when the database holds no owners at all', async () => {
            prisma.petOwner.findFirst.mockResolvedValue(null);

            await expect(service.getDashboard()).rejects.toThrow(NotFoundException);
        });
    });

    describe('next immunization', () => {
        it('is the soonest due date across vaccines', async () => {
            prisma.pet.findMany.mockResolvedValue([
                pet({
                    immunizations: [
                        immunization({ id: 'i1', vaccineId: 'rabies', name: 'Rabies', dateAdministered: '2026-01-01', nextDueDate: '2029-01-01' }),
                        immunization({ id: 'i2', vaccineId: 'distemper', name: 'Distemper', dateAdministered: '2026-02-01', nextDueDate: '2027-02-01' }),
                    ],
                }),
            ]);

            const { pets } = await service.getDashboardByOwnerId(OWNER_ID);

            expect(pets[0].nextImmunization?.name).toBe('Distemper');
        });

        it('ignores a due date that a later dose of the same vaccine has satisfied', async () => {
            prisma.pet.findMany.mockResolvedValue([
                pet({
                    // Ordered newest first, as the query asks for.
                    immunizations: [
                        immunization({ id: 'new', vaccineId: 'rabies', name: 'Rabies', dateAdministered: '2026-05-01', nextDueDate: '2029-05-01' }),
                        immunization({ id: 'old', vaccineId: 'rabies', name: 'Rabies', dateAdministered: '2023-05-01', nextDueDate: '2026-05-01' }),
                    ],
                }),
            ]);

            const { pets } = await service.getDashboardByOwnerId(OWNER_ID);

            // The old dose's due date has passed, but the booster already
            // covered it — reporting it would cry wolf.
            expect(pets[0].nextImmunization?.nextDueDate).toEqual(new Date('2029-05-01'));
            expect(pets[0].nextImmunization?.isOverdue).toBe(false);
        });

        it('marks a genuinely missed dose overdue', async () => {
            prisma.pet.findMany.mockResolvedValue([
                pet({
                    immunizations: [
                        immunization({ id: 'i1', vaccineId: 'rabies', name: 'Rabies', dateAdministered: '2023-01-01', nextDueDate: '2026-01-01' }),
                    ],
                }),
            ]);

            const { pets } = await service.getDashboardByOwnerId(OWNER_ID);

            expect(pets[0].nextImmunization?.isOverdue).toBe(true);
        });

        it('is null when no dose carries a due date', async () => {
            prisma.pet.findMany.mockResolvedValue([
                pet({
                    immunizations: [
                        immunization({ id: 'i1', vaccineId: 'rabies', name: 'Rabies', dateAdministered: '2026-01-01', nextDueDate: null }),
                    ],
                }),
            ]);

            const { pets } = await service.getDashboardByOwnerId(OWNER_ID);

            expect(pets[0].nextImmunization).toBeNull();
        });
    });

    describe('last immunization', () => {
        it('ignores doses dated in the future', async () => {
            prisma.pet.findMany.mockResolvedValue([
                pet({
                    immunizations: [
                        immunization({ id: 'future', vaccineId: 'rabies', name: 'Rabies', dateAdministered: '2026-12-01' }),
                        immunization({ id: 'past', vaccineId: 'distemper', name: 'Distemper', dateAdministered: '2026-03-01' }),
                    ],
                }),
            ]);

            const { pets } = await service.getDashboardByOwnerId(OWNER_ID);

            // A dose scheduled for December has not been given yet.
            expect(pets[0].lastImmunization?.name).toBe('Distemper');
        });

        it('is null for a pet with no immunizations', async () => {
            prisma.pet.findMany.mockResolvedValue([pet()]);

            const { pets } = await service.getDashboardByOwnerId(OWNER_ID);

            expect(pets[0].lastImmunization).toBeNull();
        });
    });

    describe('shape', () => {
        it('only asks the database for active, unexpired medications', async () => {
            await service.getDashboardByOwnerId(OWNER_ID);

            const [query] = prisma.pet.findMany.mock.calls[0];
            expect(query.select.medications.where).toEqual({
                status: MedicationStatus.ACTIVE,
                OR: [{ endDate: null }, { endDate: { gte: NOW } }],
            });
        });

        it('carries weight as a value and unit rather than two loose fields', async () => {
            prisma.pet.findMany.mockResolvedValue([pet({ weight: 9.5, weightUnit: WeightUnit.KG })]);

            const { pets } = await service.getDashboardByOwnerId(OWNER_ID);

            expect(pets[0].weight).toEqual({ value: 9.5, unit: WeightUnit.KG });
        });
    });
});
