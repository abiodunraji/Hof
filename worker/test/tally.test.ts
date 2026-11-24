import { describe, expect, it } from 'vitest';
import { extractTallyId, isTallyId } from '../../src/lib/tally';

describe('extractTallyId: what the panel keeps from whatever the owner pastes', () => {
  it.each([
    ['a bare id', 'vGPYv8', 'vGPYv8'],
    ['a bare id with spaces around it', '  vGPYv8  ', 'vGPYv8'],
    ['the share link', 'https://tally.so/r/vGPYv8', 'vGPYv8'],
    ['the share link with a query string', 'https://tally.so/r/vGPYv8?hideTitle=1&alignLeft=1', 'vGPYv8'],
    ['the share link with a trailing slash', 'https://tally.so/r/vGPYv8/', 'vGPYv8'],
    ['the embed link', 'https://tally.so/embed/vGPYv8', 'vGPYv8'],
    ['the embed link with the four embed parameters', 'https://tally.so/embed/vGPYv8?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1', 'vGPYv8'],
    ['a link with a hash', 'https://tally.so/r/vGPYv8#top', 'vGPYv8'],
    ['a link without https', 'tally.so/r/vGPYv8', 'vGPYv8'],
    ['a link with www', 'https://www.tally.so/r/vGPYv8', 'vGPYv8'],
    ['an upper case host and scheme', 'HTTPS://TALLY.SO/r/vGPYv8', 'vGPYv8'],
    ['an empty box (no form)', '', ''],
    ['only spaces (no form)', '   ', ''],
  ])('%s', (_label, input, expected) => {
    expect(extractTallyId(input)).toBe(expected);
  });

  it.each([
    ['a link on another site', 'https://evil.example/r/vGPYv8'],
    ['a look-alike host', 'https://tally.so.evil.example/r/vGPYv8'],
    ['a link that is not a form', 'https://tally.so/help/embed-your-form'],
    ['a link with no id', 'https://tally.so/r/'],
    ['an id that is too short', 'abc'],
    ['an id that is too long', 'a'.repeat(21)],
    ['text with a space', 'my form'],
    ['a script tag', '<script>alert(1)</script>'],
    ['javascript:', 'javascript:alert(1)'],
  ])('returns null for %s', (_label, input) => {
    expect(extractTallyId(input)).toBeNull();
  });
});

describe('isTallyId', () => {
  it('is the same 4 to 20 letters-or-digits rule the Worker enforces', () => {
    expect(isTallyId('abcd')).toBe(true);
    expect(isTallyId('A1b2C3d4E5f6G7h8I9j0')).toBe(true);
    expect(isTallyId('abc')).toBe(false);
    expect(isTallyId('a'.repeat(21))).toBe(false);
    expect(isTallyId('ab-cd')).toBe(false);
    expect(isTallyId('')).toBe(false);
  });
});
