import { DiagnosticType } from '@api/generated/prisma/enums'
import type { DiagnosticDraft, DiagnosticDraftErrors } from '../diagnosticDraft'
import { DIAGNOSTIC_TYPE_LABEL } from '../petLabels'
import { DateField } from './DateField'
import { DraftFieldset } from './DraftFieldset'
import { STYLES } from '../styles'

type DiagnosticDraftFieldsProps = {
  draft: DiagnosticDraft
  index: number
  errors: DiagnosticDraftErrors
  fieldId: string
  onChange: (patch: Partial<DiagnosticDraft>) => void
  onRemove: () => void
}

export function DiagnosticDraftFields({
  draft,
  index,
  errors,
  fieldId,
  onChange,
  onRemove,
}: DiagnosticDraftFieldsProps) {
  const id = `${fieldId}-${draft.key}`

  return (
    <DraftFieldset
      title={`Diagnostic ${index + 1}`}
      removeLabel={`Remove diagnostic ${index + 1}`}
      onRemove={onRemove}
    >
      <div className={STYLES.FIELD}>
        <label className={STYLES.LABEL} htmlFor={`${id}-type`}>
          Type
        </label>
        <select
          id={`${id}-type`}
          className={STYLES.CONTROL}
          value={draft.type}
          onChange={(event) => onChange({ type: event.target.value as DiagnosticType })}
          aria-invalid={Boolean(errors.type)}
          aria-describedby={errors.type ? `${id}-type-error` : undefined}
        >
          <option value="">Select a type</option>
          {Object.values(DiagnosticType).map((type) => (
            <option key={type} value={type}>
              {DIAGNOSTIC_TYPE_LABEL[type]}
            </option>
          ))}
        </select>
        {errors.type && (
          <p className="text-[0.8rem] text-danger" id={`${id}-type-error`}>
            {errors.type}
          </p>
        )}
      </div>

      <div className={STYLES.FIELD}>
        <label className={STYLES.LABEL} htmlFor={`${id}-date`}>
          Date
        </label>
        {/* No allowFuture: a diagnostic is something that was carried out. */}
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
        <label className={STYLES.LABEL} htmlFor={`${id}-result`}>
          Result
        </label>
        <input
          id={`${id}-result`}
          className={STYLES.CONTROL}
          value={draft.result}
          onChange={(event) => onChange({ result: event.target.value })}
        />
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
