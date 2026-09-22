import { useEffect, useRef, useState } from 'react'
import { CalendarDays } from 'lucide-react'
import { DayPicker } from 'react-day-picker'
import 'react-day-picker/style.css'

const EARLIEST_YEAR = 1990

// Both the month arrows and the dropdown carets are .rdp-chevron, filled with
// --rdp-accent-color — the same variable that paints the selected day. This
// two-class descendant selector outranks the library's single-class rule, so
// the arrows go orange without the selection following them, and without
// depending on which stylesheet the bundler happens to emit last.
const CHEVRON_COLOR = '[&_.rdp-chevron]:fill-secondary'

// react-day-picker ships its own stylesheet; these are the hooks it exposes for
// theming it, pointed at our tokens so the calendar follows light/dark too.
//
// These have to land on the .rdp-root element itself, not on a wrapper around
// it: the library's stylesheet declares its own defaults ON .rdp-root, and a
// declaration on the element always beats an inherited value.
const CALENDAR_THEME = {
  '--rdp-accent-color': 'var(--color-secondary)',
  '--rdp-accent-background-color': 'var(--color-accent-soft)',
  '--rdp-font-family': 'inherit',
  '--rdp-day-height': '2.2rem',
  '--rdp-day-width': '2.2rem',
  '--rdp-day_button-height': '2.2rem',
  '--rdp-day_button-width': '2.2rem',
} as React.CSSProperties

function formatDate(date: Date) {
  return date.toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })
}

type DateFieldProps = {
  id: string
  value: Date | undefined
  onChange: (value: Date | undefined) => void
  className?: string
  invalid?: boolean
  describedBy?: string
}

export function DateField({
  id,
  value,
  onChange,
  className,
  invalid,
  describedBy,
}: DateFieldProps) {
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const today = new Date()

  // The calendar is a popover, so it has to dismiss the way one does: on Escape
  // and on any click that lands outside it.
  useEffect(() => {
    if (!isOpen) return

    function handlePointerDown(event: MouseEvent) {
      if (!containerRef.current?.contains(event.target as Node)) setIsOpen(false)
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key !== 'Escape') return

      // Stop the surrounding <dialog> from closing along with the calendar.
      event.stopPropagation()
      setIsOpen(false)
    }

    document.addEventListener('mousedown', handlePointerDown)
    document.addEventListener('keydown', handleKeyDown, true)

    return () => {
      document.removeEventListener('mousedown', handlePointerDown)
      document.removeEventListener('keydown', handleKeyDown, true)
    }
  }, [isOpen])

  return (
    <div ref={containerRef}>
      {/* The icon sits over the input's right padding. pointer-events-none so
          clicking it still opens the calendar through the input beneath. */}
      <div className="relative flex items-center">
        <input
          id={id}
          type="text"
          className={`${className ?? ''} cursor-pointer pr-9`}
          readOnly
          placeholder="Select a date"
          value={value ? formatDate(value) : ''}
          onClick={() => setIsOpen((open) => !open)}
          onKeyDown={(event) => {
            if (event.key === 'Enter' || event.key === ' ') {
              event.preventDefault()
              setIsOpen((open) => !open)
            }
          }}
          aria-haspopup="dialog"
          aria-expanded={isOpen}
          aria-invalid={invalid}
          aria-describedby={describedBy}
        />
        <CalendarDays
          size={16}
          aria-hidden="true"
          className="pointer-events-none absolute right-3 text-secondary"
        />
      </div>

      {/* In flow rather than floating: the dialog scrolls on short screens, and
          an absolutely positioned calendar would be clipped by that scroll
          container. */}
      {isOpen && (
        <div
          role="dialog"
          aria-label="Choose a date"
          className={`mt-2 flex justify-center rounded-lg border border-line bg-page p-2 text-[0.9rem] text-heading ${CHEVRON_COLOR}`}
        >
          <DayPicker
            mode="single"
            required={false}
            autoFocus
            style={CALENDAR_THEME}
            captionLayout="dropdown"
            startMonth={new Date(EARLIEST_YEAR, 0)}
            endMonth={today}
            defaultMonth={value ?? today}
            disabled={{ after: today }}
            selected={value}
            onSelect={(selected) => {
              onChange(selected)
              if (selected) setIsOpen(false)
            }}
          />
        </div>
      )}
    </div>
  )
}
