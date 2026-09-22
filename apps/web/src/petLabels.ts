import {
  DiagnosticType,
  DosageUnit,
  MedicationStatus,
  PetSex,
  PetType,
  WeightUnit,
} from '@api/generated/prisma/enums'
import { Bird, Cat, Dog, type LucideIcon } from 'lucide-react'

// Exhaustive by construction: adding a value to one of these Prisma enums
// breaks this at compile time instead of rendering a blank label.
export const PET_TYPE_LABEL: Record<PetType, string> = {
  [PetType.DOG]: 'Dog',
  [PetType.CAT]: 'Cat',
  [PetType.BIRD]: 'Bird',
}

// Same contract as the labels: a new species has to be given a face here
// before the app will compile.
export const PET_TYPE_ICON: Record<PetType, LucideIcon> = {
  [PetType.DOG]: Dog,
  [PetType.CAT]: Cat,
  [PetType.BIRD]: Bird,
}

export const PET_SEX_LABEL: Record<PetSex, string> = {
  [PetSex.MALE]: 'Male',
  [PetSex.FEMALE]: 'Female',
  [PetSex.UNKNOWN]: 'Unknown',
}

export const DIAGNOSTIC_TYPE_LABEL: Record<DiagnosticType, string> = {
  [DiagnosticType.BLOODWORK]: 'Bloodwork',
  [DiagnosticType.XRAY]: 'X-ray',
  [DiagnosticType.ULTRASOUND]: 'Ultrasound',
  [DiagnosticType.URINALYSIS]: 'Urinalysis',
  [DiagnosticType.FECAL]: 'Fecal',
  [DiagnosticType.BIOPSY]: 'Biopsy',
  [DiagnosticType.OTHER]: 'Other',
}

export const DOSAGE_UNIT_LABEL: Record<DosageUnit, string> = {
  [DosageUnit.MG]: 'mg',
  [DosageUnit.ML]: 'ml',
  [DosageUnit.TABLET]: 'tablet',
  [DosageUnit.DROP]: 'drop',
}

export const MEDICATION_STATUS_LABEL: Record<MedicationStatus, string> = {
  [MedicationStatus.ACTIVE]: 'Active',
  [MedicationStatus.COMPLETED]: 'Completed',
  [MedicationStatus.DISCONTINUED]: 'Discontinued',
  [MedicationStatus.UNKNOWN]: 'Unknown',
}

export const WEIGHT_UNIT_LABEL: Record<WeightUnit, string> = {
  [WeightUnit.LB]: 'lb',
  [WeightUnit.KG]: 'kg',
}
