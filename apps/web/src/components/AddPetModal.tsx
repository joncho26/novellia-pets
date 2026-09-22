import { useId, useState, type FormEvent } from 'react'
import { PetSex, PetType, WeightUnit } from '@api/generated/prisma/enums'
import { createPet } from '../api/client'
import type { CreatePetRequest } from '../api/types'
import { PET_SEX_LABEL, PET_TYPE_LABEL, WEIGHT_UNIT_LABEL } from '../petLabels'
import { DateField } from './DateField'
import { Modal } from './Modal'
import { CTA_BUTTON, STYLES } from '../styles'

// Selects start blank so an untouched form can never file a cat as a dog. The
// empty string is the "nothing chosen yet" value for each of them.
type Choice<T extends string> = T | ''

type FormState = {
  name: string
  type: Choice<PetType>
  breed: string
  dateOfBirth: Date | undefined
  weight: string
  weightUnit: WeightUnit
  sex: Choice<PetSex>
  neutered: '' | 'yes' | 'no'
}

type FormErrors = Partial<Record<keyof FormState, string>>

const EMPTY_FORM: FormState = {
  name: '',
  type: '',
  breed: '',
  dateOfBirth: undefined,
  weight: '',
  weightUnit: WeightUnit.LB,
  sex: '',
  neutered: '',
}

// A whole or decimal number, plus the partial states reached while typing one.
const NUMERIC_INPUT = /^\d*\.?\d*$/

// The Date is local, so toISOString() would shift it across a day boundary for
// anyone west of UTC. Format from the local parts instead.
function toDateOnly(date: Date) {
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')

  return `${date.getFullYear()}-${month}-${day}`
}

function validate(form: FormState): FormErrors {
  const errors: FormErrors = {}

  if (!form.name.trim()) errors.name = 'Name is required.'
  if (!form.type) errors.type = 'Type is required.'
  if (!form.dateOfBirth) errors.dateOfBirth = 'Date of birth is required.'
  if (!form.sex) errors.sex = 'Sex is required.'

  const weight = Number(form.weight)
  if (!form.weight.trim()) errors.weight = 'Weight is required.'
  else if (!Number.isFinite(weight) || weight <= 0) errors.weight = 'Weight must be greater than 0.'

  return errors
}

type AddPetModalProps = {
  ownerId: string
  onClose: () => void
  onCreated: () => void
}

export function AddPetModal({ ownerId, onClose, onCreated }: AddPetModalProps) {
  const fieldId = useId()
  const [form, setForm] = useState<FormState>(EMPTY_FORM)
  const [errors, setErrors] = useState<FormErrors>({})
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [isSaving, setIsSaving] = useState(false)

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((current) => ({ ...current, [key]: value }))
    setErrors((current) => ({ ...current, [key]: undefined }))
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const nextErrors = validate(form)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    // validate() proved these are set; the casts carry that through the types.
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
    setSubmitError(null)

    try {
      await createPet(pet)
      onCreated()
    } catch (cause) {
      setSubmitError(cause instanceof Error ? cause.message : 'Something went wrong.')
    } finally {
      setIsSaving(false)
    }
  }

  function errorFor(field: keyof FormState) {
    return errors[field] ? `${fieldId}-${field}-error` : undefined
  }

  function fieldError(field: keyof FormState) {
    if (!errors[field]) return null

    return (
      <p className="text-[0.8rem] text-danger" id={`${fieldId}-${field}-error`}>
        {errors[field]}
      </p>
    )
  }

  return (
    <Modal onClose={onClose} label="Add a pet">
      <form className="flex flex-col gap-4" onSubmit={handleSubmit} noValidate>
        <h2 className="m-0 font-heading text-[24px] leading-[118%] font-medium tracking-[-0.24px] text-primary">
          Add a pet
        </h2>

        <div className={STYLES.FIELD}>
          <label className={STYLES.LABEL} htmlFor={`${fieldId}-name`}>
            Name
          </label>
          <input
            id={`${fieldId}-name`}
            className={STYLES.CONTROL}
            value={form.name}
            onChange={(event) => update('name', event.target.value)}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errorFor('name')}
            autoFocus
          />
          {fieldError('name')}
        </div>

        <div className={STYLES.FIELD}>
          <label className={STYLES.LABEL} htmlFor={`${fieldId}-type`}>
            Type
          </label>
          <select
            id={`${fieldId}-type`}
            className={STYLES.CONTROL}
            value={form.type}
            onChange={(event) => update('type', event.target.value as Choice<PetType>)}
            aria-invalid={Boolean(errors.type)}
            aria-describedby={errorFor('type')}
          >
            <option value="">Select a type</option>
            {Object.values(PetType).map((type) => (
              <option key={type} value={type}>
                {PET_TYPE_LABEL[type]}
              </option>
            ))}
          </select>
          {fieldError('type')}
        </div>

        <div className={STYLES.FIELD}>
          <label className={STYLES.LABEL} htmlFor={`${fieldId}-breed`}>
            Breed
          </label>
          <input
            id={`${fieldId}-breed`}
            className={STYLES.CONTROL}
            value={form.breed}
            onChange={(event) => update('breed', event.target.value)}
          />
        </div>

        <div className={STYLES.FIELD}>
          <label className={STYLES.LABEL} htmlFor={`${fieldId}-dob`}>
            Date of birth
          </label>
          <DateField
            id={`${fieldId}-dob`}
            className={STYLES.CONTROL}
            value={form.dateOfBirth}
            onChange={(value) => update('dateOfBirth', value)}
            invalid={Boolean(errors.dateOfBirth)}
            describedBy={errorFor('dateOfBirth')}
          />
          {fieldError('dateOfBirth')}
        </div>

        <div className={STYLES.FIELD}>
          <label className={STYLES.LABEL} htmlFor={`${fieldId}-weight`}>
            Weight
          </label>
          <div className="flex gap-2">
            <input
              id={`${fieldId}-weight`}
              className={STYLES.CONTROL}
              inputMode="decimal"
              value={form.weight}
              onChange={(event) => {
                // Reject anything that isn't on its way to being a number,
                // rather than letting type="number" accept "e" and "+".
                if (NUMERIC_INPUT.test(event.target.value)) update('weight', event.target.value)
              }}
              aria-invalid={Boolean(errors.weight)}
              aria-describedby={errorFor('weight')}
            />
            <select
              className={`${STYLES.CONTROL} w-auto flex-[0_0_5.5rem]`}
              aria-label="Weight unit"
              value={form.weightUnit}
              onChange={(event) => update('weightUnit', event.target.value as WeightUnit)}
            >
              {Object.values(WeightUnit).map((unit) => (
                <option key={unit} value={unit}>
                  {WEIGHT_UNIT_LABEL[unit]}
                </option>
              ))}
            </select>
          </div>
          {fieldError('weight')}
        </div>

        <div className={STYLES.FIELD}>
          <label className={STYLES.LABEL} htmlFor={`${fieldId}-sex`}>
            Sex
          </label>
          <select
            id={`${fieldId}-sex`}
            className={STYLES.CONTROL}
            value={form.sex}
            onChange={(event) => update('sex', event.target.value as Choice<PetSex>)}
            aria-invalid={Boolean(errors.sex)}
            aria-describedby={errorFor('sex')}
          >
            <option value="">Select a sex</option>
            {Object.values(PetSex).map((sex) => (
              <option key={sex} value={sex}>
                {PET_SEX_LABEL[sex]}
              </option>
            ))}
          </select>
          {fieldError('sex')}
        </div>

        <div className={STYLES.FIELD}>
          <label className={STYLES.LABEL} htmlFor={`${fieldId}-neutered`}>
            Neutered
          </label>
          <select
            id={`${fieldId}-neutered`}
            className={STYLES.CONTROL}
            value={form.neutered}
            onChange={(event) => update('neutered', event.target.value as FormState['neutered'])}
          >
            <option value="">Select an answer</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>

        {submitError && <p className="text-danger">Could not add pet: {submitError}</p>}

        <div className="mt-2 flex justify-end gap-2">
          <button
            type="button"
            className={STYLES.SECONDARY_BUTTON}
            onClick={onClose}
            disabled={isSaving}
          >
            Cancel
          </button>
          <button type="submit" className={CTA_BUTTON} disabled={isSaving}>
            {isSaving ? 'Adding…' : 'Add pet'}
          </button>
        </div>
      </form>
    </Modal>
  )
}
