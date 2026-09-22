// The call-to-action button skin, in one place so every CTA in the app picks
// up the same fill, hover and disabled treatment.
export const CTA_BUTTON =
  'cursor-pointer rounded-[0.4rem] border border-primary bg-primary px-4 py-2 text-[0.95rem] text-on-primary transition-colors duration-200 hover:border-primary-hover hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-60'

// Every control in every form wears the same skin. Shared across modals so a
// change to the field treatment is one edit rather than one per form.
export const STYLES = {
  CONTROL:
    'box-border w-full rounded-[0.4rem] border border-line bg-page px-[0.6rem] py-2 text-[0.95rem] text-heading focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-accent aria-[invalid=true]:border-danger',
  LABEL: 'text-[0.8rem] uppercase tracking-[0.04em] opacity-65',
  FIELD: 'flex flex-col gap-[0.35rem]',
  // Cancel is a way out, not a call to action, so it stays neutral — no fill
  // and no hover transition.
  SECONDARY_BUTTON:
    'cursor-pointer rounded-[0.4rem] border border-line px-4 py-2 text-[0.95rem] text-heading disabled:cursor-not-allowed disabled:opacity-60',
}
