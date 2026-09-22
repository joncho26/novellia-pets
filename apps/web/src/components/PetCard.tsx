import { Pill, Stethoscope, Syringe, TriangleAlert } from 'lucide-react'
import { Link } from 'react-router'
import type { PetDashboardResponse } from '../api/types'
import { PET_TYPE_ICON, PET_TYPE_LABEL } from '../petLabels'
import { SectionHeading } from './SectionHeading'

// Named so the card's repeated body rows stay one edit rather than eight
// identical class lists.
const CARD_TEXT = 'my-[0.2rem] text-[0.95rem]'

function formatDate(value: string) {
  return new Date(value).toLocaleDateString()
}

export function PetCard({ pet }: { pet: PetDashboardResponse }) {
  const TypeIcon = PET_TYPE_ICON[pet.type]

  return (
    <article className="relative rounded-lg border border-line px-5 py-4 transition-colors duration-200 hover:border-accent-line focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-accent">
      <header className="mb-3">
        <h2 className="m-0 flex items-center gap-2 font-heading text-xl leading-[118%] font-medium tracking-[-0.24px] text-heading">
          <TypeIcon size={20} aria-hidden="true" className="shrink-0 text-secondary" />
          {/* A stretched link: the ::after covers the whole card, so the card is
              clickable while the link's accessible name stays just the pet's
              name rather than the card's entire contents. */}
          <Link
            to={`/pets/${pet.petId}`}
            className="no-underline text-inherit after:absolute after:inset-0 focus-visible:outline-none"
          >
            {pet.name}
          </Link>
        </h2>
        <span className="text-[0.9rem] opacity-70">
          {PET_TYPE_LABEL[pet.type]} &middot; {pet.weight.value} {pet.weight.unit}
        </span>
      </header>

      <section>
        <SectionHeading icon={Pill}>Current medications</SectionHeading>
        {pet.currentMedications.length === 0 ? (
          <p className={CARD_TEXT}>None</p>
        ) : (
          <ul className="m-0 pl-[1.1rem]">
            {pet.currentMedications.map((medication) => (
              <li key={medication.id} className={CARD_TEXT}>
                {medication.name} &mdash; {medication.dosageAmount} {medication.dosageUnit},{' '}
                {medication.frequency}
              </li>
            ))}
          </ul>
        )}
      </section>

      <section>
        <SectionHeading icon={Stethoscope}>Latest diagnostic</SectionHeading>
        {pet.latestDiagnostic ? (
          <p className={CARD_TEXT}>
            {pet.latestDiagnostic.type} on {formatDate(pet.latestDiagnostic.date)}
            {pet.latestDiagnostic.result ? ` — ${pet.latestDiagnostic.result}` : ''}
          </p>
        ) : (
          <p className={CARD_TEXT}>None recorded</p>
        )}
      </section>

      <section>
        <SectionHeading icon={Syringe}>Immunizations</SectionHeading>
        <p className={CARD_TEXT}>
          Last:{' '}
          {pet.lastImmunization
            ? `${pet.lastImmunization.name} on ${formatDate(pet.lastImmunization.dateAdministered)}`
            : 'None recorded'}
        </p>
        <p className={CARD_TEXT}>
          Next:{' '}
          {pet.nextImmunization ? (
            <>
              {pet.nextImmunization.name} due {formatDate(pet.nextImmunization.nextDueDate)}
              {pet.nextImmunization.isOverdue && (
                <span className="ml-1 inline-flex items-center gap-1 align-text-bottom font-semibold text-danger">
                  <TriangleAlert size={14} aria-hidden="true" />
                  overdue
                </span>
              )}
            </>
          ) : (
            'Nothing scheduled'
          )}
        </p>
      </section>
    </article>
  )
}
