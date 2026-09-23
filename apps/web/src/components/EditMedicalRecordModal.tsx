import { useEffect, useId, useState, type FormEvent } from 'react'
import { getVetContacts, updateMedicalRecord } from '../api/client'
import type {
  MedicalRecordDetailResponse,
  UpdateMedicalRecordRequest,
  VetContactResponse,
} from '../api/types'
import { parseDateOnly, toDateOnly } from '../dates'
import { DateField } from './DateField'
import { Modal } from './Modal'
import { CTA_BUTTON, STYLES } from '../styles'

type EditMedicalRecordModalProps = {
  record: MedicalRecordDetailResponse
  onClose: () => void
  onSaved: () => void
}

export function EditMedicalRecordModal({ record, onClose, onSaved }: EditMedicalRecordModalProps) {
  const fieldId = useId()

  // Prefilled from the record the page already has, so the form opens filled in
  // rather than fetching the same thing a second time. parseDateOnly keeps the
  // calendar on the stored day instead of the one before it.
  const [recordDate, setRecordDate] = useState<Date | undefined>(
    parseDateOnly(record.recordDate),
  )
  const [vetContactId, setVetContactId] = useState(record.vetContactId ?? '')
  const [vetName, setVetName] = useState(record.vetName ?? '')
  const [notes, setNotes] = useState(record.notes ?? '')

  const [vetContacts, setVetContacts] = useState<VetContactResponse[]>([])
  const [dateError, setDateError] = useState<string | null>(null)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    let isCurrent = true

    getVetContacts(record.petId)
      .then((contacts) => {
        if (isCurrent) setVetContacts(contacts)
      })
      .catch(() => {})

    return () => {
      isCurrent = false
    }
  }, [record.petId])

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!recordDate) {
      setDateError('Record date is required.')
      return
    }

    // null rather than omitted for the cleared fields: omitting a key leaves the
    // stored value alone, which would make a field impossible to empty.
    const changes: UpdateMedicalRecordRequest = {
      recordDate: toDateOnly(recordDate),
      vetName: vetName.trim() || null,
      notes: notes.trim() || null,
    }

    // Only touch the vet link when the dropdown was actually on screen. If the
    // owner has no vets on file it is hidden, and sending null then would quietly
    // unlink a vet the form never offered a way to re-pick.
    if (vetContacts.length > 0) changes.vetContactId = vetContactId || null

    setIsSaving(true)
    setSubmitError(null)

    try {
      await updateMedicalRecord(record.id, changes)
      onSaved()
    } catch (cause) {
      setSubmitError(cause instanceof Error ? cause.message : 'Something went wrong.')
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <Modal onClose={onClose} label="Edit medical record">
      <form className="flex flex-col gap-4" onSubmit={handleSubmit} noValidate>
        <h2 className="m-0 font-heading text-[24px] leading-[118%] font-medium tracking-[-0.24px] text-primary">
          Edit medical record
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
              <option value="">No linked vet</option>
              {vetContacts.map((contact) => (
                <option key={contact.id} value={contact.id}>
                  {contact.firstName} {contact.lastName}
                </option>
              ))}
            </select>
          </div>
        )}

        {
          !vetContacts.length && (
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
          )
        }

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

        {/* The attachments are deliberately absent: PATCH adds nested children
            rather than replacing them, so editing them here would duplicate
            what the record already has. */}
        <p className="text-[0.8rem] opacity-65">
          Medications, immunizations, diagnostics and treatments can’t be edited here yet.
        </p>

        {submitError && <p className="text-danger">Could not save changes: {submitError}</p>}

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
            {isSaving ? 'Saving…' : 'Save changes'}
          </button>
        </div>
      </form>
    </Modal>
  )
}
