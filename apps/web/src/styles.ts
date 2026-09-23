// The call-to-action button skin, in one place so every CTA in the app picks
// up the same fill, hover and disabled treatment.
export const CTA_BUTTON =
  'cursor-pointer rounded-[0.4rem] border border-primary bg-primary px-4 py-2 text-[0.95rem] text-on-primary transition-colors duration-200 hover:border-primary-hover hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-60'

// Button parts, composed below. Padding is kept out of the skins because an
// icon-only button needs a square box: appending `p-2` to a class list that
// already says `px-4` would be resolved by stylesheet order rather than by the
// order written here, which is not something to leave to chance.
const BUTTON_BASE =
  'cursor-pointer rounded-[0.4rem] border text-[0.95rem] transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-60'
// Neutral: a way out, not a call to action.
const SECONDARY_SKIN = 'border-line text-heading hover:border-accent-line'
// Destructive. Outlined rather than filled, so it is findable without
// competing with the page's call to action.
const DANGER_SKIN = 'border-line text-danger hover:border-danger hover:bg-danger/10'
const LABELLED_PADDING = 'px-4 py-2'
const ICON_ONLY_PADDING = 'inline-flex items-center justify-center p-2'

// Every control in every form wears the same skin. Shared across modals so a
// change to the field treatment is one edit rather than one per form.
export const STYLES = {
  CONTROL:
    'box-border w-full rounded-[0.4rem] border border-line bg-page px-[0.6rem] py-2 text-[0.95rem] text-heading focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-accent aria-[invalid=true]:border-danger',
  LABEL: 'text-[0.8rem] uppercase tracking-[0.04em] opacity-65',
  FIELD: 'flex flex-col gap-[0.35rem]',

  SECONDARY_BUTTON: `${BUTTON_BASE} ${SECONDARY_SKIN} ${LABELLED_PADDING}`,
  DANGER_BUTTON: `${BUTTON_BASE} ${DANGER_SKIN} ${LABELLED_PADDING}`,

  // Icon-only variants. Every use needs an aria-label, since the glyph carries
  // the whole meaning and an icon has no accessible name of its own.
  SECONDARY_ICON_BUTTON: `${BUTTON_BASE} ${SECONDARY_SKIN} ${ICON_ONLY_PADDING}`,
  DANGER_ICON_BUTTON: `${BUTTON_BASE} ${DANGER_SKIN} ${ICON_ONLY_PADDING}`,
}
