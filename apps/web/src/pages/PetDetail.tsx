import { useEffect, useState } from 'react'
import { ArrowLeft, ClipboardList, Pencil, Pill, Stethoscope, Syringe, Trash2 } from 'lucide-react'
import { Link, Navigate, useNavigate, useParams } from 'react-router'
import { deletePet, getPet } from '../api/client'
import type { PetDetailResponse } from '../api/types'
import { formatDateOnly as formatDate, parseDateOnly } from '../dates'
import { PET_SEX_LABEL, PET_TYPE_ICON, PET_TYPE_LABEL } from '../petLabels'
import { FilterableSection } from '../components/filters/FilterableSection'
import { MedicationFilterFields } from '../components/filters/MedicationFilterFields'
import {
  applyMedicationFilter,
  countMedicationFilters,
  emptyMedicationFilter,
} from '../components/filters/medicationFilter'
import { ImmunizationFilterFields } from '../components/filters/ImmunizationFilterFields'
import { DiagnosticFilterFields } from '../components/filters/DiagnosticFilterFields'
import { TreatmentFilterFields } from '../components/filters/TreatmentFilterFields'
import { MedicalRecordFilterFields } from '../components/filters/MedicalRecordFilterFields'
import {
  applyImmunizationFilter,
  countImmunizationFilters,
  emptyImmunizationFilter,
  vaccineOptionsFrom,
} from '../components/filters/immunizationFilter'
import {
  applyDiagnosticFilter,
  countDiagnosticFilters,
  emptyDiagnosticFilter,
} from '../components/filters/diagnosticFilter'
import {
  applyTreatmentFilter,
  countTreatmentFilters,
  emptyTreatmentFilter,
} from '../components/filters/treatmentFilter'
import {
  applyMedicalRecordFilter,
  countMedicalRecordFilters,
  emptyMedicalRecordFilter,
} from '../components/filters/medicalRecordFilter'
import { AddMedicalRecordModal } from '../components/modals/AddMedicalRecordModal'
import { AddAttachmentModal, type AttachmentKind } from '../components/modals/AddAttachmentModal'
import { EditPetModal } from '../components/modals/EditPetModal'
import { ConfirmDialog } from '../components/modals/ConfirmDialog'
import { STYLES } from '../styles'
import {
  DiagnosticList,
  ImmunizationList,
  MedicationList,
  TreatmentList,
} from '../components/RecordLists'

const EMPTY = 'my-[0.2rem] text-[0.85rem] opacity-55'

// Whole years only: "3" is what an owner says, and the month remainder is
// noise next to a date of birth that is shown right beside it.
function ageInYears(dateOfBirth: string) {
  const born = parseDateOnly(dateOfBirth)
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
  const navigate = useNavigate()
  const [isEditing, setIsEditing] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [isDeletePending, setIsDeletePending] = useState(false)
  const [deleteError, setDeleteError] = useState<string | null>(null)
  const [isAddingRecord, setIsAddingRecord] = useState(false)
  // Entries added from this page belong to the pet rather than to any visit,
  // so no record id is passed to the form below.
  const [adding, setAdding] = useState<AttachmentKind | null>(null)

  async function handleDelete() {
    setIsDeletePending(true)
    setDeleteError(null)

    try {
      await deletePet(pet.id)

      // This page's subject is gone, so staying here would 404 on the next
      // load. `replace` keeps the deleted pet out of the history.
      await navigate('/', { replace: true })
    } catch (cause) {
      setDeleteError(cause instanceof Error ? cause.message : 'Something went wrong.')
      setIsDeletePending(false)
    }
  }

  const historyCount =
    pet.medications.length +
    pet.treatments.length +
    pet.diagnostics.length +
    pet.immunizations.length +
    pet.medicalRecords.length

  const [medicationFilter, setMedicationFilter] = useState(emptyMedicationFilter)
  const filteredMedications = applyMedicationFilter(pet.medications, medicationFilter)

  const [immunizationFilter, setImmunizationFilter] = useState(emptyImmunizationFilter)
  const filteredImmunizations = applyImmunizationFilter(pet.immunizations, immunizationFilter)

  const [diagnosticFilter, setDiagnosticFilter] = useState(emptyDiagnosticFilter)
  const filteredDiagnostics = applyDiagnosticFilter(pet.diagnostics, diagnosticFilter)

  const [treatmentFilter, setTreatmentFilter] = useState(emptyTreatmentFilter)
  const filteredTreatments = applyTreatmentFilter(pet.treatments, treatmentFilter)

  const [recordFilter, setRecordFilter] = useState(emptyMedicalRecordFilter)
  const filteredRecords = applyMedicalRecordFilter(pet.medicalRecords, recordFilter)

  // Lets each entry below say which visit it came from. No extra request: the
  // pet's own records are already in this payload.
  const visits = new Map(pet.medicalRecords.map((record) => [record.id, record.recordDate]))

  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="m-0 flex items-center gap-2 font-heading text-[1.75rem] leading-[118%] font-medium tracking-[-0.24px] text-primary">
          <TypeIcon size={26} aria-hidden="true" className="shrink-0 text-secondary" />
          {pet.name}
        </h1>

        <div className="flex gap-2">
          <button
            type="button"
            className={STYLES.SECONDARY_ICON_BUTTON}
            aria-label={`Edit ${pet.name}`}
            title={`Edit ${pet.name}`}
            onClick={() => setIsEditing(true)}
          >
            <Pencil size={16} aria-hidden="true" />
          </button>
          <button
            type="button"
            className={STYLES.DANGER_ICON_BUTTON}
            aria-label={`Delete ${pet.name}`}
            title={`Delete ${pet.name}`}
            onClick={() => setIsDeleting(true)}
          >
            <Trash2 size={16} aria-hidden="true" />
          </button>
        </div>
      </div>

      <dl className="mt-6 grid grid-cols-[repeat(auto-fit,minmax(16rem,1fr))] gap-x-4 gap-y-3">
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

      <FilterableSection
        icon={Pill}
        title="All medications"
        action={{ label: 'Add a medication', onClick: () => setAdding('medication') }}
        filters={
          <MedicationFilterFields
            filter={medicationFilter}
            onChange={(patch) => setMedicationFilter((current) => ({ ...current, ...patch }))}
          />
        }
        activeCount={countMedicationFilters(medicationFilter)}
        onClear={() => setMedicationFilter(emptyMedicationFilter())}
        total={pet.medications.length}
        shown={filteredMedications.length}
      >
        <MedicationList items={filteredMedications} visits={visits} onChanged={onChanged} />
      </FilterableSection>

      <FilterableSection
        icon={Syringe}
        title="All immunizations"
        action={{ label: 'Add an immunization', onClick: () => setAdding('immunization') }}
        filters={
          <ImmunizationFilterFields
            vaccines={vaccineOptionsFrom(pet.immunizations)}
            filter={immunizationFilter}
            onChange={(patch) => setImmunizationFilter((current) => ({ ...current, ...patch }))}
          />
        }
        activeCount={countImmunizationFilters(immunizationFilter)}
        onClear={() => setImmunizationFilter(emptyImmunizationFilter())}
        total={pet.immunizations.length}
        shown={filteredImmunizations.length}
      >
        <ImmunizationList items={filteredImmunizations} petId={pet.id} visits={visits} onChanged={onChanged} />
      </FilterableSection>

      <FilterableSection
        icon={Stethoscope}
        title="All diagnostics"
        action={{ label: 'Add a diagnostic', onClick: () => setAdding('diagnostic') }}
        filters={
          <DiagnosticFilterFields
            filter={diagnosticFilter}
            onChange={(patch) => setDiagnosticFilter((current) => ({ ...current, ...patch }))}
          />
        }
        activeCount={countDiagnosticFilters(diagnosticFilter)}
        onClear={() => setDiagnosticFilter(emptyDiagnosticFilter())}
        total={pet.diagnostics.length}
        shown={filteredDiagnostics.length}
      >
        <DiagnosticList items={filteredDiagnostics} visits={visits} onChanged={onChanged} />
      </FilterableSection>

      <FilterableSection
        icon={ClipboardList}
        title="All treatments"
        action={{ label: 'Add a treatment', onClick: () => setAdding('treatment') }}
        filters={
          <TreatmentFilterFields
            filter={treatmentFilter}
            onChange={(patch) => setTreatmentFilter((current) => ({ ...current, ...patch }))}
          />
        }
        activeCount={countTreatmentFilters(treatmentFilter)}
        onClear={() => setTreatmentFilter(emptyTreatmentFilter())}
        total={pet.treatments.length}
        shown={filteredTreatments.length}
      >
        <TreatmentList items={filteredTreatments} visits={visits} onChanged={onChanged} />
      </FilterableSection>

      <FilterableSection
        icon={ClipboardList}
        title="Medical records"
        action={{ label: 'Add medical record', onClick: () => setIsAddingRecord(true) }}
        filters={
          <MedicalRecordFilterFields
            filter={recordFilter}
            onChange={(patch) => setRecordFilter((current) => ({ ...current, ...patch }))}
          />
        }
        activeCount={countMedicalRecordFilters(recordFilter)}
        onClear={() => setRecordFilter(emptyMedicalRecordFilter())}
        total={pet.medicalRecords.length}
        shown={filteredRecords.length}
      >
        {filteredRecords.length === 0 ? (
          <p className={EMPTY}>
            {pet.medicalRecords.length === 0 ? 'None recorded' : 'No matches'}
          </p>
        ) : (
          // A list of links rather than a list with links in it: the whole row
          // is the target, and the date leads because it is what distinguishes
          // one visit from another.
          <ul className="m-0 flex list-none flex-col gap-1 p-0">
            {filteredRecords.map((record) => (
              <li key={record.id}>
                <Link
                  to={`/medical-records/${record.id}`}
                  className="block rounded-[0.4rem] border border-line px-3 py-2 text-[0.95rem] text-body no-underline transition-colors duration-200 hover:border-accent-line hover:bg-accent-soft focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                >
                  <span className="font-semibold text-heading">
                    {formatDate(record.recordDate)}
                  </span>
                  {record.vetName ? ` — ${record.vetName}` : ''}
                  {record.notes ? ` — ${record.notes}` : ''}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </FilterableSection>

      {adding && (
        <AddAttachmentModal
          kind={adding}
          petId={pet.id}
          onClose={() => setAdding(null)}
          onCreated={() => {
            setAdding(null)
            onChanged()
          }}
        />
      )}

      {isEditing && (
        <EditPetModal
          pet={pet}
          onClose={() => setIsEditing(false)}
          onSaved={() => {
            setIsEditing(false)
            onChanged()
          }}
        />
      )}

      {isDeleting && (
        <ConfirmDialog
          title={`Delete ${pet.name}?`}
          confirmLabel="Delete pet"
          busyLabel="Deleting…"
          isBusy={isDeletePending}
          error={deleteError}
          onConfirm={handleDelete}
          onClose={() => {
            setIsDeleting(false)
            setDeleteError(null)
          }}
        >
          <p className="m-0">
            <strong>{pet.name}</strong> will be permanently removed. This can’t be undone.
          </p>
          {/* Unlike deleting a visit, this destroys the entries rather than
              unlinking them — so the count is worth stating plainly. */}
          {historyCount > 0 && (
            <p className="m-0 mt-2 opacity-70">
              Their {historyCount} medical {historyCount === 1 ? 'entry' : 'entries'} — medications,
              treatments, diagnostics, immunizations and visits — will be deleted too.
            </p>
          )}
        </ConfirmDialog>
      )}

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
    <div className="mx-auto w-full max-w-4xl">
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
    </div>
  )
}
