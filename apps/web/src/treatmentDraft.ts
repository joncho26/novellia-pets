import type { DraftErrors } from './useDrafts'

// A treatment the user has typed into the form but not yet saved.
export type TreatmentDraft = {
  key: string
  name: string
  date: Date | undefined
  notes: string
}

export type TreatmentDraftErrors = DraftErrors<TreatmentDraft>

export function emptyTreatmentDraft(): TreatmentDraft {
  return {
    key: crypto.randomUUID(),
    name: '',
    date: undefined,
    notes: '',
  }
}

export function validateTreatmentDraft(draft: TreatmentDraft): TreatmentDraftErrors {
  const errors: TreatmentDraftErrors = {}

  if (!draft.name.trim()) errors.name = 'Name is required.'
  if (!draft.date) errors.date = 'Date is required.'

  return errors
}
