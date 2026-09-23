import type { PetDashboardResponse } from '../../api/types'
import { parseDateOnly } from '../../dates'

// "Soon" is a week. Anything further out is planning, not attention.
export const ATTENTION_WINDOW_DAYS = 7

export type AttentionItem = {
  key: string
  petId: string
  petName: string
  kind: 'immunization' | 'medication'
  name: string
  date: string
  // Negative when the date has already passed.
  daysAway: number
}

// Midnight local, so "in 2 days" counts calendar days rather than 48 hours:
// something due tomorrow morning should not read as "today" at 11pm.
function startOfToday() {
  const now = new Date()

  return new Date(now.getFullYear(), now.getMonth(), now.getDate())
}

function daysUntil(value: string, today: Date) {
  // Rounded, not floored: a clock change mid-window makes the raw division
  // land an hour either side of a whole number.
  return Math.round((parseDateOnly(value).getTime() - today.getTime()) / 86_400_000)
}

// Everything worth acting on this week, across every pet, soonest first.
// Overdue items come with it — a dose missed last week needs more attention
// than one due on Friday, and a panel that hid it would be lying by omission.
export function collectAttention(pets: PetDashboardResponse[]): AttentionItem[] {
  const today = startOfToday()
  const items: AttentionItem[] = []

  for (const pet of pets) {
    const due = pet.nextImmunization

    if (due) {
      const daysAway = daysUntil(due.nextDueDate, today)

      if (daysAway <= ATTENTION_WINDOW_DAYS) {
        items.push({
          key: `immunization-${pet.petId}-${due.vaccineId}`,
          petId: pet.petId,
          petName: pet.name,
          kind: 'immunization',
          name: due.name,
          date: due.nextDueDate,
          daysAway,
        })
      }
    }

    for (const medication of pet.currentMedications) {
      // An open-ended course has nothing to end, so nothing to flag.
      if (!medication.endDate) continue

      const daysAway = daysUntil(medication.endDate, today)

      if (daysAway <= ATTENTION_WINDOW_DAYS) {
        items.push({
          key: `medication-${medication.id}`,
          petId: pet.petId,
          petName: pet.name,
          kind: 'medication',
          name: medication.name,
          date: medication.endDate,
          daysAway,
        })
      }
    }
  }

  return items.sort((a, b) => a.daysAway - b.daysAway || a.petName.localeCompare(b.petName))
}

export function describeDaysAway(daysAway: number) {
  if (daysAway < 0) return `${-daysAway} ${-daysAway === 1 ? 'day' : 'days'} overdue`
  if (daysAway === 0) return 'Today'
  if (daysAway === 1) return 'Tomorrow'

  return `In ${daysAway} days`
}
