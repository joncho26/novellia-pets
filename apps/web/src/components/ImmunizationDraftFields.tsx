// Only what the dropdown renders. Narrower than VaccineResponse so a vaccine
// already attached to a row — which carries no interval — can seed the list.
export type VaccineOption = { id: string; name: string }
import type { ImmunizationDraft, ImmunizationDraftErrors } from '../immunizationDraft'
import { DateField } from './DateField'
import { DraftFieldset } from './DraftFieldset'
import { STYLES } from '../styles'

type ImmunizationDraftFieldsProps = {
  draft: ImmunizationDraft
  index: number
  errors: ImmunizationDraftErrors
  fieldId: string
  vaccines: VaccineOption[]
  onChange: (patch: Partial<ImmunizationDraft>) => void
  onRemove?: () => void
}

export function ImmunizationDraftFields({
  draft,
  index,
  errors,
  fieldId,
  vaccines,
  onChange,
  onRemove,
}: ImmunizationDraftFieldsProps) {
  const id = `${fieldId}-${draft.key}`

  return (
    <DraftFieldset
      title={`Immunization ${index + 1}`}
      removeLabel={`Remove immunization ${index + 1}`}
      onRemove={onRemove}
    >
      <div className={STYLES.FIELD}>
        <label className={STYLES.LABEL} htmlFor={`${id}-vaccine`}>
          Vaccine
        </label>
        {/* The API already narrowed this list to the pet's species. */}
        <select
          id={`${id}-vaccine`}
          className={STYLES.CONTROL}
          value={draft.vaccineId}
          onChange={(event) => onChange({ vaccineId: event.target.value })}
          aria-invalid={Boolean(errors.vaccineId)}
          aria-describedby={errors.vaccineId ? `${id}-vaccine-error` : undefined}
        >
          <option value="">Select a vaccine</option>
          {vaccines.map((vaccine) => (
            <option key={vaccine.id} value={vaccine.id}>
              {vaccine.name}
            </option>
          ))}
        </select>
        {errors.vaccineId && (
          <p className="text-[0.8rem] text-danger" id={`${id}-vaccine-error`}>
            {errors.vaccineId}
          </p>
        )}
      </div>

      <div className="grid grid-col gap-3">
        <div className={STYLES.FIELD}>
          <label className={STYLES.LABEL} htmlFor={`${id}-administered`}>
            Date administered
          </label>
          {/* A dose was either given or it wasn't, so no future dates here. */}
          <DateField
            id={`${id}-administered`}
            className={STYLES.CONTROL}
            value={draft.dateAdministered}
            onChange={(value) => onChange({ dateAdministered: value })}
            invalid={Boolean(errors.dateAdministered)}
            describedBy={errors.dateAdministered ? `${id}-administered-error` : undefined}
          />
          {errors.dateAdministered && (
            <p className="text-[0.8rem] text-danger" id={`${id}-administered-error`}>
              {errors.dateAdministered}
            </p>
          )}
        </div>
      </div>
      <div className="grid grid-col gap-3">
        <div className={STYLES.FIELD}>
          <label className={STYLES.LABEL} htmlFor={`${id}-due`}>
            Next due date
          </label>
          {/* The opposite: a booster is almost always due in the future. */}
          <DateField
            id={`${id}-due`}
            className={STYLES.CONTROL}
            allowFuture
            value={draft.nextDueDate}
            onChange={(value) => onChange({ nextDueDate: value })}
            invalid={Boolean(errors.nextDueDate)}
            describedBy={errors.nextDueDate ? `${id}-due-error` : undefined}
          />
          {errors.nextDueDate && (
            <p className="text-[0.8rem] text-danger" id={`${id}-due-error`}>
              {errors.nextDueDate}
            </p>
          )}
        </div>
      </div>
    </DraftFieldset>
  )
}
