import { useId, useState, type ReactNode } from 'react'
import { SlidersHorizontal, type LucideIcon } from 'lucide-react'
import { FilterPanel } from './FilterPanel'
import { SectionHeading } from './SectionHeading'

type FilterableSectionProps = {
  icon: LucideIcon
  title: string
  action?: { label: string; onClick?: () => void }
  // The controls for this section's own columns.
  filters: ReactNode
  // How many criteria are set. Shown on the button so an active filter is
  // visible even when the panel is closed — otherwise rows appear to vanish
  // for no reason a collapsed panel can explain.
  activeCount: number
  onClear: () => void
  total: number
  shown: number
  children: ReactNode
}

export function FilterableSection({
  icon,
  title,
  action,
  filters,
  activeCount,
  onClear,
  total,
  shown,
  children,
}: FilterableSectionProps) {
  const panelId = useId()
  // Opens on its own when a filter is already set, so the reason rows are
  // missing is on screen rather than hidden behind a toggle.
  const [isOpen, setIsOpen] = useState(false)

  return (
    // The gap between sections lives here rather than on SectionHeading, which
    // is also used inside the dashboard's 18rem cards where this much air
    // would be wasteful.
    <section className="mt-8 first:mt-0">
      <SectionHeading
        icon={icon}
        level={2}
        action={action}
        trailing={
          <button
            type="button"
            aria-expanded={isOpen}
            aria-controls={panelId}
            aria-label={`Filter ${title.toLowerCase()}`}
            onClick={() => setIsOpen((open) => !open)}
            title={`Filter ${title.toLowerCase()}`}
            // A circle with just the icon; the active count stretches it into
            // a pill, which `rounded-full` handles without a second radius.
            className={`inline-flex cursor-pointer items-center gap-1 rounded-full border p-1.5 text-[0.7rem] font-semibold transition-colors duration-200 hover:bg-accent-soft ${
              activeCount > 0
                ? 'border-accent-line text-primary'
                : 'border-line hover:border-accent-line'
            }`}
          >
            <SlidersHorizontal size={12} aria-hidden="true" />
            {activeCount > 0 && <span>({activeCount})</span>}
          </button>
        }
      >
        {title}
      </SectionHeading>

      <FilterPanel id={panelId} isOpen={isOpen}>
        {filters}
      </FilterPanel>

      {/* Only when something is filtered: a count on an unfiltered table is
          noise, but a filtered one has to say what it is hiding. */}
      {activeCount > 0 && (
        <p className="mb-1 flex items-center gap-2 text-[0.75rem] opacity-65">
          Showing {shown} of {total}
          <button
            type="button"
            onClick={onClear}
            className="cursor-pointer underline hover:text-primary"
          >
            Clear
          </button>
        </p>
      )}

      {children}
    </section>
  )
}
