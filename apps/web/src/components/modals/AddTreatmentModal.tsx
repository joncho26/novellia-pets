import { useId, useState, type FormEvent } from 'react'
import { createTreatment } from '../../api/client'
import { toDateOnly } from '../../dates'
import {
  emptyTreatmentDraft,
  validateTreatmentDraft,
  type TreatmentDraftErrors,
} from '../fields/treatmentDraft'
import { AttachmentModalShell } from './AttachmentModalShell'
import { TreatmentDraftFields } from '../fields/TreatmentDraftFields'

type AddTreatmentModalProps = {
  petId: string
  medicalRecordId?: string | null
  onClose: () => void
  onCreated: () => void
}

export function AddTreatmentModal({
  petId,
  medicalRecordId,
  onClose,
  onCreated,
}: AddTreatmentModalProps) {
  const fieldId = useId()
  const [draft, setDraft] = useState(emptyTreatmentDraft)
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
      await createTreatment(petId, {
        name: draft.name.trim(),
        date: toDateOnly(draft.date as Date),
        notes: draft.notes.trim() || null,
        medicalRecordId: medicalRecordId ?? null,
      })
      onCreated()
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'Something went wrong.')
      setIsSaving(false)
    }
  }

  return (
    <AttachmentModalShell
      title="Add a treatment"
      submitLabel="Add treatment"
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
