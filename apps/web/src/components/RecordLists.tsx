import { useState, type ReactNode } from 'react'
import { Link } from 'react-router'
import {
  deleteDiagnostic,
  deleteImmunization,
  deleteMedication,
  deleteTreatment,
} from '../api/client'
import type { PetDetailResponse } from '../api/types'
import { EditDiagnosticModal } from './EditDiagnosticModal'
import { EditImmunizationModal } from './EditImmunizationModal'
import { EditMedicationModal } from './EditMedicationModal'
import { EditTreatmentModal } from './EditTreatmentModal'
import { RowActions } from './RowActions'
import { formatDateOnly as formatDate } from '../dates'
import {
  MEDICATION_STATUS_DOT,
  MEDICATION_STATUS_LABEL,
  MEDICATION_STATUS_TEXT,
} from '../petLabels'

// The pet page and the medical record page render the same four tables, so they
// are written once here. The element types come from the pet response; the
// record response reuses the same shapes on the API side.
//
// The dashboard cards deliberately do not use these: at 18rem wide there is no
// room for columns, so they keep their own compact rows.
type Medications = PetDetailResponse['medications']
type Immunizations = PetDetailResponse['immunizations']
type Diagnostics = PetDetailResponse['diagnostics']
type Treatments = PetDetailResponse['treatments']

const TABLE = 'w-full border-collapse text-left text-[0.85rem]'
const TH =
  'border-b border-line px-2 py-1.5 text-[0.7rem] font-semibold tracking-[0.04em] uppercase opacity-65'
const TD = 'border-b border-line px-2 py-1.5 align-top'
// Shrinks to its contents and never wraps, so the controls land in the same
// place on every row however long the text beside them runs.
const TD_ACTIONS = `${TD} w-0 text-right whitespace-nowrap`
const NOWRAP = `${TD} whitespace-nowrap`
const MUTED = 'opacity-55'

function Empty() {
  return <p className="my-[0.2rem] text-[0.85rem] opacity-55">None recorded</p>
}

// A table is the one thing on these pages that cannot reflow, so on a narrow
// screen the table scrolls rather than the whole page.
function Table({ head, children }: { head: ReactNode; children: ReactNode }) {
  return (
    <div className="overflow-x-auto">
      <table className={TABLE}>
        <thead>
          <tr>
            {head}
            <th className={`${TH} w-0`}>
              <span className="sr-only">Actions</span>
            </th>
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
    </div>
  )
}

// Which visit each row came from, keyed by record id. The pet page passes it,
// which adds a Visit column; the record page leaves it out, since every row
// there belongs to the visit already named at the top of the page.
export type VisitDates = Map<string, string>

// onChanged turns the rows editable: without it the tables stay read-only, so a
// caller has to opt in by saying how it will refresh afterwards.
// petId is only needed by the immunization form, which loads the vaccine
// catalog to choose from; the row itself carries the vaccine but not the pet.
type ListProps<T> = {
  items: T
  visits?: VisitDates
  onChanged?: () => void
  petId?: string
}

// An entry can belong to no visit at all — medicalRecordId is nullable — so a
// dash means "recorded outside a visit", not "data missing".
function VisitCell({ recordId, visits }: { recordId: string | null; visits: VisitDates }) {
  const date = recordId ? visits.get(recordId) : undefined

  return (
    <td className={NOWRAP}>
      {recordId && date ? (
        <Link to={`/medical-records/${recordId}`} className="text-body underline">
          {formatDate(date)}
        </Link>
      ) : (
        <span className={MUTED}>&mdash;</span>
      )}
    </td>
  )
}

// An open-ended course reads "from 9/1/26" rather than leaving the end blank,
// so an ongoing medication is distinguishable from one missing its end date.
function period(startDate: string, endDate: string | null) {
  if (!endDate) return `from ${formatDate(startDate)}`

  return `${formatDate(startDate)} – ${formatDate(endDate)}`
}

// In a column of its own the word is always shown. The space a bare dot saved
// on an inline row is already spent on the column, and a header reading
// "Status" above four unlabelled dots would be the worse trade.
function StatusCell({ status }: { status: Medications[number]['status'] }) {
  return (
    <td className={`${NOWRAP} ${MEDICATION_STATUS_TEXT[status]}`}>
      <span
        aria-hidden="true"
        className={`mr-1.5 inline-block size-2 shrink-0 rounded-full align-middle ${MEDICATION_STATUS_DOT[status]}`}
      />
      {MEDICATION_STATUS_LABEL[status]}
    </td>
  )
}

// Its own component because the edit form's open state belongs to the row, not
// to the table: opening one must not re-render or reset the others.
function MedicationRow({
  medication,
  visits,
  onChanged,
}: {
  medication: Medications[number]
  visits?: VisitDates
  onChanged?: () => void
}) {
  const [isEditing, setIsEditing] = useState(false)

  return (
    <tr>
      <td className={TD}>{medication.name}</td>
      <td className={NOWRAP}>
        {medication.dosageAmount} {medication.dosageUnit}
      </td>
      <td className={TD}>{medication.frequency}</td>
      <td className={NOWRAP}>{period(medication.startDate, medication.endDate)}</td>
      <StatusCell status={medication.status} />
      {visits && <VisitCell recordId={medication.medicalRecordId} visits={visits} />}
      <td className={TD_ACTIONS}>
        {onChanged && (
          <RowActions
            name={medication.name}
            onEdit={() => setIsEditing(true)}
            onDelete={() => deleteMedication(medication.id)}
            onDeleted={onChanged}
          />
        )}
        {isEditing && onChanged && (
          <EditMedicationModal
            medication={medication}
            onClose={() => setIsEditing(false)}
            onSaved={() => {
              setIsEditing(false)
              onChanged()
            }}
          />
        )}
      </td>
    </tr>
  )
}

export function MedicationList({ items, visits, onChanged }: ListProps<Medications>) {
  if (items.length === 0) return <Empty />

  return (
    <Table
      head={
        <>
          <th className={TH}>Name</th>
          <th className={TH}>Dosage</th>
          <th className={TH}>Frequency</th>
          <th className={TH}>Period</th>
          <th className={TH}>Status</th>
          {visits && <th className={TH}>Visit</th>}
        </>
      }
    >
      {items.map((medication) => (
        <MedicationRow
          key={medication.id}
          medication={medication}
          visits={visits}
          onChanged={onChanged}
        />
      ))}
    </Table>
  )
}

function ImmunizationRow({
  immunization,
  visits,
  onChanged,
  petId,
}: {
  immunization: Immunizations[number]
  visits?: VisitDates
  onChanged?: () => void
  petId?: string
}) {
  const [isEditing, setIsEditing] = useState(false)

  return (
    <tr>
      <td className={TD}>{immunization.vaccine.name}</td>
      <td className={NOWRAP}>{formatDate(immunization.dateAdministered)}</td>
      <td className={NOWRAP}>
        {immunization.nextDueDate ? (
          formatDate(immunization.nextDueDate)
        ) : (
          <span className={MUTED}>&mdash;</span>
        )}
      </td>
      {visits && <VisitCell recordId={immunization.medicalRecordId} visits={visits} />}
      <td className={TD_ACTIONS}>
        {onChanged && (
          <RowActions
            name={immunization.vaccine.name}
            onEdit={petId ? () => setIsEditing(true) : undefined}
            onDelete={() => deleteImmunization(immunization.id)}
            onDeleted={onChanged}
          />
        )}
        {isEditing && onChanged && petId && (
          <EditImmunizationModal
            immunization={immunization}
            petId={petId}
            onClose={() => setIsEditing(false)}
            onSaved={() => {
              setIsEditing(false)
              onChanged()
            }}
          />
        )}
      </td>
    </tr>
  )
}

export function ImmunizationList({ items, visits, onChanged, petId }: ListProps<Immunizations>) {
  if (items.length === 0) return <Empty />

  return (
    <Table
      head={
        <>
          <th className={TH}>Vaccine</th>
          <th className={TH}>Administered</th>
          <th className={TH}>Next due</th>
          {visits && <th className={TH}>Visit</th>}
        </>
      }
    >
      {items.map((immunization) => (
        <ImmunizationRow
          key={immunization.id}
          immunization={immunization}
          visits={visits}
          onChanged={onChanged}
          petId={petId}
        />
      ))}
    </Table>
  )
}

function DiagnosticRow({
  diagnostic,
  visits,
  onChanged,
}: {
  diagnostic: Diagnostics[number]
  visits?: VisitDates
  onChanged?: () => void
}) {
  const [isEditing, setIsEditing] = useState(false)

  return (
    <tr>
      <td className={TD}>{diagnostic.type}</td>
      <td className={NOWRAP}>{formatDate(diagnostic.date)}</td>
      <td className={TD}>{diagnostic.result ?? <span className={MUTED}>&mdash;</span>}</td>
      {visits && <VisitCell recordId={diagnostic.medicalRecordId} visits={visits} />}
      <td className={TD_ACTIONS}>
        {onChanged && (
          <RowActions
            name={diagnostic.type}
            onEdit={() => setIsEditing(true)}
            onDelete={() => deleteDiagnostic(diagnostic.id)}
            onDeleted={onChanged}
          />
        )}
        {isEditing && onChanged && (
          <EditDiagnosticModal
            diagnostic={diagnostic}
            onClose={() => setIsEditing(false)}
            onSaved={() => {
              setIsEditing(false)
              onChanged()
            }}
          />
        )}
      </td>
    </tr>
  )
}

export function DiagnosticList({ items, visits, onChanged }: ListProps<Diagnostics>) {
  if (items.length === 0) return <Empty />

  return (
    <Table
      head={
        <>
          <th className={TH}>Type</th>
          <th className={TH}>Date</th>
          <th className={TH}>Result</th>
          {visits && <th className={TH}>Visit</th>}
        </>
      }
    >
      {items.map((diagnostic) => (
        <DiagnosticRow
          key={diagnostic.id}
          diagnostic={diagnostic}
          visits={visits}
          onChanged={onChanged}
        />
      ))}
    </Table>
  )
}

function TreatmentRow({
  treatment,
  visits,
  onChanged,
}: {
  treatment: Treatments[number]
  visits?: VisitDates
  onChanged?: () => void
}) {
  const [isEditing, setIsEditing] = useState(false)

  return (
    <tr>
      <td className={TD}>{treatment.name}</td>
      <td className={NOWRAP}>{formatDate(treatment.date)}</td>
      <td className={TD}>{treatment.notes ?? <span className={MUTED}>&mdash;</span>}</td>
      {visits && <VisitCell recordId={treatment.medicalRecordId} visits={visits} />}
      <td className={TD_ACTIONS}>
        {onChanged && (
          <RowActions
            name={treatment.name}
            onEdit={() => setIsEditing(true)}
            onDelete={() => deleteTreatment(treatment.id)}
            onDeleted={onChanged}
          />
        )}
        {isEditing && onChanged && (
          <EditTreatmentModal
            treatment={treatment}
            onClose={() => setIsEditing(false)}
            onSaved={() => {
              setIsEditing(false)
              onChanged()
            }}
          />
        )}
      </td>
    </tr>
  )
}

export function TreatmentList({ items, visits, onChanged }: ListProps<Treatments>) {
  if (items.length === 0) return <Empty />

  return (
    <Table
      head={
        <>
          <th className={TH}>Name</th>
          <th className={TH}>Date</th>
          <th className={TH}>Notes</th>
          {visits && <th className={TH}>Visit</th>}
        </>
      }
    >
      {items.map((treatment) => (
        <TreatmentRow
          key={treatment.id}
          treatment={treatment}
          visits={visits}
          onChanged={onChanged}
        />
      ))}
    </Table>
  )
}
