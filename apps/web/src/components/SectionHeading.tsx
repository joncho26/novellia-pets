import { Plus, type LucideIcon } from 'lucide-react'

type SectionHeadingProps = {
  icon: LucideIcon
  // The card nests these under the pet's <h2>; the detail page puts them
  // directly under its <h1>. The level follows the page, not the styling.
  level?: 2 | 3
  children: string
  // Renders an add button on the right of the heading. `label` is the full
  // phrase for screen readers, since the visible text is only "Add".
  action?: { label: string; onClick?: () => void }
}

// Shared by the dashboard cards and the pet detail page. The headings carry the
// secondary color at full strength rather than dimmed: dimming it would undo
// the structure the color is there to give. The icon is decorative — the
// heading text already says what the section is.
export function SectionHeading({
  icon: Icon,
  level = 3,
  children,
  action,
}: SectionHeadingProps) {
  const Heading = level === 2 ? 'h2' : 'h3'

  return (
    <Heading className="mt-4 mb-[0.35rem] flex items-center gap-1.5 text-[0.8rem] font-semibold tracking-[0.04em] text-secondary uppercase">
      <Icon size={14} aria-hidden="true" />
      {children}
      {/* ml-auto rather than justify-between: headings without an action keep
          their icon and text tight together. */}
      {action && (
        <button
          type="button"
          aria-label={action.label}
          onClick={action.onClick}
          className="ml-auto inline-flex cursor-pointer items-center gap-1 rounded-[0.3rem] border border-line px-2 py-1 text-[0.7rem] font-semibold tracking-[0.04em] uppercase transition-colors duration-200 hover:border-accent-line hover:bg-accent-soft"
        >
          <Plus size={12} aria-hidden="true" />
          Add
        </button>
      )}
    </Heading>
  )
}
