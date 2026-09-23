import { Plus, type LucideIcon } from 'lucide-react'
import type { ReactNode } from 'react'

type SectionHeadingProps = {
  icon: LucideIcon
  // The card nests these under the pet's <h2>; the detail page puts them
  // directly under its <h1>. The level follows the page, not the styling.
  level?: 2 | 3
  children: string
  // Renders an add button on the right of the heading. `label` is the full
  // phrase for screen readers, since the visible text is only "Add".
  action?: { label: string; onClick?: () => void }
  // Sits to the left of the add button, for controls that belong to the
  // section rather than to the page — the filter toggle, today.
  trailing?: ReactNode
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
  trailing,
}: SectionHeadingProps) {
  const Heading = level === 2 ? 'h2' : 'h3'

  return (
    <Heading className="mt-4 mb-[0.35rem] flex items-center gap-1.5 text-[0.8rem] font-semibold tracking-[0.04em] text-secondary uppercase">
      <Icon size={14} aria-hidden="true" />
      {children}
      {/* ml-auto rather than justify-between: headings without controls keep
          their icon and text tight together. */}
      {(trailing || action) && (
        <span className="ml-auto flex items-center gap-1.5">
          {trailing}
          {action && (
            <button
              type="button"
              aria-label={action.label}
              title={action.label}
              onClick={action.onClick}
              className="inline-flex cursor-pointer items-center justify-center rounded-full border border-line p-1.5 transition-colors duration-200 hover:border-accent-line hover:bg-accent-soft"
            >
              <Plus size={12} aria-hidden="true" />
            </button>
          )}
        </span>
      )}
    </Heading>
  )
}
