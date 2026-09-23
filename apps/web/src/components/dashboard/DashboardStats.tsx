import { CalendarClock, PawPrint, Pill, TriangleAlert } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import type { PetDashboardResponse } from '../../api/types'

// Every number here is counted from the dashboard payload the page already
// has. None of it needs the API to aggregate anything.
function Stat({
  icon: Icon,
  value,
  label,
  alert,
}: {
  icon: LucideIcon
  value: number
  label: string
  alert?: boolean
}) {
  return (
    <div
      className={`flex items-center gap-3 rounded-lg border px-4 py-3 ${
        alert ? 'border-danger bg-danger/5' : 'border-line'
      }`}
    >
      <Icon
        size={20}
        aria-hidden="true"
        className={`shrink-0 ${alert ? 'text-danger' : 'text-secondary'}`}
      />
      <div>
        <div className={`text-[1.4rem] leading-none font-medium ${alert ? 'text-danger' : 'text-heading'}`}>
          {value}
        </div>
        <div className="mt-1 text-[0.75rem] tracking-[0.04em] uppercase opacity-65">{label}</div>
      </div>
    </div>
  )
}

export function DashboardStats({ pets }: { pets: PetDashboardResponse[] }) {
  const activeMedications = pets.reduce((total, pet) => total + pet.currentMedications.length, 0)
  const overdue = pets.filter((pet) => pet.nextImmunization?.isOverdue).length
  // "Scheduled" rather than "due soon": these dates can be years out, and a
  // tile promising urgency it cannot back up is worse than a plain count.
  const scheduled = pets.filter(
    (pet) => pet.nextImmunization && !pet.nextImmunization.isOverdue,
  ).length

  return (
    <div className="mb-6 grid grid-cols-[repeat(auto-fit,minmax(11rem,1fr))] gap-3">
      <Stat icon={PawPrint} value={pets.length} label="Pets" />
      <Stat icon={Pill} value={activeMedications} label="Active meds" />
      <Stat icon={TriangleAlert} value={overdue} label="Overdue" alert={overdue > 0} />
      <Stat icon={CalendarClock} value={scheduled} label="Scheduled" />
    </div>
  )
}
