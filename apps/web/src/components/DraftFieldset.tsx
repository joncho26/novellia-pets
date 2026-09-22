import { Trash2 } from 'lucide-react'
import type { ReactNode } from 'react'

// The frame around one unsaved attachment on a medical record: a labelled box
// with a way out. Shared so every kind of attachment looks and behaves alike.
export function DraftFieldset({
  title,
  removeLabel,
  onRemove,
  children,
}: {
  title: string
  removeLabel: string
  onRemove: () => void
  children: ReactNode
}) {
  return (
    <fieldset className="m-0 flex flex-col gap-3 rounded-lg border border-line p-4">
      <legend className="flex w-full items-center justify-between gap-2 px-1">
        <span className="text-[0.8rem] font-semibold tracking-[0.04em] text-secondary uppercase">
          {title}
        </span>
        <button
          type="button"
          onClick={onRemove}
          aria-label={removeLabel}
          className="inline-flex cursor-pointer items-center gap-1 rounded-[0.3rem] border border-line px-2 py-1 text-[0.7rem] font-semibold tracking-[0.04em] uppercase transition-colors duration-200 hover:border-danger hover:text-danger"
        >
          <Trash2 size={12} aria-hidden="true" />
          Remove
        </button>
      </legend>

      {children}
    </fieldset>
  )
}
