import { AddDiagnosticModal } from './AddDiagnosticModal'
import { AddImmunizationModal } from './AddImmunizationModal'
import { AddMedicationModal } from './AddMedicationModal'
import { AddTreatmentModal } from './AddTreatmentModal'

export type AttachmentKind = 'medication' | 'immunization' | 'diagnostic' | 'treatment'

type AddAttachmentModalProps = {
  kind: AttachmentKind
  petId: string
  // The record to file the new entry under. Omitted on the pet page, where
  // entries are recorded outside any visit.
  medicalRecordId?: string | null
  onClose: () => void
  onCreated: () => void
}

// Picks the right form for the kind being added. Both the pet page and the
// medical record page open these, differing only in whether they name a visit.
export function AddAttachmentModal({ kind, ...props }: AddAttachmentModalProps) {
  switch (kind) {
    case 'medication':
      return <AddMedicationModal {...props} />
    case 'immunization':
      return <AddImmunizationModal {...props} />
    case 'diagnostic':
      return <AddDiagnosticModal {...props} />
    case 'treatment':
      return <AddTreatmentModal {...props} />
  }
}
