// Every date the API sends for a date-only column — a birthday, a record date,
// a dose date — arrives as UTC midnight: "2026-02-01T00:00:00.000Z". Passing
// that to `new Date()` and formatting it renders the day before for anyone west
// of UTC, because UTC midnight is still the previous evening locally.
//
// These helpers read and write the calendar date rather than the instant. Use
// them for date-only columns; a true timestamp such as createdAt should be
// parsed normally, since for those the instant is the point.

// "2026-02-01T00:00:00.000Z" -> local Feb 1, not Jan 31.
export function parseDateOnly(value: string) {
  const [year, month, day] = value.slice(0, 10).split('-').map(Number)

  return new Date(year, month - 1, day)
}

export function formatDateOnly(value: string) {
  return parseDateOnly(value).toLocaleDateString()
}

// The inverse: a local Date back to "YYYY-MM-DD", without toISOString() moving
// it across the boundary in the other direction.
export function toDateOnly(date: Date) {
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')

  return `${date.getFullYear()}-${month}-${day}`
}
