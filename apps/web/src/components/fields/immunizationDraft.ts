import type { PetDetailResponse } from '../../api/types'
import { parseDateOnly } from '../../dates'
import type { DraftErrors } from './useDrafts'

// An immunization the user has typed into the form but not yet saved. Unlike
// the other attachments, its identity is a foreign key into the vaccine
// catalog rather than free text.
export type ImmunizationDraft = {
  key: string
  vaccineId: string
  dateAdministered: Date | undefined
  nextDueDate: Date | undefined
}

export type ImmunizationDraftErrors = DraftErrors<ImmunizationDraft>

export function emptyImmunizationDraft(): ImmunizationDraft {
  return {
    key: crypto.randomUUID(),
    vaccineId: '',
    dateAdministered: undefined,
    nextDueDate: undefined,
  }
}

export function immunizationDraftFrom(
  immunization: PetDetailResponse['immunizations'][number],
): ImmunizationDraft {
  return {
    key: immunization.id,
    vaccineId: immunization.vaccineId,
    dateAdministered: parseDateOnly(immunization.dateAdministered),
    nextDueDate: immunization.nextDueDate ? parseDateOnly(immunization.nextDueDate) : undefined,
  }
}

export function validateImmunizationDraft(draft: ImmunizationDraft): ImmunizationDraftErrors {
  const errors: ImmunizationDraftErrors = {}

  if (!draft.vaccineId) errors.vaccineId = 'Vaccine is required.'
  if (!draft.dateAdministered) errors.dateAdministered = 'Date administered is required.'

  if (draft.dateAdministered && draft.nextDueDate && draft.nextDueDate < draft.dateAdministered) {
    errors.nextDueDate = 'Next due date is before the date administered.'
  }

  return errors
}
