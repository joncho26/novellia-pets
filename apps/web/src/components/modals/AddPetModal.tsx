import { useId, useState, type FormEvent } from 'react'
import { PetSex, PetType } from '@api/generated/prisma/enums'
import { createPet } from '../../api/client'
import type { CreatePetRequest } from '../../api/types'
import { toDateOnly } from '../../dates'
import { emptyPetForm, validatePetForm, type PetFormErrors } from '../fields/petForm'
import { AttachmentModalShell } from './AttachmentModalShell'
import { PetFormFields } from '../fields/PetFormFields'

type AddPetModalProps = {
  ownerId: string
  onClose: () => void
  onCreated: () => void
}

export function AddPetModal({ ownerId, onClose, onCreated }: AddPetModalProps) {
  const fieldId = useId()
  const [form, setForm] = useState(emptyPetForm)
  const [errors, setErrors] = useState<PetFormErrors>({})
  const [error, setError] = useState<string | null>(null)
  const [isSaving, setIsSaving] = useState(false)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const nextErrors = validatePetForm(form)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    // validatePetForm() proved these are set; the casts carry that through.
    const pet: CreatePetRequest = {
      name: form.name.trim(),
      type: form.type as PetType,
      breed: form.breed.trim() || null,
      dateOfBirth: toDateOnly(form.dateOfBirth as Date),
      weight: Number(form.weight),
      weightUnit: form.weightUnit,
      sex: form.sex as PetSex,
      neutered: form.neutered === '' ? null : form.neutered === 'yes',
      ownerId,
    }

    setIsSaving(true)
    setError(null)

    try {
      await createPet(pet)
      onCreated()
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'Something went wrong.')
      setIsSaving(false)
    }
  }

  return (
    <AttachmentModalShell
      title="Add a pet"
      submitLabel="Add pet"
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
