import { useEffect, useId, useState, type FormEvent } from 'react'
import { createImmunization, getVaccinesForPet } from '../api/client'
import type { VaccineResponse } from '../api/types'
import { toDateOnly } from '../dates'
import {
  emptyImmunizationDraft,
  validateImmunizationDraft,
  type ImmunizationDraftErrors,
} from '../immunizationDraft'
import { AttachmentModalShell } from './AttachmentModalShell'
import { ImmunizationDraftFields } from './ImmunizationDraftFields'

type AddImmunizationModalProps = {
  petId: string
  medicalRecordId?: string | null
  onClose: () => void
  onCreated: () => void
}

export function AddImmunizationModal({
  petId,
  medicalRecordId,
  onClose,
  onCreated,
}: AddImmunizationModalProps) {
  const fieldId = useId()
  const [draft, setDraft] = useState(emptyImmunizationDraft)
  const [errors, setErrors] = useState<ImmunizationDraftErrors>({})
  const [error, setError] = useState<string | null>(null)
  const [isSaving, setIsSaving] = useState(false)

  // Unlike the other three, this form cannot be completed without the catalog:
  // vaccineId is a foreign key, not free text.
  const [vaccines, setVaccines] = useState<VaccineResponse[]>([])

  useEffect(() => {
    let isCurrent = true

    getVaccinesForPet(petId)
      .then((catalog) => {
        if (isCurrent) setVaccines(catalog)
      })
      .catch(() => {
        if (isCurrent) setError('The vaccine list could not be loaded.')
      })

    return () => {
      isCurrent = false
    }
  }, [petId])

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const nextErrors = validateImmunizationDraft(draft)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    setIsSaving(true)
    setError(null)

    try {
      await createImmunization(petId, {
        vaccineId: draft.vaccineId,
        dateAdministered: toDateOnly(draft.dateAdministered as Date),
        nextDueDate: draft.nextDueDate ? toDateOnly(draft.nextDueDate) : null,
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
      title="Add an immunization"
      submitLabel="Add immunization"
      isSaving={isSaving || vaccines.length === 0}
      error={error}
      onSubmit={handleSubmit}
      onClose={onClose}
    >
      <ImmunizationDraftFields
        draft={draft}
        index={0}
        errors={errors}
        fieldId={fieldId}
        vaccines={vaccines}
        onChange={(patch) => {
          setDraft((current) => ({ ...current, ...patch }))
          setErrors({})
        }}
      />
    </AttachmentModalShell>
  )
}
