import type { TreatmentDraft, TreatmentDraftErrors } from './treatmentDraft'
import { DateField } from '../DateField'
import { DraftFieldset } from './DraftFieldset'
import { STYLES } from '../../styles'

type TreatmentDraftFieldsProps = {
  draft: TreatmentDraft
  index: number
  errors: TreatmentDraftErrors
  fieldId: string
  onChange: (patch: Partial<TreatmentDraft>) => void
  onRemove?: () => void
}

export function TreatmentDraftFields({
  draft,
  index,
  errors,
  fieldId,
  onChange,
  onRemove,
}: TreatmentDraftFieldsProps) {
  const id = `${fieldId}-${draft.key}`

  return (
    <DraftFieldset
      title={`Treatment ${index + 1}`}
      removeLabel={`Remove treatment ${index + 1}`}
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
          aria-describedby={errors.name ? `${id}-name-error` : undefined}
        />
        {errors.name && (
          <p className="text-[0.8rem] text-danger" id={`${id}-name-error`}>
            {errors.name}
          </p>
        )}
      </div>

      <div className={STYLES.FIELD}>
        <label className={STYLES.LABEL} htmlFor={`${id}-date`}>
          Date
        </label>
        {/* No allowFuture: a treatment is something that was carried out. */}
        <DateField
          id={`${id}-date`}
          className={STYLES.CONTROL}
          value={draft.date}
          onChange={(value) => onChange({ date: value })}
          invalid={Boolean(errors.date)}
          describedBy={errors.date ? `${id}-date-error` : undefined}
        />
        {errors.date && (
          <p className="text-[0.8rem] text-danger" id={`${id}-date-error`}>
            {errors.date}
          </p>
        )}
      </div>

      <div className={STYLES.FIELD}>
        <label className={STYLES.LABEL} htmlFor={`${id}-notes`}>
          Notes
        </label>
        <textarea
          id={`${id}-notes`}
          className={`${STYLES.CONTROL} min-h-16 resize-y`}
          value={draft.notes}
          onChange={(event) => onChange({ notes: event.target.value })}
        />
      </div>
    </DraftFieldset>
  )
}
