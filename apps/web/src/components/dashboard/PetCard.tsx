import { Pill, Stethoscope, Syringe, TriangleAlert, type LucideIcon } from 'lucide-react'
import type { ReactNode } from 'react'
import { Link } from 'react-router'
import type { PetDashboardResponse } from '../../api/types'
import { formatDateOnly as formatDate } from '../../dates'
import { PET_TYPE_ICON, PET_TYPE_LABEL } from '../../petLabels'

// A dashboard tile, not a miniature detail page: one line per thing worth
// knowing, so a screenful of pets can be read at a glance. The full lists are
// one click away on the pet's own page.
function Line({ icon: Icon, children }: { icon: LucideIcon; children: ReactNode }) {
  return (
    <li className="flex items-start gap-2 text-[0.85rem]">
      <Icon size={14} aria-hidden="true" className="mt-[0.2rem] shrink-0 text-secondary" />
      <span>{children}</span>
    </li>
  )
}

export function PetCard({ pet }: { pet: PetDashboardResponse }) {
  const TypeIcon = PET_TYPE_ICON[pet.type]
  const medications = pet.currentMedications.length

  return (
    <article className="relative flex flex-col rounded-lg border border-line p-4 transition-colors duration-200 hover:border-accent-line focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-accent">
      <h2 className="m-0 flex items-center gap-2 font-heading text-[1.1rem] leading-tight font-medium tracking-[-0.24px] text-heading">
        <TypeIcon size={18} aria-hidden="true" className="shrink-0 text-secondary" />
        {/* A stretched link: the ::after covers the whole tile, so the tile is
            clickable while the link's accessible name stays just the pet's
            name rather than everything written on it. */}
        <Link
          to={`/pets/${pet.petId}`}
          className="text-inherit no-underline after:absolute after:inset-0 focus-visible:outline-none"
        >
          {pet.name}
        </Link>
      </h2>

      <p className="mt-1 text-[0.8rem] opacity-65">
        {PET_TYPE_LABEL[pet.type]} &middot; {pet.weight.value} {pet.weight.unit}
      </p>

      <ul className="mt-3 flex list-none flex-col gap-1.5 p-0">
        <Line icon={Pill}>
          {medications === 0 ? (
            <span className="opacity-55">No active medications</span>
          ) : (
            `${medications} active medication${medications === 1 ? '' : 's'}`
          )}
        </Line>

        {/* The icon changes with the state: an overdue dose should not look
            like a routine one at a glance. */}
        <Line icon={pet.nextImmunization?.isOverdue ? TriangleAlert : Syringe}>
          {pet.nextImmunization ? (
            <>
              {pet.nextImmunization.name} due {formatDate(pet.nextImmunization.nextDueDate)}
              {pet.nextImmunization.isOverdue && (
                <span className="ml-1 font-semibold text-danger">overdue</span>
              )}
            </>
          ) : (
            <span className="opacity-55">No immunization scheduled</span>
          )}
        </Line>

        <Line icon={Stethoscope}>
          {pet.latestDiagnostic ? (
            <>
              {pet.latestDiagnostic.type} on {formatDate(pet.latestDiagnostic.date)}
            </>
          ) : (
            <span className="opacity-55">No diagnostics yet</span>
          )}
        </Line>
      </ul>
    </article>
  )
}
