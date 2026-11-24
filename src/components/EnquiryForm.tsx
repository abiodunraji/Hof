/**
 * The site's enquiry forms are the owner's own Tally forms, embedded in the page. Nothing a
 * visitor types is handled by this site or by the Worker: it goes straight to Tally.
 *
 * Built from Tally's documented embed (developers.tally.so/widgets/embeds and /widgets/examples/react):
 *   - the iframe carries the embed link in `data-tally-src`, not `src`, plus the four documented
 *     URL options (alignLeft, hideTitle, transparentBackground, dynamicHeight);
 *   - Tally's script https://tally.so/widgets/embed.js is added to the page once, and
 *     `Tally.loadEmbeds()` runs after every mount (a single-page app must call it each time);
 *   - if the script cannot load (blocked, offline) the iframe's `src` is set from
 *     `data-tally-src` by hand, at a fixed height, as the docs' fallback does.
 *
 * Because the markup has no `src`, the prerendered HTML and the first client render are identical
 * (no hydration mismatch) and nothing from tally.so is requested until the page is mounted.
 */
import { useEffect, useRef, useState } from 'react';
import { Mail, Phone } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { useSiteConfig } from '../hooks/useSiteConfig';
import { phoneNumbers } from '../lib/format';

const WIDGET_SRC = 'https://tally.so/widgets/embed.js';
const EMBED_OPTIONS = 'alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1';

/** Starting height; with dynamicHeight=1 Tally's script resizes the iframe to the form. */
const MIN_HEIGHT = 700;
/** Used only when Tally's script is blocked and cannot resize the frame: tall, scrolls inside. */
export const FALLBACK_HEIGHT = 1100;

interface TallyGlobal {
  loadEmbeds: () => void;
}
declare global {
  interface Window {
    Tally?: TallyGlobal;
  }
}

type WidgetState = 'ready' | 'failed';
let widgetLoad: Promise<WidgetState> | null = null;

/** Adds Tally's script once per page. Resolves 'ready' when window.Tally exists, 'failed' if it cannot load. */
function loadTallyWidget(): Promise<WidgetState> {
  if (window.Tally) return Promise.resolve('ready');
  if (widgetLoad) return widgetLoad;
  widgetLoad = new Promise<WidgetState>((resolve) => {
    const existing = document.querySelector<HTMLScriptElement>(`script[src="${WIDGET_SRC}"]`);
    const script = existing ?? document.createElement('script');
    script.addEventListener('load', () => resolve(window.Tally ? 'ready' : 'failed'));
    script.addEventListener('error', () => resolve('failed'));
    if (!existing) {
      script.src = WIDGET_SRC;
      document.body.appendChild(script);
    }
  });
  return widgetLoad;
}

export function TallyEmbed({ formId, title }: { formId: string; title: string }) {
  const frame = useRef<HTMLIFrameElement>(null);
  const [fixedHeight, setFixedHeight] = useState(false);

  useEffect(() => {
    let cancelled = false;
    void loadTallyWidget().then((state) => {
      const el = frame.current;
      if (cancelled || !el) return;
      if (state === 'ready' && window.Tally) {
        window.Tally.loadEmbeds();
      } else {
        // Fallback from the docs: no script, so give the iframe its address ourselves.
        if (!el.getAttribute('src') && el.dataset.tallySrc) el.src = el.dataset.tallySrc;
        setFixedHeight(true);
      }
    });
    return () => {
      cancelled = true;
    };
  }, [formId]);

  return (
    // key: a different form id is a new iframe, so Tally never reuses a frame that already has a src
    <iframe
      key={formId}
      ref={frame}
      data-tally-src={`https://tally.so/embed/${formId}?${EMBED_OPTIONS}`}
      loading="lazy"
      width="100%"
      height={fixedHeight ? FALLBACK_HEIGHT : MIN_HEIGHT}
      style={{ minHeight: MIN_HEIGHT, border: 0, display: 'block' }}
      frameBorder={0}
      marginHeight={0}
      marginWidth={0}
      title={title}
    />
  );
}

/** Shown wherever there is no form: the phone numbers and the email, as links. */
export function CallOrEmailCard({ heading, intro }: { heading: string; intro?: string }) {
  const config = useSiteConfig();
  const phones = phoneNumbers(config.contactPhone);
  return (
    <Card>
      <CardContent className="p-6 sm:p-8">
        <h3 className="text-2xl mb-2">{heading}</h3>
        {intro && <p className="text-muted-foreground mb-6">{intro}</p>}
        <ul className="space-y-4">
          {phones.map((phone) => (
            <li key={phone} className="flex items-center gap-3">
              <Phone className="w-5 h-5 flex-shrink-0" aria-hidden="true" />
              <a href={`tel:${phone.replace(/[^\d+]/g, '')}`} className="text-lg underline-offset-4 hover:underline">
                {phone}
              </a>
            </li>
          ))}
          <li className="flex items-center gap-3">
            <Mail className="w-5 h-5 flex-shrink-0" aria-hidden="true" />
            <a href={`mailto:${config.contactEmail}`} className="text-lg break-all underline-offset-4 hover:underline">
              {config.contactEmail}
            </a>
          </li>
        </ul>
      </CardContent>
    </Card>
  );
}

/** The form for one brand: the Tally embed if a form id is set, otherwise the call-or-email card. */
export function EnquiryForm({
  formId,
  formTitle,
  noFormHeading,
  noFormIntro,
}: {
  formId: string;
  formTitle: string;
  noFormHeading: string;
  noFormIntro?: string;
}) {
  return formId ? <TallyEmbed formId={formId} title={formTitle} /> : <CallOrEmailCard heading={noFormHeading} intro={noFormIntro} />;
}
