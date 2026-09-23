import type { FormEvent, ReactNode } from 'react'
import { Modal } from './Modal'
import { CTA_BUTTON, STYLES } from '../../styles'

type AttachmentModalShellProps = {
  title: string
  submitLabel: string
  busyLabel?: string
  isSaving: boolean
  error: string | null
  onSubmit: (event: FormEvent<HTMLFormElement>) => void
  onClose: () => void
  children: ReactNode
}

// The chrome every single-attachment form shares: heading, error line and the
// cancel/save pair. Only the fields in between differ between the four kinds.
export function AttachmentModalShell({
  title,
  submitLabel,
  busyLabel = 'Adding…',
  isSaving,
  error,
  onSubmit,
  onClose,
  children,
}: AttachmentModalShellProps) {
  return (
    <Modal onClose={onClose} label={title}>
      <form className="flex flex-col gap-4" onSubmit={onSubmit} noValidate>
        <h2 className="m-0 font-heading text-[24px] leading-[118%] font-medium tracking-[-0.24px] text-primary">
          {title}
        </h2>

        {children}

        {error && <p className="text-danger">{error}</p>}

        <div className="mt-2 flex justify-end gap-2">
          <button
            type="button"
            className={STYLES.SECONDARY_BUTTON}
            onClick={onClose}
            disabled={isSaving}
          >
            Cancel
          </button>
          <button type="submit" className={CTA_BUTTON} disabled={isSaving}>
            {isSaving ? busyLabel : submitLabel}
          </button>
        </div>
      </form>
    </Modal>
  )
}
