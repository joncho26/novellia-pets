import { useEffect, useState } from 'react'
import { ArrowLeft, ClipboardList, Pencil, Pill, Stethoscope, Syringe, Trash2 } from 'lucide-react'
import { Link, Navigate, useNavigate, useParams } from 'react-router'
import { deleteMedicalRecord, getMedicalRecord } from '../api/client'
import type { MedicalRecordDetailResponse } from '../api/types'
import { formatDateOnly as formatDate } from '../dates'
import { PET_TYPE_ICON } from '../petLabels'
import { SectionHeading } from '../components/SectionHeading'
import { EditMedicalRecordModal } from '../components/modals/EditMedicalRecordModal'
import { ConfirmDialog } from '../components/modals/ConfirmDialog'
import { AddAttachmentModal, type AttachmentKind } from '../components/modals/AddAttachmentModal'
import { STYLES } from '../styles'
import {
  DiagnosticList,
  ImmunizationList,
  MedicationList,
  TreatmentList,
} from '../components/RecordLists'

function RecordView({
  record,
  onChanged,
}: {
  record: MedicalRecordDetailResponse
  onChanged: () => void
}) {
  const TypeIcon = PET_TYPE_ICON[record.pet.type]
  const navigate = useNavigate()
  const [isEditing, setIsEditing] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  // Which kind of attachment is being added, if any. One slot rather than four
  // booleans: only one of these forms can be open at a time.
  const [adding, setAdding] = useState<AttachmentKind | null>(null)
  const [isDeletePending, setIsDeletePending] = useState(false)
  const [deleteError, setDeleteError] = useState<string | null>(null)

  const attachmentCount =
    record.medications.length +
    record.treatments.length +
    record.diagnostics.length +
    record.immunizations.length

  async function handleDelete() {
    setIsDeletePending(true)
    setDeleteError(null)

    try {
      await deleteMedicalRecord(record.id)

      // This page's subject is gone, so staying here would just 404 on the
      // next load. `replace` keeps the deleted record out of the history.
      await navigate(`/pets/${record.pet.id}`, { replace: true })
    } catch (cause) {
      setDeleteError(cause instanceof Error ? cause.message : 'Something went wrong.')
      setIsDeletePending(false)
    }
  }

  // Either source of the vet's name will do; the linked contact is the more
  // trustworthy of the two, so it wins when both are present.
  const vet = record.vet ? `${record.vet.firstName} ${record.vet.lastName}` : record.vetName

  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="m-0 font-heading text-[1.75rem] leading-[118%] font-medium tracking-[-0.24px] text-primary">
          Visit on {formatDate(record.recordDate)}
        </h1>

        {/* The icons are aria-hidden and the button carries the name, so the
            label is announced once rather than fought over by both. `title`
            covers the sighted mouse user, who otherwise has to guess. */}
        <div className="flex gap-2">
          <button
            type="button"
            className={STYLES.SECONDARY_ICON_BUTTON}
            aria-label={`Edit visit on ${formatDate(record.recordDate)}`}
            title="Edit this record"
            onClick={() => setIsEditing(true)}
          >
            <Pencil size={16} aria-hidden="true" />
          </button>
          <button
            type="button"
            className={STYLES.DANGER_ICON_BUTTON}
            aria-label={`Delete visit on ${formatDate(record.recordDate)}`}
            title="Delete this record"
            onClick={() => setIsDeleting(true)}
          >
            <Trash2 size={16} aria-hidden="true" />
          </button>
        </div>
      </div>

      <p className="mt-2 flex items-center gap-2 text-[0.95rem]">
        <TypeIcon size={18} aria-hidden="true" className="shrink-0 text-secondary" />
        <Link to={`/pets/${record.pet.id}`} className="text-body underline">
          {record.pet.name}
        </Link>
        {vet && <span className="opacity-70">&middot; seen by {vet}</span>}
      </p>

      {record.notes && <p className="mt-4 text-[0.95rem]">{record.notes}</p>}

      <section>
        <SectionHeading
          icon={Pill}
          level={2}
          action={{ label: 'Add a medication', onClick: () => setAdding('medication') }}
        >
          Medications from this visit
        </SectionHeading>
        <MedicationList items={record.medications} onChanged={onChanged} />
      </section>

      <section>
        <SectionHeading
          icon={Syringe}
          level={2}
          action={{ label: 'Add an immunization', onClick: () => setAdding('immunization') }}
        >
          Immunizations from this visit
        </SectionHeading>
        <ImmunizationList items={record.immunizations} petId={record.petId} onChanged={onChanged} />
      </section>

      <section>
        <SectionHeading
          icon={Stethoscope}
          level={2}
          action={{ label: 'Add a diagnostic', onClick: () => setAdding('diagnostic') }}
        >
          Diagnostics from this visit
        </SectionHeading>
        <DiagnosticList items={record.diagnostics} onChanged={onChanged} />
      </section>

      <section>
        <SectionHeading
          icon={ClipboardList}
          level={2}
          action={{ label: 'Add a treatment', onClick: () => setAdding('treatment') }}
        >
          Treatments from this visit
        </SectionHeading>
        <TreatmentList items={record.treatments} onChanged={onChanged} />
      </section>

      {isEditing && (
        <EditMedicalRecordModal
          record={record}
          onClose={() => setIsEditing(false)}
          onSaved={() => {
            setIsEditing(false)
            onChanged()
          }}
        />
      )}

      {/* The form creates one row against its own endpoint, carrying this
          record's id so the new entry is filed under this visit. */}
      {adding && (
        <AddAttachmentModal
          kind={adding}
          petId={record.petId}
          medicalRecordId={record.id}
          onClose={() => setAdding(null)}
          onCreated={() => {
            setAdding(null)
            onChanged()
          }}
        />
      )}

      {isDeleting && (
        <ConfirmDialog
          title="Delete this record?"
          confirmLabel="Delete record"
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
            The visit on <strong>{formatDate(record.recordDate)}</strong> will be permanently
            removed. This can’t be undone.
          </p>
          {/* Saying what survives matters more than a generic warning: the
              children are unlinked, not deleted, which is easy to assume
              wrongly in either direction. */}
          {attachmentCount > 0 && (
            <p className="m-0 mt-2 opacity-70">
              Its {attachmentCount} attached{' '}
              {attachmentCount === 1 ? 'entry' : 'entries'} will be kept on {record.pet.name}
              ’s record, no longer grouped under this visit.
            </p>
          )}
        </ConfirmDialog>
      )}
    </>
  )
}

function RecordLoader({ medicalRecordId }: { medicalRecordId: string }) {
  const [record, setRecord] = useState<MedicalRecordDetailResponse | null>(null)
  const [error, setError] = useState<string | null>(null)
  // Bumped after a write, to pull the record back down fresh.
  const [reloadToken, setReloadToken] = useState(0)

  useEffect(() => {
    let isCurrent = true

    getMedicalRecord(medicalRecordId)
      .then((result) => {
        // The route can change before this lands.
        if (isCurrent) setRecord(result)
      })
      .catch((cause: Error) => {
        if (isCurrent) setError(cause.message)
      })

    return () => {
      isCurrent = false
    }
  }, [medicalRecordId, reloadToken])

  // The way back is the pet whose visit this is — but which pet that is only
  // becomes known once the record loads, so until then it falls back to the
  // dashboard rather than offering a dead link.
  const backTo = record ? `/pets/${record.pet.id}` : '/'
  const backLabel = record ? `Back to ${record.pet.name}` : 'Back to dashboard'

  return (
    <div className="mx-auto w-full max-w-4xl">
      <Link
        to={backTo}
        className="mb-6 inline-flex items-center gap-1.5 text-[0.9rem] text-body no-underline hover:text-primary"
      >
        <ArrowLeft size={16} aria-hidden="true" />
        {backLabel}
      </Link>

      {error ? (
        <p className="text-danger">Could not load record: {error}</p>
      ) : record ? (
        <RecordView record={record} onChanged={() => setReloadToken((token) => token + 1)} />
      ) : (
        <p>Loading…</p>
      )}
    </div>
  )
}

export function MedicalRecordDetail() {
  const { medicalRecordId } = useParams<{ medicalRecordId: string }>()

  // The route pattern guarantees an id; this is for the type, not the user.
  if (!medicalRecordId) return <Navigate to="/" replace />

  // The back link lives inside the loader, since where "back" goes depends on
  // which pet the record turns out to belong to.
  return <RecordLoader key={medicalRecordId} medicalRecordId={medicalRecordId} />
}
