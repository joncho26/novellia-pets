import type { DosageUnit, MedicationStatus } from '@api/generated/prisma/enums'
import type { PetDetailResponse } from './api/types'
import { parseDateOnly } from './dates'
import type { DraftErrors } from './useDrafts'

// A medication the user has typed into the form but not yet saved. `key` is a
// client-side identity for React and for keeping errors attached to the right
// draft — it never reaches the API.
export type MedicationDraft = {
  key: string
  name: string
  dosageAmount: string
  dosageUnit: DosageUnit | ''
  frequency: string
  startDate: Date | undefined
  endDate: Date | undefined
  status: MedicationStatus | ''
}

export type MedicationDraftErrors = DraftErrors<MedicationDraft>

export function emptyMedicationDraft(): MedicationDraft {
  return {
    key: crypto.randomUUID(),
    name: '',
    dosageAmount: '',
    dosageUnit: '',
    frequency: '',
    startDate: undefined,
    endDate: undefined,
    status: '',
  }
}

// A saved medication, filled back into the form that created it. The dates go
// through parseDateOnly so the calendar opens on the stored day rather than the
// one before it.
export function medicationDraftFrom(
  medication: PetDetailResponse['medications'][number],
): MedicationDraft {
  return {
    key: medication.id,
    name: medication.name,
    dosageAmount: String(medication.dosageAmount),
    dosageUnit: medication.dosageUnit,
    frequency: medication.frequency,
    startDate: parseDateOnly(medication.startDate),
    endDate: medication.endDate ? parseDateOnly(medication.endDate) : undefined,
    status: medication.status,
  }
}

export function validateMedicationDraft(draft: MedicationDraft): MedicationDraftErrors {
  const errors: MedicationDraftErrors = {}

  if (!draft.name.trim()) errors.name = 'Name is required.'
  if (!draft.dosageUnit) errors.dosageUnit = 'Unit is required.'
  if (!draft.frequency.trim()) errors.frequency = 'Frequency is required.'
  if (!draft.startDate) errors.startDate = 'Start date is required.'
  if (!draft.status) errors.status = 'Status is required.'

  const amount = Number(draft.dosageAmount)
  if (!draft.dosageAmount.trim()) errors.dosageAmount = 'Dosage is required.'
  else if (!Number.isFinite(amount) || amount <= 0) errors.dosageAmount = 'Must be more than 0.'

  if (draft.startDate && draft.endDate && draft.endDate < draft.startDate) {
    errors.endDate = 'End date is before the start date.'
  }

  return errors
}
