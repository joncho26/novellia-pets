import { PetSex, PetType, WeightUnit } from '@api/generated/prisma/enums'
import type { PetFormErrors, PetFormState } from './petForm'
import { PET_SEX_LABEL, PET_TYPE_LABEL, WEIGHT_UNIT_LABEL } from '../../petLabels'
import { DateField } from '../DateField'
import { STYLES } from '../../styles'

// A whole or decimal number, plus the partial states reached while typing one.
const NUMERIC_INPUT = /^\d*\.?\d*$/

type PetFormFieldsProps = {
  form: PetFormState
  errors: PetFormErrors
  fieldId: string
  onChange: (patch: Partial<PetFormState>) => void
}

// Shared by the add and edit forms, so the two can't drift apart in what they
// ask for or how they validate it.
export function PetFormFields({ form, errors, fieldId, onChange }: PetFormFieldsProps) {
  function errorFor(field: keyof PetFormState) {
    return errors[field] ? `${fieldId}-${field}-error` : undefined
  }

  // Not all pets get neutered/spayed, only show for cats and dogs
  const showNeuteredField = form.type === PetType.CAT || form.type === PetType.DOG

  function fieldError(field: keyof PetFormState) {
    if (!errors[field]) return null

    return (
      <p className="text-[0.8rem] text-danger" id={`${fieldId}-${field}-error`}>
        {errors[field]}
      </p>
    )
  }

  return (
    <>
      <div className={STYLES.FIELD}>
        <label className={STYLES.LABEL} htmlFor={`${fieldId}-name`}>
          Name
        </label>
        <input
          id={`${fieldId}-name`}
          className={STYLES.CONTROL}
          value={form.name}
          onChange={(event) => onChange({ name: event.target.value })}
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
          onChange={(event) => onChange({ type: event.target.value as PetType })}
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
          onChange={(event) => onChange({ breed: event.target.value })}
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
          onChange={(value) => onChange({ dateOfBirth: value })}
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
              if (NUMERIC_INPUT.test(event.target.value)) onChange({ weight: event.target.value })
            }}
            aria-invalid={Boolean(errors.weight)}
            aria-describedby={errorFor('weight')}
          />
          <select
            className={`${STYLES.CONTROL} w-auto flex-[0_0_5.5rem]`}
            aria-label="Weight unit"
            value={form.weightUnit}
            onChange={(event) => onChange({ weightUnit: event.target.value as WeightUnit })}
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
          onChange={(event) => onChange({ sex: event.target.value as PetSex })}
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

      {showNeuteredField && (
        <div className={STYLES.FIELD}>
          <label className={STYLES.LABEL} htmlFor={`${fieldId}-neutered`}>
            Neutered
          </label>
          <select
            id={`${fieldId}-neutered`}
            className={STYLES.CONTROL}
            value={form.neutered}
            onChange={(event) => onChange({ neutered: event.target.value as PetFormState['neutered'] })}
          >
            <option value="">Select an answer</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>
      )}
    </>
  )
}
