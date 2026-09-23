import { useEffect, useId, useState, type FormEvent } from 'react'
import { Plus } from 'lucide-react'
import { DiagnosticType, DosageUnit, MedicationStatus } from '@api/generated/prisma/enums'
import { createMedicalRecord, getVaccinesForPet, getVetContacts } from '../api/client'
import type { CreateMedicalRecordRequest, VaccineResponse, VetContactResponse } from '../api/types'
import { DateField } from './DateField'
import { Modal } from './Modal'
import { MedicationDraftFields } from './MedicationDraftFields'
import { TreatmentDraftFields } from './TreatmentDraftFields'
import { DiagnosticDraftFields } from './DiagnosticDraftFields'
import { ImmunizationDraftFields } from './ImmunizationDraftFields'
import { emptyMedicationDraft, validateMedicationDraft } from '../medicationDraft'
import { emptyTreatmentDraft, validateTreatmentDraft } from '../treatmentDraft'
import { emptyDiagnosticDraft, validateDiagnosticDraft } from '../diagnosticDraft'
import { emptyImmunizationDraft, validateImmunizationDraft } from '../immunizationDraft'
import { useDrafts } from '../useDrafts'
import { toDateOnly } from '../dates'
import { CTA_BUTTON, STYLES } from '../styles'

const ATTACH_BUTTON =
  'inline-flex cursor-pointer items-center gap-1 rounded-[0.4rem] border border-line px-3 py-1.5 text-[0.8rem] font-semibold tracking-[0.04em] uppercase transition-colors duration-200 hover:border-accent-line hover:bg-accent-soft disabled:cursor-not-allowed disabled:opacity-40'

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
  const diagnostics = useDrafts(emptyDiagnosticDraft)
  const immunizations = useDrafts(emptyImmunizationDraft)

  const [vetContacts, setVetContacts] = useState<VetContactResponse[]>([])
  const [vaccines, setVaccines] = useState<VaccineResponse[]>([])
  const [dateError, setDateError] = useState<string | null>(null)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [isSaving, setIsSaving] = useState(false)

  // Neither failure is surfaced as an error over the form. Losing the vet list
  // only costs the convenience of a dropdown, and losing the vaccine catalog
  // disables the one button that needs it — see below.
  useEffect(() => {
    let isCurrent = true

    getVetContacts(petId)
      .then((contacts) => {
        if (isCurrent) setVetContacts(contacts)
      })
      .catch(() => {})

    getVaccinesForPet(petId)
      .then((catalog) => {
        if (isCurrent) setVaccines(catalog)
      })
      .catch(() => {})

    return () => {
      isCurrent = false
    }
  }, [petId])

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    // Every validator runs before the check, so errors in one kind of
    // attachment are not hidden by errors in another.
    const medicationsValid = medications.validate(validateMedicationDraft)
    const treatmentsValid = treatments.validate(validateTreatmentDraft)
    const diagnosticsValid = diagnostics.validate(validateDiagnosticDraft)
    const immunizationsValid = immunizations.validate(validateImmunizationDraft)

    if (!recordDate) setDateError('Record date is required.')
    if (
      !recordDate ||
      !medicationsValid ||
      !treatmentsValid ||
      !diagnosticsValid ||
      !immunizationsValid
    ) {
      return
    }

    const record: CreateMedicalRecordRequest = {
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

    if (diagnostics.drafts.length > 0) {
      record.diagnostics = diagnostics.drafts.map((draft) => ({
        type: draft.type as DiagnosticType,
        date: toDateOnly(draft.date as Date),
        result: draft.result.trim() || null,
        notes: draft.notes.trim() || null,
      }))
    }

    if (immunizations.drafts.length > 0) {
      record.immunizations = immunizations.drafts.map((draft) => ({
        vaccineId: draft.vaccineId,
        dateAdministered: toDateOnly(draft.dateAdministered as Date),
        nextDueDate: draft.nextDueDate ? toDateOnly(draft.nextDueDate) : null,
      }))
    }

    setIsSaving(true)
    setSubmitError(null)

    try {
      await createMedicalRecord(petId, record)
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

          {diagnostics.drafts.map((draft, index) => (
            <DiagnosticDraftFields
              key={draft.key}
              draft={draft}
              index={index}
              errors={diagnostics.errors[draft.key] ?? {}}
              fieldId={fieldId}
              onChange={(patch) => diagnostics.update(draft.key, patch)}
              onRemove={() => diagnostics.remove(draft.key)}
            />
          ))}

          {immunizations.drafts.map((draft, index) => (
            <ImmunizationDraftFields
              key={draft.key}
              draft={draft}
              index={index}
              errors={immunizations.errors[draft.key] ?? {}}
              fieldId={fieldId}
              vaccines={vaccines}
              onChange={(patch) => immunizations.update(draft.key, patch)}
              onRemove={() => immunizations.remove(draft.key)}
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
            <button type="button" className={ATTACH_BUTTON} onClick={diagnostics.add}>
              <Plus size={12} aria-hidden="true" />
              Diagnostic
            </button>
            {/* An immunization is a reference to a vaccine, so without the
                catalog there is nothing valid to submit. */}
            <button
              type="button"
              className={ATTACH_BUTTON}
              onClick={immunizations.add}
              disabled={vaccines.length === 0}
            >
              <Plus size={12} aria-hidden="true" />
              Immunization
            </button>
          </div>

          {vaccines.length === 0 && (
            <p className="text-[0.8rem] opacity-65">
              The vaccine list is unavailable, so immunizations can’t be added right now.
            </p>
          )}
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
