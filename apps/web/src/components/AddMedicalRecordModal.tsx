import { useEffect, useId, useState, type FormEvent } from 'react'
import { Plus } from 'lucide-react'
import { DosageUnit, MedicationStatus } from '@api/generated/prisma/enums'
import { createMedicalRecord, getVetContacts } from '../api/client'
import type { CreateMedicalRecordRequest, VetContactResponse } from '../api/types'
import { DateField } from './DateField'
import { Modal } from './Modal'
import { MedicationDraftFields } from './MedicationDraftFields'
import { TreatmentDraftFields } from './TreatmentDraftFields'
import { emptyMedicationDraft, validateMedicationDraft } from '../medicationDraft'
import { emptyTreatmentDraft, validateTreatmentDraft } from '../treatmentDraft'
import { useDrafts } from '../useDrafts'
import { CTA_BUTTON, STYLES } from '../styles'

const ATTACH_BUTTON =
  'inline-flex cursor-pointer items-center gap-1 rounded-[0.4rem] border border-line px-3 py-1.5 text-[0.8rem] font-semibold tracking-[0.04em] uppercase transition-colors duration-200 hover:border-accent-line hover:bg-accent-soft disabled:cursor-not-allowed disabled:opacity-40'

// The Date is local, so toISOString() would shift it across a day boundary for
// anyone west of UTC. Format from the local parts instead.
function toDateOnly(date: Date) {
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')

  return `${date.getFullYear()}-${month}-${day}`
}

type AddMedicalRecordModalProps = {
  petId: string
  onClose: () => void
  onCreated: () => void
}

export function AddMedicalRecordModal({ petId, onClose, onCreated }: AddMedicalRecordModalProps) {
  const fieldId = useId()
  const [recordDate, setRecordDate] = useState<Date | undefined>(undefined)
  const [vetContactId, setVetContactId] = useState('')
  const [vetName, setVetName] = useState('')
  const [notes, setNotes] = useState('')

  // Attachments typed into the form live here until the record is submitted.
  // Nothing reaches the database until then.
  const medications = useDrafts(emptyMedicationDraft)
  const treatments = useDrafts(emptyTreatmentDraft)

  const [vetContacts, setVetContacts] = useState<VetContactResponse[]>([])
  const [dateError, setDateError] = useState<string | null>(null)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [isSaving, setIsSaving] = useState(false)

  // A failure here only costs the convenience of the dropdown, so it is not
  // surfaced as an error: the record can still be filed with a typed vet name.
  useEffect(() => {
    let isCurrent = true

    getVetContacts(petId)
      .then((contacts) => {
        if (isCurrent) setVetContacts(contacts)
      })
      .catch(() => {})

    return () => {
      isCurrent = false
    }
  }, [petId])

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    // Both validators run before the check, so errors in a treatment are not
    // hidden by errors in a medication.
    const medicationsValid = medications.validate(validateMedicationDraft)
    const treatmentsValid = treatments.validate(validateTreatmentDraft)

    if (!recordDate) setDateError('Record date is required.')
    if (!recordDate || !medicationsValid || !treatmentsValid) return

    const record: CreateMedicalRecordRequest = {
      petId,
      recordDate: toDateOnly(recordDate),
    }

    // The DTO rejects an empty string on the optional fields, so anything the
    // user left blank is omitted rather than sent as ''.
    if (vetContactId) record.vetContactId = vetContactId
    if (vetName.trim()) record.vetName = vetName.trim()
    if (notes.trim()) record.notes = notes.trim()

    // The record and its children go in one request, which the API writes in a
    // single transaction — so a failure leaves nothing behind to clean up.
    if (medications.drafts.length > 0) {
      record.medications = medications.drafts.map((draft) => ({
        name: draft.name.trim(),
        dosageAmount: Number(draft.dosageAmount),
        dosageUnit: draft.dosageUnit as DosageUnit,
        frequency: draft.frequency.trim(),
        startDate: toDateOnly(draft.startDate as Date),
        endDate: draft.endDate ? toDateOnly(draft.endDate) : null,
        status: draft.status as MedicationStatus,
      }))
    }

    if (treatments.drafts.length > 0) {
      record.treatments = treatments.drafts.map((draft) => ({
        name: draft.name.trim(),
        date: toDateOnly(draft.date as Date),
        notes: draft.notes.trim() || null,
      }))
    }

    setIsSaving(true)
    setSubmitError(null)

    try {
      await createMedicalRecord(record)
      onCreated()
    } catch (cause) {
      setSubmitError(cause instanceof Error ? cause.message : 'Something went wrong.')
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <Modal onClose={onClose} label="Add a medical record">
      <form className="flex flex-col gap-4" onSubmit={handleSubmit} noValidate>
        <h2 className="m-0 font-heading text-[24px] leading-[118%] font-medium tracking-[-0.24px] text-primary">
          Add a medical record
        </h2>

        <div className={STYLES.FIELD}>
          <label className={STYLES.LABEL} htmlFor={`${fieldId}-date`}>
            Record date
          </label>
          <DateField
            id={`${fieldId}-date`}
            className={STYLES.CONTROL}
            value={recordDate}
            onChange={(value) => {
              setRecordDate(value)
              setDateError(null)
            }}
            invalid={Boolean(dateError)}
            describedBy={dateError ? `${fieldId}-date-error` : undefined}
          />
          {dateError && (
            <p className="text-[0.8rem] text-danger" id={`${fieldId}-date-error`}>
              {dateError}
            </p>
          )}
        </div>

        {/* Hidden entirely when the owner has no vets on file: an empty
            dropdown is a dead end, and vetName already covers that case. */}
        {vetContacts.length > 0 && (
          <div className={STYLES.FIELD}>
            <label className={STYLES.LABEL} htmlFor={`${fieldId}-vet-contact`}>
              Vet
            </label>
            <select
              id={`${fieldId}-vet-contact`}
              className={STYLES.CONTROL}
              value={vetContactId}
              onChange={(event) => setVetContactId(event.target.value)}
            >
              <option value="">Select a vet</option>
              {vetContacts.map((contact) => (
                <option key={contact.id} value={contact.id}>
                  {contact.firstName} {contact.lastName}
                </option>
              ))}
            </select>
          </div>
        )}

        <div className={STYLES.FIELD}>
          <label className={STYLES.LABEL} htmlFor={`${fieldId}-vet-name`}>
            Vet name
          </label>
          <input
            id={`${fieldId}-vet-name`}
            className={STYLES.CONTROL}
            value={vetName}
            onChange={(event) => setVetName(event.target.value)}
          />
        </div>

        <div className={STYLES.FIELD}>
          <label className={STYLES.LABEL} htmlFor={`${fieldId}-notes`}>
            Notes
          </label>
          <textarea
            id={`${fieldId}-notes`}
            className={`${STYLES.CONTROL} min-h-24 resize-y`}
            value={notes}
            onChange={(event) => setNotes(event.target.value)}
          />
        </div>

        <div className="flex flex-col gap-3 border-t border-line pt-4">
          <p className={STYLES.LABEL}>Attach to this record</p>

          {medications.drafts.map((draft, index) => (
            <MedicationDraftFields
              key={draft.key}
              draft={draft}
              index={index}
              errors={medications.errors[draft.key] ?? {}}
              fieldId={fieldId}
              onChange={(patch) => medications.update(draft.key, patch)}
              onRemove={() => medications.remove(draft.key)}
            />
          ))}

          {treatments.drafts.map((draft, index) => (
            <TreatmentDraftFields
              key={draft.key}
              draft={draft}
              index={index}
              errors={treatments.errors[draft.key] ?? {}}
              fieldId={fieldId}
              onChange={(patch) => treatments.update(draft.key, patch)}
              onRemove={() => treatments.remove(draft.key)}
            />
          ))}

          <div className="flex flex-wrap gap-2">
            <button type="button" className={ATTACH_BUTTON} onClick={medications.add}>
              <Plus size={12} aria-hidden="true" />
              Medication
            </button>
            <button type="button" className={ATTACH_BUTTON} onClick={treatments.add}>
              <Plus size={12} aria-hidden="true" />
              Treatment
            </button>
            {/* The remaining two follow the same pattern; not wired yet. */}
            <button type="button" className={ATTACH_BUTTON} disabled>
              <Plus size={12} aria-hidden="true" />
              Diagnostic
            </button>
            <button type="button" className={ATTACH_BUTTON} disabled>
              <Plus size={12} aria-hidden="true" />
              Immunization
            </button>
          </div>
        </div>

        {submitError && <p className="text-danger">Could not add record: {submitError}</p>}

        <div className="mt-2 flex justify-end gap-2">
          <button
            type="button"
            className={STYLES.SECONDARY_BUTTON}
            onClick={onClose}
            disabled={isSaving}
          >
            Cancel
          </button>
          <button type="submit" className={CTA_BUTTON} disabled={isSaving}>
            {isSaving ? 'Adding…' : 'Add record'}
          </button>
        </div>
      </form>
    </Modal>
  )
}
