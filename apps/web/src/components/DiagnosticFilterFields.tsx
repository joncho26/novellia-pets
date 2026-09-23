import { useId } from 'react'
import { DiagnosticType } from '@api/generated/prisma/enums'
import type { DiagnosticFilter } from '../diagnosticFilter'
import { DIAGNOSTIC_TYPE_LABEL } from '../petLabels'
import { DateField } from './DateField'
import { FilterField, FilterGrid } from './FilterFields'
import { STYLES } from '../styles'

export function DiagnosticFilterFields({
  filter,
  onChange,
}: {
  filter: DiagnosticFilter
  onChange: (patch: Partial<DiagnosticFilter>) => void
}) {
  const id = useId()

  return (
    <FilterGrid>
      <FilterField label="Type" htmlFor={`${id}-type`}>
        <select
          id={`${id}-type`}
          className={STYLES.CONTROL}
          value={filter.type}
          onChange={(event) => onChange({ type: event.target.value as DiagnosticType })}
        >
          <option value="">Any type</option>
          {Object.values(DiagnosticType).map((type) => (
            <option key={type} value={type}>
              {DIAGNOSTIC_TYPE_LABEL[type]}
            </option>
          ))}
        </select>
      </FilterField>

      <FilterField label="Result contains" htmlFor={`${id}-result`}>
        <input
          id={`${id}-result`}
          className={STYLES.CONTROL}
          value={filter.result}
          onChange={(event) => onChange({ result: event.target.value })}
        />
      </FilterField>

      <FilterField label="On or after" htmlFor={`${id}-from`}>
        <DateField
          id={`${id}-from`}
          className={STYLES.CONTROL}
          value={filter.from}
          onChange={(value) => onChange({ from: value })}
        />
      </FilterField>

      <FilterField label="On or before" htmlFor={`${id}-to`}>
        <DateField
          id={`${id}-to`}
          className={STYLES.CONTROL}
          value={filter.to}
          onChange={(value) => onChange({ to: value })}
        />
      </FilterField>
    </FilterGrid>
  )
}
