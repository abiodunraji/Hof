/**
 * A text box people never see. Bots that fill every field fill this one too, and the
 * Worker then drops the message without storing or emailing it.
 */
export const HONEYPOT_NAME = 'website';

export function HoneypotField() {
  return (
    <div
      aria-hidden="true"
      style={{ position: 'absolute', left: '-10000px', top: 'auto', width: 1, height: 1, overflow: 'hidden' }}
    >
      <label>
        Leave this field empty
        <input type="text" name={HONEYPOT_NAME} tabIndex={-1} autoComplete="off" defaultValue="" />
      </label>
    </div>
  );
}

/** Reads the honeypot out of a submitted form. */
export function honeypotValue(form: HTMLFormElement): string {
  const value = new FormData(form).get(HONEYPOT_NAME);
  return typeof value === 'string' ? value : '';
}
