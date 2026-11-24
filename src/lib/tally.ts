/**
 * Tally form ids.
 *
 * The site takes enquiries through the owner's own Tally forms, embedded on the page. A form id is
 * the short code in a Tally link: https://tally.so/r/<id> (the share link) or
 * https://tally.so/embed/<id> (the embed link).
 */

/** 4 to 20 letters or digits: the same rule the Worker enforces. */
const ID = /^[A-Za-z0-9]{4,20}$/;

export function isTallyId(value: string): boolean {
  return ID.test(value);
}

// optional scheme, optional www., then /r/<id> or /embed/<id>, then nothing or a / ? # tail
const LINK = /^(?:https?:\/\/)?(?:www\.)?tally\.so\/(?:r|embed)\/([A-Za-z0-9]{4,20})(?:[/?#].*)?$/i;

/**
 * What to keep from whatever the owner pastes into a form-id box.
 *   ''            an empty box means "no form"
 *   'vGPYv8'      a bare id is kept as it is
 *   a Tally link  only the id is kept (any query string or hash is dropped)
 *   null          anything else: not an id and not a Tally link
 */
export function extractTallyId(input: string): string | null {
  const text = input.trim();
  if (text === '') return '';
  if (ID.test(text)) return text;
  const match = LINK.exec(text);
  return match ? match[1] : null;
}
