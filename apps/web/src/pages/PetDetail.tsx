import { useEffect, useState } from 'react'
import { ArrowLeft, ClipboardList, Pill, Stethoscope, Syringe } from 'lucide-react'
import { Link, Navigate, useParams } from 'react-router'
import { getPet } from '../api/client'
import type { PetDetailResponse } from '../api/types'
import { PET_SEX_LABEL, PET_TYPE_ICON, PET_TYPE_LABEL } from '../petLabels'
import { SectionHeading } from '../components/SectionHeading'
import { AddMedicalRecordModal } from '../components/AddMedicalRecordModal'

const ROW = 'my-[0.2rem] text-[0.95rem]'
const EMPTY = 'my-[0.2rem] text-[0.95rem] opacity-55'

function formatDate(value: string) {
  return new Date(value).toLocaleDateString()
}

// Whole years only: "3" is what an owner says, and the month remainder is
// noise next to a date of birth that is shown right beside it.
function ageInYears(dateOfBirth: string) {
  const born = new Date(dateOfBirth)
  const now = new Date()
  let years = now.getFullYear() - born.getFullYear()

  const monthDelta = now.getMonth() - born.getMonth()
  if (monthDelta < 0 || (monthDelta === 0 && now.getDate() < born.getDate())) years -= 1

  return years
}

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-[0.75rem] uppercase tracking-[0.04em] opacity-65">{label}</dt>
      <dd className="m-0 text-[0.95rem]">{value}</dd>
    </div>
  )
}

function PetRecord({ pet, onChanged }: { pet: PetDetailResponse; onChanged: () => void }) {
  const TypeIcon = PET_TYPE_ICON[pet.type]
  const [isAddingRecord, setIsAddingRecord] = useState(false)

  return (
    <>
      <h1 className="m-0 flex items-center gap-2 font-heading text-[1.75rem] leading-[118%] font-medium tracking-[-0.24px] text-primary">
        <TypeIcon size={26} aria-hidden="true" className="shrink-0 text-secondary" />
        {pet.name}
      </h1>

      <dl className="mt-6 grid grid-cols-[repeat(auto-fit,minmax(9rem,1fr))] gap-x-4 gap-y-3">
        <Fact label="Type" value={PET_TYPE_LABEL[pet.type]} />
        <Fact label="Breed" value={pet.breed ?? 'Not recorded'} />
        <Fact
          label="Date of birth"
          value={`${formatDate(pet.dateOfBirth)} (${ageInYears(pet.dateOfBirth)} yrs)`}
        />
        <Fact label="Weight" value={`${pet.weight} ${pet.weightUnit}`} />
        <Fact label="Sex" value={PET_SEX_LABEL[pet.sex]} />
        <Fact
          label="Neutered"
          // null is "nobody has said", which is not the same as "no".
          value={pet.neutered === null ? 'Not recorded' : pet.neutered ? 'Yes' : 'No'}
        />
        {pet.microchipId && <Fact label="Microchip" value={pet.microchipId} />}
      </dl>

      <section>
        <SectionHeading icon={Pill} level={2} action={{ label: 'Add medication' }}>
          Medications
        </SectionHeading>
        {pet.medications.length === 0 ? (
          <p className={EMPTY}>None recorded</p>
        ) : (
          <ul className="m-0 pl-[1.1rem]">
            {pet.medications.map((medication) => (
              <li key={medication.id} className={ROW}>
                {medication.name} &mdash; {medication.dosageAmount} {medication.dosageUnit},{' '}
                {medication.frequency}{' '}
                <span className="opacity-65">
                  ({medication.status.toLowerCase()}, from {formatDate(medication.startDate)}
                  {medication.endDate ? ` to ${formatDate(medication.endDate)}` : ''})
                </span>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section>
        <SectionHeading icon={Syringe} level={2} action={{ label: 'Add immunization' }}>
          Immunizations
        </SectionHeading>
        {pet.immunizations.length === 0 ? (
          <p className={EMPTY}>None recorded</p>
        ) : (
          <ul className="m-0 pl-[1.1rem]">
            {pet.immunizations.map((immunization) => (
              <li key={immunization.id} className={ROW}>
                {immunization.vaccine.name} on {formatDate(immunization.dateAdministered)}
                {immunization.nextDueDate && (
                  <span className="opacity-65">
                    {' '}
                    (next due {formatDate(immunization.nextDueDate)})
                  </span>
                )}
              </li>
            ))}
          </ul>
        )}
      </section>

      <section>
        <SectionHeading icon={Stethoscope} level={2} action={{ label: 'Add diagnostic' }}>
          Diagnostics
        </SectionHeading>
        {pet.diagnostics.length === 0 ? (
          <p className={EMPTY}>None recorded</p>
        ) : (
          <ul className="m-0 pl-[1.1rem]">
            {pet.diagnostics.map((diagnostic) => (
              <li key={diagnostic.id} className={ROW}>
                {diagnostic.type} on {formatDate(diagnostic.date)}
                {diagnostic.result ? ` — ${diagnostic.result}` : ''}
              </li>
            ))}
          </ul>
        )}
      </section>

      <section>
        <SectionHeading icon={ClipboardList} level={2} action={{ label: 'Add treatment' }}>
          Treatments
        </SectionHeading>
        {pet.treatments.length === 0 ? (
          <p className={EMPTY}>None recorded</p>
        ) : (
          <ul className="m-0 pl-[1.1rem]">
            {pet.treatments.map((treatment) => (
              <li key={treatment.id} className={ROW}>
                {treatment.name} on {formatDate(treatment.date)}
                {treatment.notes ? ` — ${treatment.notes}` : ''}
              </li>
            ))}
          </ul>
        )}
      </section>

      <section>
        <SectionHeading
          icon={ClipboardList}
          level={2}
          action={{ label: 'Add medical record', onClick: () => setIsAddingRecord(true) }}
        >
          Medical records
        </SectionHeading>
        {pet.medicalRecords.length === 0 ? (
          <p className={EMPTY}>None recorded</p>
        ) : (
          <ul className="m-0 pl-[1.1rem]">
            {pet.medicalRecords.map((record) => (
              <li key={record.id} className={ROW}>
                {formatDate(record.recordDate)}
                {record.vetName ? ` — ${record.vetName}` : ''}
                {record.notes ? ` — ${record.notes}` : ''}
              </li>
            ))}
          </ul>
        )}
      </section>

      {isAddingRecord && (
        <AddMedicalRecordModal
          petId={pet.id}
          onClose={() => setIsAddingRecord(false)}
          onCreated={() => {
            setIsAddingRecord(false)
            onChanged()
          }}
        />
      )}
    </>
  )
}

function PetRecordLoader({ petId }: { petId: string }) {
  const [pet, setPet] = useState<PetDetailResponse | null>(null)
  const [error, setError] = useState<string | null>(null)
  // Bumped after a write, to pull the pet's record back down fresh.
  const [reloadToken, setReloadToken] = useState(0)

  useEffect(() => {
    let isCurrent = true

    getPet(petId)
      .then((result) => {
        // The route can change before this lands.
        if (isCurrent) setPet(result)
      })
      .catch((cause: Error) => {
        if (isCurrent) setError(cause.message)
      })

    return () => {
      isCurrent = false
    }
  }, [petId, reloadToken])

  if (error) return <p className="text-danger">Could not load pet: {error}</p>
  if (!pet) return <p>Loading…</p>

  return <PetRecord pet={pet} onChanged={() => setReloadToken((token) => token + 1)} />
}

export function PetDetail() {
  const { petId } = useParams<{ petId: string }>()

  // The route pattern guarantees a petId; this is for the type, not the user.
  if (!petId) return <Navigate to="/" replace />

  return (
    <>
      <Link
        to="/"
        className="mb-6 inline-flex items-center gap-1.5 text-[0.9rem] text-body no-underline hover:text-primary"
      >
        <ArrowLeft size={16} aria-hidden="true" />
        Back to dashboard
      </Link>

      {/* Keyed so navigating between pets remounts the loader with empty state,
          rather than showing the previous pet's record while the next loads. */}
      <PetRecordLoader key={petId} petId={petId} />
    </>
  )
}
