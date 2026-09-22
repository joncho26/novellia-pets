import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { MedicationStatus } from "../generated/prisma/enums";
import { PetDashboard } from "./types/PetDashboard";

@Injectable()
export class DashboardService {
    constructor(private prisma: PrismaService) {}

    async getDashboard(): Promise<PetDashboard[]> {
        return this.getDashboardByOwnerId(await this.resolveCurrentOwnerId());
    }

    // Stands in for the authenticated owner until auth exists.
    private async resolveCurrentOwnerId(): Promise<string> {
        const owner = await this.prisma.petOwner.findFirst({ orderBy: { createdAt: 'asc' } });
        if (!owner) throw new NotFoundException('No pet owner found');

        return owner.id;
    }

    async getDashboardByOwnerId(ownerId: string): Promise<PetDashboard[]> {
        const owner = await this.prisma.petOwner.findUnique({ where: { id: ownerId } });
        if (!owner) throw new NotFoundException('Pet owner not found');

        const now = new Date();

        const pets = await this.prisma.pet.findMany({
            where: { ownerId },
            orderBy: { name: 'asc' },
            select: {
                id: true,
                name: true,
                type: true,
                weight: true,
                weightUnit: true,
                medications: {
                    where: {
                        status: MedicationStatus.ACTIVE,
                        OR: [{ endDate: null }, { endDate: { gte: now } }],
                    },
                    orderBy: { startDate: 'desc' },
                    select: {
                        id: true,
                        name: true,
                        dosageAmount: true,
                        dosageUnit: true,
                        frequency: true,
                        startDate: true,
                        endDate: true,
                    },
                },
                diagnostics: {
                    orderBy: { date: 'desc' },
                    take: 1,
                    select: { id: true, type: true, date: true, result: true, notes: true },
                },
                immunizations: {
                    orderBy: { dateAdministered: 'desc' },
                    select: {
                        id: true,
                        vaccineId: true,
                        dateAdministered: true,
                        nextDueDate: true,
                        vaccine: { select: { name: true } },
                    },
                },
            },
        });

        return pets.map((pet) => {
            const administered = pet.immunizations.filter((i) => i.dateAdministered <= now);

            // Only the latest dose of each vaccine carries a live due date; older
            // doses keep due dates that a later dose has already satisfied.
            const latestPerVaccine = new Map<string, (typeof administered)[number]>();
            for (const immunization of administered) {
                if (!latestPerVaccine.has(immunization.vaccineId)) {
                    latestPerVaccine.set(immunization.vaccineId, immunization);
                }
            }

            const last = administered[0];
            const next = [...latestPerVaccine.values()]
                .filter((i) => i.nextDueDate !== null)
                .sort((a, b) => a.nextDueDate!.getTime() - b.nextDueDate!.getTime())[0];

            return {
                petId: pet.id,
                name: pet.name,
                type: pet.type,
                weight: { value: pet.weight, unit: pet.weightUnit },
                currentMedications: pet.medications,
                latestDiagnostic: pet.diagnostics[0] ?? null,
                lastImmunization: last
                    ? {
                        id: last.id,
                        vaccineId: last.vaccineId,
                        name: last.vaccine.name,
                        dateAdministered: last.dateAdministered,
                    }
                    : null,
                nextImmunization: next
                    ? {
                        vaccineId: next.vaccineId,
                        name: next.vaccine.name,
                        nextDueDate: next.nextDueDate!,
                        isOverdue: next.nextDueDate! < now,
                    }
                    : null,
            };
        });
    }
}
