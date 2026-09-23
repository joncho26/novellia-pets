import { useEffect, useId, useState, type FormEvent } from 'react'
import { getVaccinesForPet, updateImmunization } from '../../api/client'
import type { PetDetailResponse } from '../../api/types'
import { toDateOnly } from '../../dates'
import {
  immunizationDraftFrom,
  validateImmunizationDraft,
  type ImmunizationDraftErrors,
} from '../fields/immunizationDraft'
import { AttachmentModalShell } from './AttachmentModalShell'
import { ImmunizationDraftFields, type VaccineOption } from '../fields/ImmunizationDraftFields'

type EditImmunizationModalProps = {
  immunization: PetDetailResponse['immunizations'][number]
  // Needed to load the catalog the vaccine dropdown is chosen from. The
  // immunization row itself carries only the vaccine, not the pet.
  petId: string
  onClose: () => void
  onSaved: () => void
}

export function EditImmunizationModal({
  immunization,
  petId,
  onClose,
  onSaved,
}: EditImmunizationModalProps) {
  const fieldId = useId()
  const [draft, setDraft] = useState(() => immunizationDraftFrom(immunization))
  const [errors, setErrors] = useState<ImmunizationDraftErrors>({})
  const [error, setError] = useState<string | null>(null)
  const [isSaving, setIsSaving] = useState(false)

  // Seeded with the vaccine already on this row, so the dropdown shows the
  // right name immediately rather than blanking until the catalog arrives.
  const [vaccines, setVaccines] = useState<VaccineOption[]>([immunization.vaccine])

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
      await updateImmunization(immunization.id, {
        vaccineId: draft.vaccineId,
        dateAdministered: toDateOnly(draft.dateAdministered as Date),
        nextDueDate: draft.nextDueDate ? toDateOnly(draft.nextDueDate) : null,
      })
      onSaved()
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'Something went wrong.')
      setIsSaving(false)
    }
  }

  return (
    <AttachmentModalShell
      title="Edit immunization"
      submitLabel="Save changes"
      busyLabel="Saving…"
      isSaving={isSaving}
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
