import { useState, type ReactNode } from 'react'

// The slide-down itself. `height: auto` cannot be transitioned, so the panel is
// a grid whose single row animates between 0fr and 1fr — no magic max-height
// that would clip a taller panel.
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
  // Whether the open transition has finished. Clipping is needed while the row
  // animates, but left on it would also cut off anything a field floats above
  // the panel — a date picker's calendar — so it is released once the panel
  // has settled open.
  const [hasSettled, setHasSettled] = useState(false)

  // With reduced motion there is no transition, so transitionend never fires
  // and waiting for it would leave the panel clipped forever.
  const [prefersReducedMotion] = useState(
    () => window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false,
  )

  // Derived rather than stored: closing clips again on the same render that
  // starts the animation, with no effect chasing it.
  const isClipped = !isOpen || !(hasSettled || prefersReducedMotion)

  return (
    <div
      id={id}
      inert={!isOpen}
      className={`grid transition-[grid-template-rows] duration-200 ease-out motion-reduce:transition-none ${
        isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
      }`}
      onTransitionEnd={(event) => {
        // Only the row transition on this element; a child's transition
        // finishing says nothing about whether the panel has settled.
        if (event.target === event.currentTarget) setHasSettled(isOpen)
      }}
    >
      <div className={isClipped ? 'overflow-hidden' : ''}>
        <div className="mt-2 mb-3 rounded-lg border border-line bg-accent-soft/40 p-3">
          {children}
        </div>
      </div>
    </div>
  )
}
