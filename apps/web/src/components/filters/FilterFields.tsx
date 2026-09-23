import type { ReactNode } from 'react'

// The shape every filter panel shares: a responsive row of labelled controls.
// Kept here so five panels can't drift apart in spacing or label treatment.
export function FilterGrid({ children }: { children: ReactNode }) {
  return <div className="grid grid-cols-[repeat(auto-fit,minmax(10rem,1fr))] gap-3">{children}</div>
}

// Narrower than the form labels: these sit inside a panel already labelled by
// the section it belongs to.
export function FilterField({
  label,
  htmlFor,
  children,
}: {
  label: string
  htmlFor: string
  children: ReactNode
}) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-[0.7rem] tracking-[0.04em] uppercase opacity-65" htmlFor={htmlFor}>
        {label}
      </label>
      {children}
    </div>
  )
}
