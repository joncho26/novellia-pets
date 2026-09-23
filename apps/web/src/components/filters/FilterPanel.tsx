import type { ReactNode } from 'react'

// The slide-down itself. `height: auto` cannot be transitioned, so the panel is
// a grid whose single row animates between 0fr and 1fr — no magic max-height
// that would clip a taller panel. The inner wrapper hides the overflow while
// the row is collapsing.
//
// `inert` keeps Tab out of a panel that is closed but still in the DOM.
export function FilterPanel({
  id,
  isOpen,
  children,
}: {
  id: string
  isOpen: boolean
  children: ReactNode
}) {
  return (
    <div
      id={id}
      inert={!isOpen}
      className={`grid transition-[grid-template-rows] duration-200 ease-out motion-reduce:transition-none ${
        isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
      }`}
    >
      <div className="overflow-hidden">
        <div className="mt-2 mb-3 rounded-lg border border-line bg-accent-soft/40 p-3">
          {children}
        </div>
      </div>
    </div>
  )
}
