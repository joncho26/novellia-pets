import { useCallback, useEffect, useState } from 'react'
import { Pill, Plus, Stethoscope, Syringe, TriangleAlert, type LucideIcon } from 'lucide-react'
import { AddPetModal } from './components/AddPetModal'
import { getDashboard } from './api/client'
import type { PetDashboardResponse } from './api/types'
import { PET_TYPE_ICON, PET_TYPE_LABEL } from './petLabels'
import { CTA_BUTTON } from './styles'

// Named so the card's repeated body rows stay one edit rather than eight
// identical class lists.
const CARD_TEXT = 'my-[0.2rem] text-[0.95rem]'

function formatDate(value: string) {
  return new Date(value).toLocaleDateString()
}

// The headings dropped their opacity when they took the secondary color:
// dimming it would undo the structure the color is there to give. The icon is
// decorative — the heading text already says what the section is.
function SectionHeading({ icon: Icon, children }: { icon: LucideIcon; children: string }) {
  return (
    <h3 className="mt-4 mb-[0.35rem] flex items-center gap-1.5 text-[0.8rem] font-semibold tracking-[0.04em] text-secondary uppercase">
      <Icon size={14} aria-hidden="true" />
      {children}
    </h3>
  )
}

function PetCard({ pet }: { pet: PetDashboardResponse }) {
  const TypeIcon = PET_TYPE_ICON[pet.type]

  return (
    <article className="rounded-lg border border-line px-5 py-4">
      <header className="mb-3">
        <h2 className="m-0 flex items-center gap-2 font-heading text-xl leading-[118%] font-medium tracking-[-0.24px] text-heading">
          <TypeIcon size={20} aria-hidden="true" className="shrink-0 text-secondary" />
          {pet.name}
        </h2>
        <span className="text-[0.9rem] opacity-70">
          {PET_TYPE_LABEL[pet.type]} &middot; {pet.weight.value} {pet.weight.unit}
        </span>
      </header>

      <section>
        <SectionHeading icon={Pill}>Current medications</SectionHeading>
        {pet.currentMedications.length === 0 ? (
          <p className={`${CARD_TEXT}`}>None</p>
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
          <p className={`${CARD_TEXT}`}>None recorded</p>
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

function App() {
  const [ownerId, setOwnerId] = useState<string | null>(null)
  const [pets, setPets] = useState<PetDashboardResponse[]>([])
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isAddingPet, setIsAddingPet] = useState(false)

  const load = useCallback(() => {
    return getDashboard()
      .then((dashboard) => {
        setOwnerId(dashboard.ownerId)
        setPets(dashboard.pets)
        setError(null)
      })
      .catch((cause: Error) => setError(cause.message))
      .finally(() => setIsLoading(false))
  }, [])

  useEffect(() => {
    void load()
  }, [load])

  return (
    <main className="mx-auto w-full max-w-4xl px-4 py-8 text-left">
      <header className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="mb-6 font-heading text-[1.75rem] font-medium text-primary">Pet dashboard</h1>
        <button
          type="button"
          className={`${CTA_BUTTON} mb-6 inline-flex items-center gap-2`}
          onClick={() => setIsAddingPet(true)}
          disabled={ownerId === null}
        >
          <Plus size={18} aria-hidden="true" />
          Add Pet
        </button>
      </header>

      {isLoading && <p>Loading…</p>}
      {error && <p className="text-danger">Could not load dashboard: {error}</p>}
      {!isLoading && !error && pets.length === 0 && <p className="opacity-55">No pets yet.</p>}

      <div className="grid grid-cols-[repeat(auto-fill,minmax(18rem,1fr))] gap-4">
        {pets.map((pet) => (
          <PetCard key={pet.petId} pet={pet} />
        ))}
      </div>

      {isAddingPet && ownerId !== null && (
        <AddPetModal
          ownerId={ownerId}
          onClose={() => setIsAddingPet(false)}
          onCreated={() => {
            setIsAddingPet(false)
            void load()
          }}
        />
      )}
    </main>
  )
}

export default App
