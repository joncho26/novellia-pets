import { useId, useState, type FormEvent } from 'react'
import { updateTreatment } from '../api/client'
import type { PetDetailResponse } from '../api/types'
import { toDateOnly } from '../dates'
import {
  treatmentDraftFrom,
  validateTreatmentDraft,
  type TreatmentDraftErrors,
} from '../treatmentDraft'
import { AttachmentModalShell } from './AttachmentModalShell'
import { TreatmentDraftFields } from './TreatmentDraftFields'

type EditTreatmentModalProps = {
  treatment: PetDetailResponse['treatments'][number]
  onClose: () => void
  onSaved: () => void
}

export function EditTreatmentModal({ treatment, onClose, onSaved }: EditTreatmentModalProps) {
  const fieldId = useId()
  const [draft, setDraft] = useState(() => treatmentDraftFrom(treatment))
  const [errors, setErrors] = useState<TreatmentDraftErrors>({})
  const [error, setError] = useState<string | null>(null)
  const [isSaving, setIsSaving] = useState(false)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const nextErrors = validateTreatmentDraft(draft)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    setIsSaving(true)
    setError(null)

    try {
      // Every field is sent, not just the changed ones: the form holds the
      // whole treatment, so a diff could only disagree with it.
      await updateTreatment(treatment.id, {
        name: draft.name.trim(),
        date: toDateOnly(draft.date as Date),
        notes: draft.notes.trim() || null,
      })
      onSaved()
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'Something went wrong.')
      setIsSaving(false)
    }
  }

  return (
    <AttachmentModalShell
      title="Edit treatment"
      submitLabel="Save changes"
      busyLabel="Saving…"
      isSaving={isSaving}
      error={error}
      onSubmit={handleSubmit}
      onClose={onClose}
    >
      <TreatmentDraftFields
        draft={draft}
        index={0}
        errors={errors}
        fieldId={fieldId}
        onChange={(patch) => {
          setDraft((current) => ({ ...current, ...patch }))
          setErrors({})
        }}
      />
    </AttachmentModalShell>
  )
}
