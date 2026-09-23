import { useId, useState, type FormEvent } from 'react'
import type { DiagnosticType } from '@api/generated/prisma/enums'
import { updateDiagnostic } from '../../api/client'
import type { PetDetailResponse } from '../../api/types'
import { toDateOnly } from '../../dates'
import {
  diagnosticDraftFrom,
  validateDiagnosticDraft,
  type DiagnosticDraftErrors,
} from '../fields/diagnosticDraft'
import { AttachmentModalShell } from './AttachmentModalShell'
import { DiagnosticDraftFields } from '../fields/DiagnosticDraftFields'

type EditDiagnosticModalProps = {
  diagnostic: PetDetailResponse['diagnostics'][number]
  onClose: () => void
  onSaved: () => void
}

export function EditDiagnosticModal({ diagnostic, onClose, onSaved }: EditDiagnosticModalProps) {
  const fieldId = useId()
  const [draft, setDraft] = useState(() => diagnosticDraftFrom(diagnostic))
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
      await updateDiagnostic(diagnostic.id, {
        type: draft.type as DiagnosticType,
        date: toDateOnly(draft.date as Date),
        result: draft.result.trim() || null,
        notes: draft.notes.trim() || null,
      })
      onSaved()
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'Something went wrong.')
      setIsSaving(false)
    }
  }

  return (
    <AttachmentModalShell
      title="Edit diagnostic"
      submitLabel="Save changes"
      busyLabel="Saving…"
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
