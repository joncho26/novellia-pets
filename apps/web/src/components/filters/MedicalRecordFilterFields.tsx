import { useId } from 'react'
import type { MedicalRecordFilter } from './medicalRecordFilter'
import { DateField } from '../DateField'
import { FilterField, FilterGrid } from './FilterFields'
import { STYLES } from '../../styles'

export function MedicalRecordFilterFields({
  filter,
  onChange,
}: {
  filter: MedicalRecordFilter
  onChange: (patch: Partial<MedicalRecordFilter>) => void
}) {
  const id = useId()

  return (
    <FilterGrid>
      <FilterField label="Vet name contains" htmlFor={`${id}-vet`}>
        <input
          id={`${id}-vet`}
          className={STYLES.CONTROL}
          value={filter.vet}
          onChange={(event) => onChange({ vet: event.target.value })}
        />
      </FilterField>

      <FilterField label="On or after" htmlFor={`${id}-from`}>
        <DateField
          id={`${id}-from`}
          className={STYLES.CONTROL}
          overlay
          value={filter.from}
          onChange={(value) => onChange({ from: value })}
        />
      </FilterField>

      <FilterField label="On or before" htmlFor={`${id}-to`}>
        <DateField
          id={`${id}-to`}
          className={STYLES.CONTROL}
          overlay
          value={filter.to}
          onChange={(value) => onChange({ to: value })}
        />
      </FilterField>
    </FilterGrid>
  )
}
