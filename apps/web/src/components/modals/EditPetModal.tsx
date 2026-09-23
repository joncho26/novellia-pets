import { useId, useState, type FormEvent } from 'react'
import { PetSex, PetType } from '@api/generated/prisma/enums'
import { updatePet } from '../../api/client'
import type { PetDetailResponse } from '../../api/types'
import { toDateOnly } from '../../dates'
import { petFormFrom, validatePetForm, type PetFormErrors } from '../fields/petForm'
import { AttachmentModalShell } from './AttachmentModalShell'
import { PetFormFields } from '../fields/PetFormFields'

type EditPetModalProps = {
  pet: PetDetailResponse
  onClose: () => void
  onSaved: () => void
}

export function EditPetModal({ pet, onClose, onSaved }: EditPetModalProps) {
  const fieldId = useId()
  const [form, setForm] = useState(() => petFormFrom(pet))
  const [errors, setErrors] = useState<PetFormErrors>({})
  const [error, setError] = useState<string | null>(null)
  const [isSaving, setIsSaving] = useState(false)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const nextErrors = validatePetForm(form)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    setIsSaving(true)
    setError(null)

    try {
      // Every field is sent rather than a diff: the form holds them all
      // already, and a PATCH of the whole thing is the same write.
      await updatePet(pet.id, {
        name: form.name.trim(),
        type: form.type as PetType,
        breed: form.breed.trim() || null,
        dateOfBirth: toDateOnly(form.dateOfBirth as Date),
        weight: Number(form.weight),
        weightUnit: form.weightUnit,
        sex: form.sex as PetSex,
        neutered: form.neutered === '' ? null : form.neutered === 'yes',
      })
      onSaved()
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'Something went wrong.')
      setIsSaving(false)
    }
  }

  return (
    <AttachmentModalShell
      title={`Edit ${pet.name}`}
      submitLabel="Save changes"
      busyLabel="Saving…"
      isSaving={isSaving}
      error={error}
      onSubmit={handleSubmit}
      onClose={onClose}
    >
      <PetFormFields
        form={form}
        errors={errors}
        fieldId={fieldId}
        onChange={(patch) => {
          setForm((current) => ({ ...current, ...patch }))
          setErrors({})
        }}
      />
    </AttachmentModalShell>
  )
}
