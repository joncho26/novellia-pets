import { DiagnosticType, DosageUnit, PetType, WeightUnit } from "../../generated/prisma/enums";

export interface DashboardMedication {
    id: string
    name: string
    dosageAmount: number
    dosageUnit: DosageUnit
    frequency: string
    startDate: Date
    endDate: Date | null
}

export interface DashboardDiagnostic {
    id: string
    type: DiagnosticType
    date: Date
    result: string | null
    notes: string | null
}

export interface DashboardLastImmunization {
    id: string
    vaccineId: string
    name: string
    dateAdministered: Date
}

export interface DashboardNextImmunization {
    vaccineId: string
    name: string
    nextDueDate: Date
    isOverdue: boolean
}

export interface PetDashboard {
    petId: string
    name: string
    type: PetType
    weight: { value: number; unit: WeightUnit }
    currentMedications: DashboardMedication[]
    latestDiagnostic: DashboardDiagnostic | null
    lastImmunization: DashboardLastImmunization | null
    nextImmunization: DashboardNextImmunization | null
}
