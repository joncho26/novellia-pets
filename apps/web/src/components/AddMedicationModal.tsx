import { useId, useState, type FormEvent } from 'react'
import { DosageUnit, MedicationStatus } from '@api/generated/prisma/enums'
import { createMedication } from '../api/client'
import { toDateOnly } from '../dates'
import {
  emptyMedicationDraft,
  validateMedicationDraft,
  type MedicationDraftErrors,
} from '../medicationDraft'
import { AttachmentModalShell } from './AttachmentModalShell'
import { MedicationDraftFields } from './MedicationDraftFields'

type AddMedicationModalProps = {
  petId: string
  // Omitted or null files the medication on the pet without a visit.
  medicalRecordId?: string | null
  onClose: () => void
  onCreated: () => void
}

export function AddMedicationModal({
  petId,
  medicalRecordId,
  onClose,
  onCreated,
}: AddMedicationModalProps) {
  const fieldId = useId()
  const [draft, setDraft] = useState(emptyMedicationDraft)
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
      await createMedication(petId, {
        name: draft.name.trim(),
        dosageAmount: Number(draft.dosageAmount),
        dosageUnit: draft.dosageUnit as DosageUnit,
        frequency: draft.frequency.trim(),
        startDate: toDateOnly(draft.startDate as Date),
        endDate: draft.endDate ? toDateOnly(draft.endDate) : null,
        status: draft.status as MedicationStatus,
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
      title="Add a medication"
      submitLabel="Add medication"
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
