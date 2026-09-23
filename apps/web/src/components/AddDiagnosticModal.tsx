import { useId, useState, type FormEvent } from 'react'
import type { DiagnosticType } from '@api/generated/prisma/enums'
import { createDiagnostic } from '../api/client'
import { toDateOnly } from '../dates'
import {
  emptyDiagnosticDraft,
  validateDiagnosticDraft,
  type DiagnosticDraftErrors,
} from '../diagnosticDraft'
import { AttachmentModalShell } from './AttachmentModalShell'
import { DiagnosticDraftFields } from './DiagnosticDraftFields'

type AddDiagnosticModalProps = {
  petId: string
  medicalRecordId?: string | null
  onClose: () => void
  onCreated: () => void
}

export function AddDiagnosticModal({
  petId,
  medicalRecordId,
  onClose,
  onCreated,
}: AddDiagnosticModalProps) {
  const fieldId = useId()
  const [draft, setDraft] = useState(emptyDiagnosticDraft)
  const [errors, setErrors] = useState<DiagnosticDraftErrors>({})
  const [error, setError] = useState<string | null>(null)
  const [isSaving, setIsSaving] = useState(false)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const nextErrors = validateDiagnosticDraft(draft)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    setIsSaving(true)
    setError(null)

    try {
      await createDiagnostic(petId, {
        type: draft.type as DiagnosticType,
        date: toDateOnly(draft.date as Date),
        result: draft.result.trim() || null,
        notes: draft.notes.trim() || null,
        medicalRecordId: medicalRecordId ?? null,
      })
      onCreated()
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'Something went wrong.')
      setIsSaving(false)
    }
  }

  return (
    <AttachmentModalShell
      title="Add a diagnostic"
      submitLabel="Add diagnostic"
      isSaving={isSaving}
      error={error}
      onSubmit={handleSubmit}
      onClose={onClose}
    >
      <DiagnosticDraftFields
        draft={draft}
        index={0}
        errors={errors}
        fieldId={fieldId}
        onChange={(patch) => {
          setDraft((current) => ({ ...current, ...patch }))
          setErrors({})
        }}
      />
    </AttachmentModalShell>
  )
}
