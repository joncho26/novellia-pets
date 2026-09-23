import { useId, useState, type FormEvent } from 'react'
import { DosageUnit, MedicationStatus } from '@api/generated/prisma/enums'
import { updateMedication } from '../../api/client'
import type { PetDetailResponse } from '../../api/types'
import { toDateOnly } from '../../dates'
import {
  medicationDraftFrom,
  validateMedicationDraft,
  type MedicationDraftErrors,
} from '../fields/medicationDraft'
import { AttachmentModalShell } from './AttachmentModalShell'
import { MedicationDraftFields } from '../fields/MedicationDraftFields'

type EditMedicationModalProps = {
  medication: PetDetailResponse['medications'][number]
  onClose: () => void
  onSaved: () => void
}

export function EditMedicationModal({ medication, onClose, onSaved }: EditMedicationModalProps) {
  const fieldId = useId()
  const [draft, setDraft] = useState(() => medicationDraftFrom(medication))
  const [errors, setErrors] = useState<MedicationDraftErrors>({})
  const [error, setError] = useState<string | null>(null)
  const [isSaving, setIsSaving] = useState(false)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const nextErrors = validateMedicationDraft(draft)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    setIsSaving(true)
    setError(null)

    try {
      // Every field is sent, not just the changed ones: the form holds the
      // whole medication, so a diff would only risk disagreeing with it.
      await updateMedication(medication.id, {
        name: draft.name.trim(),
        dosageAmount: Number(draft.dosageAmount),
        dosageUnit: draft.dosageUnit as DosageUnit,
        frequency: draft.frequency.trim(),
        startDate: toDateOnly(draft.startDate as Date),
        endDate: draft.endDate ? toDateOnly(draft.endDate) : null,
        status: draft.status as MedicationStatus,
      })
      onSaved()
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'Something went wrong.')
      setIsSaving(false)
    }
  }

  return (
    <AttachmentModalShell
      title="Edit medication"
      submitLabel="Save changes"
      busyLabel="Saving…"
      isSaving={isSaving}
      error={error}
      onSubmit={handleSubmit}
      onClose={onClose}
    >
      <MedicationDraftFields
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
