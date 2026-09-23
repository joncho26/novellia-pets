import { DosageUnit, MedicationStatus } from '@api/generated/prisma/enums'
import { DOSAGE_UNIT_LABEL, MEDICATION_STATUS_LABEL } from '../../petLabels'
import type { MedicationDraft, MedicationDraftErrors } from './medicationDraft'
import { DateField } from '../DateField'
import { DraftFieldset } from './DraftFieldset'
import { STYLES } from '../../styles'

// A whole or decimal number, plus the partial states reached while typing one.
const NUMERIC_INPUT = /^\d*\.?\d*$/

type MedicationDraftFieldsProps = {
  draft: MedicationDraft
  index: number
  errors: MedicationDraftErrors
  fieldId: string
  onChange: (patch: Partial<MedicationDraft>) => void
  onRemove?: () => void
}

export function MedicationDraftFields({
  draft,
  index,
  errors,
  fieldId,
  onChange,
  onRemove,
}: MedicationDraftFieldsProps) {
  const id = `${fieldId}-${draft.key}`

  function errorFor(field: keyof MedicationDraft) {
    return errors[field] ? `${id}-${field}-error` : undefined
  }

  function fieldError(field: keyof MedicationDraft) {
    if (!errors[field]) return null

    return (
      <p className="text-[0.8rem] text-danger" id={`${id}-${field}-error`}>
        {errors[field]}
      </p>
    )
  }

  return (
    <DraftFieldset
      title={`Medication ${index + 1}`}
      removeLabel={`Remove medication ${index + 1}`}
      onRemove={onRemove}
    >

      <div className={STYLES.FIELD}>
        <label className={STYLES.LABEL} htmlFor={`${id}-name`}>
          Name
        </label>
        <input
          id={`${id}-name`}
          className={STYLES.CONTROL}
          value={draft.name}
          onChange={(event) => onChange({ name: event.target.value })}
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errorFor('name')}
        />
        {fieldError('name')}
      </div>

      <div className={STYLES.FIELD}>
        <label className={STYLES.LABEL} htmlFor={`${id}-dosage`}>
          Dosage
        </label>
        <div className="flex gap-2">
          <input
            id={`${id}-dosage`}
            className={STYLES.CONTROL}
            inputMode="decimal"
            value={draft.dosageAmount}
            onChange={(event) => {
              if (NUMERIC_INPUT.test(event.target.value)) {
                onChange({ dosageAmount: event.target.value })
              }
            }}
            aria-invalid={Boolean(errors.dosageAmount)}
            aria-describedby={errorFor('dosageAmount')}
          />
          <select
            className={`${STYLES.CONTROL} w-auto flex-[0_0_7rem]`}
            aria-label={`Dosage unit for medication ${index + 1}`}
            value={draft.dosageUnit}
            onChange={(event) => onChange({ dosageUnit: event.target.value as DosageUnit })}
            aria-invalid={Boolean(errors.dosageUnit)}
          >
            <option value="">Unit</option>
            {Object.values(DosageUnit).map((unit) => (
              <option key={unit} value={unit}>
                {DOSAGE_UNIT_LABEL[unit]}
              </option>
            ))}
          </select>
        </div>
        {fieldError('dosageAmount') ?? fieldError('dosageUnit')}
      </div>

      <div className={STYLES.FIELD}>
        <label className={STYLES.LABEL} htmlFor={`${id}-frequency`}>
          Frequency
        </label>
        <input
          id={`${id}-frequency`}
          className={STYLES.CONTROL}
          placeholder="Twice daily"
          value={draft.frequency}
          onChange={(event) => onChange({ frequency: event.target.value })}
          aria-invalid={Boolean(errors.frequency)}
          aria-describedby={errorFor('frequency')}
        />
        {fieldError('frequency')}
      </div>

      <div className="grid grid-col gap-3">
        <div className={STYLES.FIELD}>
          <label className={STYLES.LABEL} htmlFor={`${id}-start`}>
            Start date
          </label>
          {/* Future dates allowed on both: a course can be prescribed to begin
              later, and almost always ends in the future. */}
          <DateField
            id={`${id}-start`}
            className={STYLES.CONTROL}
            allowFuture
            value={draft.startDate}
            onChange={(value) => onChange({ startDate: value })}
            invalid={Boolean(errors.startDate)}
            describedBy={errorFor('startDate')}
          />
          {fieldError('startDate')}
        </div>
      </div>
      <div className="grid grid-col gap-3">
        <div className={STYLES.FIELD}>
          <label className={STYLES.LABEL} htmlFor={`${id}-end`}>
            End date
          </label>
          <DateField
            id={`${id}-end`}
            className={STYLES.CONTROL}
            allowFuture
            value={draft.endDate}
            onChange={(value) => onChange({ endDate: value })}
            invalid={Boolean(errors.endDate)}
            describedBy={errorFor('endDate')}
          />
          {fieldError('endDate')}
        </div>
      </div>

      <div className={STYLES.FIELD}>
        <label className={STYLES.LABEL} htmlFor={`${id}-status`}>
          Status
        </label>
        <select
          id={`${id}-status`}
          className={STYLES.CONTROL}
          value={draft.status}
          onChange={(event) => onChange({ status: event.target.value as MedicationStatus })}
          aria-invalid={Boolean(errors.status)}
          aria-describedby={errorFor('status')}
        >
          <option value="">Select a status</option>
          {Object.values(MedicationStatus).map((status) => (
            <option key={status} value={status}>
              {MEDICATION_STATUS_LABEL[status]}
            </option>
          ))}
        </select>
        {fieldError('status')}
      </div>
    </DraftFieldset>
  )
}
