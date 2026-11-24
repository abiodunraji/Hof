import { Fragment } from 'react';

/** "09039330335 / 07040654539" -> ["09039330335", "07040654539"] */
export function phoneNumbers(phone: string): string[] {
  const parts = phone.split('/').map((p) => p.trim()).filter(Boolean);
  return parts.length > 0 ? parts : [phone.trim()];
}

/** One entry per line of a multi-line address. */
export function addressLines(address: string): string[] {
  const lines = address.split(/\r?\n/).map((l) => l.trim()).filter(Boolean);
  return lines.length > 0 ? lines : [address.trim()];
}

/** "A\nB\nC" -> "A, B, C" (the footer shows the address on one line). */
export function addressOneLine(address: string): string {
  return addressLines(address).join(', ');
}

/** The address with a line break between its lines. */
export function AddressBreaks({ address }: { address: string }) {
  const lines = addressLines(address);
  return (
    <>
      {lines.map((line, i) => (
        <Fragment key={i}>
          {line}
          {i < lines.length - 1 ? <br /> : null}
        </Fragment>
      ))}
    </>
  );
}
