import { useEffect, useRef, type ReactNode } from 'react'
import { X } from 'lucide-react'

type ModalProps = {
  onClose: () => void
  label: string
  children: ReactNode
}

// The dialog chrome shared by every modal: the backdrop, the focus trap, the
// Escape handling and the close button that sits outside the panel.
export function Modal({ onClose, label, children }: ModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)

  // showModal() is what gives us the backdrop, the focus trap and Escape.
  useEffect(() => {
    dialogRef.current?.showModal()
  }, [])

  return (
    // The dialog is only a transparent positioning box: the panel styling lives
    // on the inner div so the close button can sit outside it, over the
    // backdrop, without being clipped by the panel's own scrolling.
    <dialog
      ref={dialogRef}
      onClose={onClose}
      aria-label={label}
      className="m-auto w-[30rem] max-w-[calc(100vw-2rem)] overflow-visible bg-transparent p-0 text-body backdrop:bg-black/45"
    >
      {/* Absolute against the dialog's own box, which the browser has already
          centered, so it lands just off the panel's top-right corner. */}
      <button
        type="button"
        className="absolute -top-12 right-0 flex size-9 cursor-pointer items-center justify-center rounded-full bg-white/15 text-white hover:bg-white/30 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        onClick={() => dialogRef.current?.close()}
        aria-label="Close"
      >
        <X size={18} aria-hidden="true" />
      </button>

      <div className="max-h-[80vh] overflow-y-auto rounded-xl border border-line bg-page p-6 text-left shadow-panel">
        {children}
      </div>
    </dialog>
  )
}
