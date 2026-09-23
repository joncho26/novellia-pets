import { useId } from 'react'
import type { TreatmentFilter } from './treatmentFilter'
import { DateField } from '../DateField'
import { FilterField, FilterGrid } from './FilterFields'
import { STYLES } from '../../styles'

export function TreatmentFilterFields({
  filter,
  onChange,
}: {
  filter: TreatmentFilter
  onChange: (patch: Partial<TreatmentFilter>) => void
}) {
  const id = useId()

  return (
    <FilterGrid>
      <FilterField label="Name contains" htmlFor={`${id}-name`}>
        <input
          id={`${id}-name`}
          className={STYLES.CONTROL}
          value={filter.name}
          onChange={(event) => onChange({ name: event.target.value })}
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
