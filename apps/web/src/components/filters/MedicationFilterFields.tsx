import { useId } from 'react'
import { MedicationStatus } from '@api/generated/prisma/enums'
import type { MedicationFilter } from './medicationFilter'
import { MEDICATION_STATUS_LABEL } from '../../petLabels'
import { DateField } from '../DateField'
import { FilterField, FilterGrid } from './FilterFields'
import { STYLES } from '../../styles'

export function MedicationFilterFields({
  filter,
  onChange,
}: {
  filter: MedicationFilter
  onChange: (patch: Partial<MedicationFilter>) => void
}) {
  const id = useId()

  return (
    <FilterGrid>
      <FilterField label="Status" htmlFor={`${id}-status`}>
        <select
          id={`${id}-status`}
          className={STYLES.CONTROL}
          value={filter.status}
          onChange={(event) => onChange({ status: event.target.value as MedicationStatus })}
        >
          <option value="">Any status</option>
          {Object.values(MedicationStatus).map((status) => (
            <option key={status} value={status}>
              {MEDICATION_STATUS_LABEL[status]}
            </option>
          ))}
        </select>
      </FilterField>

      <FilterField label="Name contains" htmlFor={`${id}-name`}>
        <input
          id={`${id}-name`}
          className={STYLES.CONTROL}
          value={filter.name}
          onChange={(event) => onChange({ name: event.target.value })}
        />
      </FilterField>

      <FilterField label="Started on or after" htmlFor={`${id}-from`}>
        <DateField
          id={`${id}-from`}
          className={STYLES.CONTROL}
          allowFuture
          value={filter.startedFrom}
          onChange={(value) => onChange({ startedFrom: value })}
        />
      </FilterField>

      <FilterField label="Started on or before" htmlFor={`${id}-to`}>
        <DateField
          id={`${id}-to`}
          className={STYLES.CONTROL}
          allowFuture
          value={filter.startedTo}
          onChange={(value) => onChange({ startedTo: value })}
        />
      </FilterField>
    </FilterGrid>
  )
}
