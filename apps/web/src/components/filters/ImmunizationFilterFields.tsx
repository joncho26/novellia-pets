import { useId } from 'react'
import type { ImmunizationFilter } from './immunizationFilter'
import { DateField } from '../DateField'
import { FilterField, FilterGrid } from './FilterFields'
import { STYLES } from '../../styles'

export function ImmunizationFilterFields({
  filter,
  vaccines,
  onChange,
}: {
  filter: ImmunizationFilter
  vaccines: { id: string; name: string }[]
  onChange: (patch: Partial<ImmunizationFilter>) => void
}) {
  const id = useId()

  return (
    <FilterGrid>
      <FilterField label="Vaccine" htmlFor={`${id}-vaccine`}>
        <select
          id={`${id}-vaccine`}
          className={STYLES.CONTROL}
          value={filter.vaccineId}
          onChange={(event) => onChange({ vaccineId: event.target.value })}
        >
          <option value="">Any vaccine</option>
          {vaccines.map((vaccine) => (
            <option key={vaccine.id} value={vaccine.id}>
              {vaccine.name}
            </option>
          ))}
        </select>
      </FilterField>

      <FilterField label="Given on or after" htmlFor={`${id}-admin-from`}>
        <DateField
          id={`${id}-admin-from`}
          className={STYLES.CONTROL}
          overlay
          value={filter.administeredFrom}
          onChange={(value) => onChange({ administeredFrom: value })}
        />
      </FilterField>

      <FilterField label="Given on or before" htmlFor={`${id}-admin-to`}>
        <DateField
          id={`${id}-admin-to`}
          className={STYLES.CONTROL}
          overlay
          value={filter.administeredTo}
          onChange={(value) => onChange({ administeredTo: value })}
        />
      </FilterField>

      <FilterField label="Due on or after" htmlFor={`${id}-due-from`}>
        <DateField
          id={`${id}-due-from`}
          className={STYLES.CONTROL}
          overlay
          allowFuture
          value={filter.dueFrom}
          onChange={(value) => onChange({ dueFrom: value })}
        />
      </FilterField>

      <FilterField label="Due on or before" htmlFor={`${id}-due-to`}>
        <DateField
          id={`${id}-due-to`}
          className={STYLES.CONTROL}
          overlay
          allowFuture
          value={filter.dueTo}
          onChange={(value) => onChange({ dueTo: value })}
        />
      </FilterField>
    </FilterGrid>
  )
}
