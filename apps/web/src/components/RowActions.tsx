import { useState } from 'react'
import { Pencil, Trash2 } from 'lucide-react'
import { ConfirmDialog } from './modals/ConfirmDialog'

// Smaller than the page-level icon buttons: these sit inside a list row and
// should not outweigh the text they belong to.
const ROW_BUTTON =
  'inline-flex cursor-pointer items-center justify-center rounded-full border border-transparent p-1 align-middle opacity-55 transition-colors duration-200 hover:opacity-100'

type RowActionsProps = {
  // Names the row in the button labels and the confirmation, so "Delete" is
  // never ambiguous when a list holds several similar entries.
  name: string
  onEdit?: () => void
  onDelete: () => Promise<unknown>
  onDeleted: () => void
}

export function RowActions({ name, onEdit, onDelete, onDeleted }: RowActionsProps) {
  const [isConfirming, setIsConfirming] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleDelete() {
    setIsDeleting(true)
    setError(null)

    try {
      await onDelete()
      onDeleted()
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'Something went wrong.')
      setIsDeleting(false)
    }
  }

  return (
    <span className="ml-1.5 inline-flex gap-0.5 align-middle">
      {onEdit && (
        <button
          type="button"
          className={`${ROW_BUTTON} hover:border-accent-line hover:text-primary`}
          aria-label={`Edit ${name}`}
          title={`Edit ${name}`}
          onClick={onEdit}
        >
          <Pencil size={13} aria-hidden="true" />
        </button>
      )}

      <button
        type="button"
        className={`${ROW_BUTTON} hover:border-danger hover:text-danger`}
        aria-label={`Delete ${name}`}
        title={`Delete ${name}`}
        onClick={() => setIsConfirming(true)}
      >
        <Trash2 size={13} aria-hidden="true" />
      </button>

      {isConfirming && (
        <ConfirmDialog
          title={`Delete ${name}?`}
          confirmLabel="Delete"
          busyLabel="Deleting…"
          isBusy={isDeleting}
          error={error}
          onConfirm={handleDelete}
          onClose={() => {
            setIsConfirming(false)
            setError(null)
          }}
        >
          <p className="m-0">
            This entry will be permanently removed from the pet's record. This can't be undone.
          </p>
        </ConfirmDialog>
      )}
    </span>
  )
}
