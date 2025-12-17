import { useEffect, useRef } from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';

type ThumbnailItemProps = {
  src: string;
  alt: string;
  active: boolean;
  onClick: () => void;
};

export function ThumbnailItem({ src, alt, active, onClick }: ThumbnailItemProps) {
  const ref = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (!active) return;
    ref.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'center',
    });
  }, [active]);

  return (
    <button
      ref={ref}
      type="button"
      onClick={onClick}
      className={
        'relative shrink-0 h-16 w-16 sm:h-[72px] sm:w-[72px] overflow-hidden rounded-lg border bg-white/5 transition snap-center ' +
        (active
          ? 'border-white/30 ring-2 ring-blue-500'
          : 'border-white/10 hover:border-white/25 hover:scale-110')
      }
      aria-current={active ? 'true' : undefined}
      aria-label={alt}
    >
      <ImageWithFallback
        src={src}
        alt={alt}
        className="h-full w-full object-cover"
        loading="lazy"
        decoding="async"
        draggable={false}
      />
    </button>
  );
}
