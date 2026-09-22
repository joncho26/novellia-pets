import { useState } from 'react'

export type DraftErrors<T> = Partial<Record<keyof T, string>>

// Shared state for the repeatable sub-forms attached to a medical record:
// medications, treatments and the two still to come. Each draft carries a
// client-side `key` that identifies it for React and for its errors, and never
// reaches the API.
export function useDrafts<T extends { key: string }>(createDraft: () => T) {
  const [drafts, setDrafts] = useState<T[]>([])
  const [errors, setErrors] = useState<Record<string, DraftErrors<T>>>({})

  function add() {
    setDrafts((current) => [...current, createDraft()])
  }

  function update(key: string, patch: Partial<T>) {
    setDrafts((current) =>
      current.map((draft) => (draft.key === key ? { ...draft, ...patch } : draft)),
    )
    // Editing a field clears what was wrong with it.
    setErrors((current) => ({ ...current, [key]: {} }))
  }

  function remove(key: string) {
    setDrafts((current) => current.filter((draft) => draft.key !== key))
    setErrors((current) => {
      const next = { ...current }
      delete next[key]
      return next
    })
  }

  // Stores what is wrong and reports whether anything was. Callers must run
  // this for every kind before checking the results, so one invalid draft does
  // not hide the errors in another.
  function validate(validator: (draft: T) => DraftErrors<T>) {
    const next: Record<string, DraftErrors<T>> = {}

    for (const draft of drafts) {
      const draftErrors = validator(draft)
      if (Object.keys(draftErrors).length > 0) next[draft.key] = draftErrors
    }

    setErrors(next)

    return Object.keys(next).length === 0
  }

  return { drafts, errors, add, update, remove, validate }
}
