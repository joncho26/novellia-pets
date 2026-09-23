import type { ReactNode } from 'react'
import { Modal } from './Modal'
import { CTA_BUTTON, STYLES } from '../../styles'

type ConfirmDialogProps = {
  title: string
  confirmLabel: string
  busyLabel: string
  isBusy: boolean
  error: string | null
  onConfirm: () => void
  onClose: () => void
  children: ReactNode
}

// A confirmation step for an action that cannot be undone. The body says what
// will actually happen rather than asking "are you sure": the point of the
// pause is to inform, not to add a click.
export function ConfirmDialog({
  title,
  confirmLabel,
  busyLabel,
  isBusy,
  error,
  onConfirm,
  onClose,
  children,
}: ConfirmDialogProps) {
  return (
    <Modal onClose={onClose} label={title}>
      <div className="flex flex-col gap-4">
        <h2 className="m-0 font-heading text-[24px] leading-[118%] font-medium tracking-[-0.24px] text-primary">
          {title}
        </h2>

        <div className="text-[0.95rem]">{children}</div>

        {error && <p className="text-danger">{error}</p>}

        <div className="mt-2 flex justify-end gap-2">
          {/* Cancel first, and it is where focus lands: the safe choice should
              be the easy one to hit by reflex. */}
          <button
            type="button"
            className={STYLES.SECONDARY_BUTTON}
            onClick={onClose}
            disabled={isBusy}
            autoFocus
          >
            Cancel
          </button>
          <button
            type="button"
            className={`${CTA_BUTTON} border-danger bg-danger hover:border-danger hover:bg-danger`}
            onClick={onConfirm}
            disabled={isBusy}
          >
            {isBusy ? busyLabel : confirmLabel}
          </button>
        </div>
      </div>
    </Modal>
  )
}
