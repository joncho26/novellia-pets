import { PetSex, PetType, WeightUnit } from '@api/generated/prisma/enums'
import type { PetDetailResponse } from './api/types'
import { parseDateOnly } from './dates'

// Selects start blank so an untouched form can never file a cat as a dog. The
// empty string is the "nothing chosen yet" value for each of them.
type Choice<T extends string> = T | ''

export type PetFormState = {
  name: string
  type: Choice<PetType>
  breed: string
  dateOfBirth: Date | undefined
  weight: string
  weightUnit: WeightUnit
  sex: Choice<PetSex>
  neutered: '' | 'yes' | 'no'
}

export type PetFormErrors = Partial<Record<keyof PetFormState, string>>

export function emptyPetForm(): PetFormState {
  return {
    name: '',
    type: '',
    breed: '',
    dateOfBirth: undefined,
    weight: '',
    weightUnit: WeightUnit.LB,
    sex: '',
    neutered: '',
  }
}

// A saved pet, filled back into the form that created it. parseDateOnly keeps
// the calendar on the stored birthday rather than the day before it.
export function petFormFrom(pet: PetDetailResponse): PetFormState {
  return {
    name: pet.name,
    type: pet.type,
    breed: pet.breed ?? '',
    dateOfBirth: parseDateOnly(pet.dateOfBirth),
    weight: String(pet.weight),
    weightUnit: pet.weightUnit,
    sex: pet.sex,
    // null is "nobody has said", which is neither yes nor no.
    neutered: pet.neutered === null ? '' : pet.neutered ? 'yes' : 'no',
  }
}

export function validatePetForm(form: PetFormState): PetFormErrors {
  const errors: PetFormErrors = {}

  if (!form.name.trim()) errors.name = 'Name is required.'
  if (!form.type) errors.type = 'Type is required.'
  if (!form.dateOfBirth) errors.dateOfBirth = 'Date of birth is required.'
  if (!form.sex) errors.sex = 'Sex is required.'

  const weight = Number(form.weight)
  if (!form.weight.trim()) errors.weight = 'Weight is required.'
  else if (!Number.isFinite(weight) || weight <= 0) errors.weight = 'Weight must be greater than 0.'

  return errors
}
