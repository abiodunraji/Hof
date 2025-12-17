import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

export type UseImageLightboxOptions = {
  open: boolean;
  imageCount: number;
  onClose: () => void;
  resetKey?: string | number;
};

export function useImageLightbox({ open, imageCount, onClose, resetKey }: UseImageLightboxOptions) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [zoomed, setZoomed] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const fullscreenRef = useRef<HTMLDivElement | null>(null);
  const wheelGateRef = useRef(0);

  const canNavigate = useMemo(() => imageCount > 1, [imageCount]);

  const clampIndex = useCallback(
    (index: number) => {
      if (imageCount <= 0) return 0;
      return ((index % imageCount) + imageCount) % imageCount;
    },
    [imageCount],
  );

  const prev = useCallback(() => {
    if (!canNavigate) return;
    setCurrentIndex((i) => clampIndex(i - 1));
  }, [canNavigate, clampIndex]);

  const next = useCallback(() => {
    if (!canNavigate) return;
    setCurrentIndex((i) => clampIndex(i + 1));
  }, [canNavigate, clampIndex]);

  const toggleFullscreen = useCallback(async () => {
    try {
      if (!document.fullscreenElement) {
        await fullscreenRef.current?.requestFullscreen?.();
      } else {
        await document.exitFullscreen?.();
      }
    } catch {
      // Browser/device policy may block fullscreen.
    }
  }, []);

  const onWheelNavigate = useCallback(
    (deltaY: number) => {
      if (!open || !canNavigate || zoomed) return;
      const now = Date.now();
      if (now - wheelGateRef.current < 220) return;
      wheelGateRef.current = now;
      if (deltaY > 0) next();
      else prev();
    },
    [open, canNavigate, zoomed, next, prev],
  );

  useEffect(() => {
    const onFsChange = () => setIsFullscreen(Boolean(document.fullscreenElement));
    document.addEventListener('fullscreenchange', onFsChange);
    return () => document.removeEventListener('fullscreenchange', onFsChange);
  }, []);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      const tag = target?.tagName?.toLowerCase();
      if (tag === 'input' || tag === 'textarea' || (target as any)?.isContentEditable) return;

      if (e.key === 'Escape') {
        onClose();
        return;
      }
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        prev();
        return;
      }
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        next();
        return;
      }

      // Attempt to handle F11 by mapping it to the Fullscreen API.
      // Browsers may still intercept/block it.
      if (e.key === 'F11') {
        e.preventDefault();
        toggleFullscreen();
        return;
      }

      // F11 is browser-managed; use 'f' as a reliable hotkey.
      if (e.key.toLowerCase() === 'f') {
        e.preventDefault();
        toggleFullscreen();
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open, onClose, prev, next, toggleFullscreen]);

  useEffect(() => {
    if (!open) return;
    setCurrentIndex(0);
    setDetailsOpen(false);
    setZoomed(false);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    setCurrentIndex(0);
    setDetailsOpen(false);
    setZoomed(false);
  }, [open, resetKey]);

  return {
    currentIndex,
    setCurrentIndex,
    detailsOpen,
    setDetailsOpen,
    zoomed,
    setZoomed,
    isFullscreen,
    toggleFullscreen,
    fullscreenRef,
    canNavigate,
    prev,
    next,
    onWheelNavigate,
  };
}
