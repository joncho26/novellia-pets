import { PetType } from "../../generated/prisma/enums";
// Type-only: the web app compiles this file under verbatimModuleSyntax.
import type {
    PetDetailDiagnostic,
    PetDetailImmunization,
    PetDetailMedication,
    PetDetailTreatment,
} from "../../pets/types/PetDetail";

// The shape GET /medical-records/:id returns: the visit, everything recorded
// during it, and enough of the pet to say whose visit it was.
export interface MedicalRecordDetail {
    id: string
    petId: string
    recordDate: Date
    vetContactId: string | null
    vetName: string | null
    notes: string | null
    createdAt: Date
    updatedAt: Date

    pet: { id: string; name: string; type: PetType }
    vet: { id: string; firstName: string; lastName: string } | null

    treatments: PetDetailTreatment[]
    diagnostics: PetDetailDiagnostic[]
    medications: PetDetailMedication[]
    immunizations: PetDetailImmunization[]
}
