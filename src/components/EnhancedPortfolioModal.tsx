import * as DialogPrimitive from '@radix-ui/react-dialog';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, X, Share2 } from 'lucide-react';
import { useMemo, useState, useEffect, useCallback, memo } from 'react';
import { Badge } from './ui/badge';
import { usePortfolioModal } from '../hooks/usePortfolioModal';
import { ErrorBoundary } from './ErrorBoundary';

type EnhancedPortfolioModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  project: any | null;
};

const Thumbnail = memo(({ 
  src, 
  index, 
  currentIndex, 
  onClick 
}: { 
  src: string; 
  index: number; 
  currentIndex: number; 
  onClick: () => void;
}) => (
  <button
    onClick={onClick}
    aria-label={`View image ${index + 1}`}
    className={`relative h-12 w-12 sm:h-16 sm:w-16 shrink-0 rounded-md overflow-hidden border-2 transition-all duration-300 ${
      index === currentIndex
        ? 'border-primary ring-2 ring-primary/20 opacity-100 scale-105'
        : 'border-transparent opacity-50 hover:opacity-100 hover:border-white/30'
    }`}
  >
    <img 
      src={src} 
      alt="" 
      className="w-full h-full object-cover"
      loading="lazy"
    />
  </button>
));

Thumbnail.displayName = 'Thumbnail';

function PortfolioModalContent({
  open,
  onOpenChange,
  project,
}: EnhancedPortfolioModalProps) {
  const safeProject = project ?? ({} as any);
  const [imageLoading, setImageLoading] = useState(true);
  const [imageError, setImageError] = useState(false);

  const images = useMemo<string[]>(() => {
    if (Array.isArray(safeProject?.gallery) && safeProject.gallery.length > 0) {
      return safeProject.gallery;
    }
    if (safeProject?.image) {
      return [safeProject.image];
    }
    return [];
  }, [safeProject]);

  const {
    currentIndex,
    currentImage,
    isZoomed,
    canNavigate,
    hasNext,
    hasPrev,
    panPosition,
    isDragging,
    next,
    prev,
    goToImage,
    toggleZoom,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp
  } = usePortfolioModal({
    images,
    onClose: () => onOpenChange(false)
  });

  useEffect(() => {
    if (open) {
      setImageLoading(true);
      setImageError(false);
    }
  }, [open, safeProject?.id]);

  useEffect(() => {
    if (!open) return;

    const modal = document.querySelector('[role="dialog"]');
    if (!modal) return;

    const focusableElements = modal.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement?.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement?.focus();
        }
      }
    };

    document.addEventListener('keydown', handleTabKey);
    firstElement?.focus();

    return () => document.removeEventListener('keydown', handleTabKey);
  }, [open]);

  const handleShare = useCallback(async () => {
    const shareData = {
      title: safeProject.title || 'House of Faridah Portfolio',
      text: safeProject.description || 'Check out this beautiful interior design project',
      url: window.location.href
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(window.location.href);
      }
    } catch (err) {
      console.error('Error sharing:', err);
    }
  }, [safeProject]);

  const handleImageLoad = useCallback(() => {
    setImageLoading(false);
    setImageError(false);
  }, []);

  const handleImageError = useCallback(() => {
    setImageLoading(false);
    setImageError(true);
  }, []);

  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <AnimatePresence>
        {open && (
          <DialogPrimitive.Portal forceMount>
            <DialogPrimitive.Overlay asChild>
              <motion.div
                className="fixed inset-0 z-[140] bg-black/95 backdrop-blur-md"
                style={{ willChange: 'opacity' }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              />
            </DialogPrimitive.Overlay>

            <DialogPrimitive.Content asChild>
              <motion.div
                className="fixed inset-0 z-[150] w-screen h-screen overflow-hidden"
                style={{ willChange: 'transform, opacity' }}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.3 }}
              >
                <DialogPrimitive.Title className="sr-only">
                  {safeProject.title ?? 'Project Gallery'}
                </DialogPrimitive.Title>
                <DialogPrimitive.Description className="sr-only">
                  Image gallery for {safeProject.title}
                </DialogPrimitive.Description>

                <div className="absolute top-0 left-0 right-0 z-[200] p-4 sm:p-6 flex justify-between items-start">
                  <div>
                    <Badge 
                      variant="outline" 
                      className="bg-black/40 backdrop-blur-md text-white border-white/10"
                      aria-live="polite"
                      aria-atomic="true"
                    >
                      {currentIndex + 1} / {images.length}
                    </Badge>
                  </div>

                  <div className="flex gap-2 z-[210]">
                    <button
                      onClick={handleShare}
                      style={{ backgroundColor: '#1f2937', zIndex: 210 }}
                      className="h-12 w-12 rounded-lg border-2 border-white/40 flex items-center justify-center text-white hover:bg-gray-600 hover:scale-105 transition-all duration-300"
                      aria-label="Share Project"
                      title="Share this project"
                    >
                      <Share2 size={20} />
                    </button>

                    <button
                      onClick={(e) => { e.stopPropagation(); onOpenChange(false); }}
                      style={{ backgroundColor: '#dc2626', zIndex: 210 }}
                      className="h-14 w-14 rounded-full border-4 border-white flex items-center justify-center text-white hover:opacity-90 hover:scale-105 transition-all duration-300 shadow-2xl cursor-pointer"
                      aria-label="Close Gallery"
                      type="button"
                    >
                      <X size={32} strokeWidth={4} className="text-white" />
                    </button>
                  </div>
                </div>

                <div 
                  className="absolute inset-0 flex items-center justify-center w-full h-full px-4 sm:px-8 lg:px-16"
                  onTouchStart={handleTouchStart}
                  onTouchMove={handleTouchMove}
                  onTouchEnd={handleTouchEnd}
                >
                  <div className="relative w-full flex items-center justify-center max-w-6xl mx-auto" style={{ maxHeight: '100%' }}>
                    {imageLoading && !imageError && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-16 h-16 border-4 border-white/20 border-t-white rounded-full animate-spin" />
                      </div>
                    )}
                    
                    {imageError && (
                      <div className="text-white text-center p-8">
                        <p className="text-xl mb-2">Failed to load image</p>
                        <p className="text-zinc-400">Please try another image</p>
                      </div>
                    )}

                    <AnimatePresence mode="wait">
                      {currentImage && !imageError && (
                        <motion.div
                          key={currentImage}
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          transition={{ duration: 0.3 }}
                          className="flex items-center justify-center"
                          style={{ willChange: 'transform, opacity' }}
                        >
                          <img
                            src={currentImage}
                            alt={safeProject.title}
                            onClick={toggleZoom}
                            onLoad={handleImageLoad}
                            onError={handleImageError}
                            onMouseDown={handleMouseDown}
                            onMouseMove={handleMouseMove}
                            onMouseUp={handleMouseUp}
                            onMouseLeave={handleMouseUp}
                            style={{ 
                              maxHeight: '70vh', 
                              maxWidth: '85vw',
                              transform: isZoomed 
                                ? `scale(2) translate(${panPosition.x / 2}px, ${panPosition.y / 2}px)` 
                                : 'scale(1)',
                              transition: isDragging ? 'none' : 'transform 0.3s ease-in-out',
                              cursor: isZoomed ? (isDragging ? 'grabbing' : 'grab') : 'zoom-in',
                              willChange: isZoomed || isDragging ? 'transform' : 'auto',
                              userSelect: 'none',
                              touchAction: isZoomed ? 'none' : 'auto'
                            }}
                            className="w-auto h-auto object-contain rounded-lg shadow-2xl"
                            loading="eager"
                            draggable={false}
                          />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {canNavigate && (
                    <>
                      <button
                        onClick={prev}
                        disabled={!hasPrev}
                        aria-label="Previous image"
                        className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 h-12 w-12 sm:h-16 sm:w-16 rounded-full bg-black/20 hover:bg-black/60 backdrop-blur-sm border border-white/5 hover:border-white/20 flex items-center justify-center text-white/70 hover:text-white transition-all duration-300 group z-[155] hidden sm:flex cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
                      >
                        <ChevronLeft size={32} className="group-hover:-translate-x-1 transition-transform duration-300" />
                      </button>
                      <button
                        onClick={next}
                        disabled={!hasNext}
                        aria-label="Next image"
                        className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 h-12 w-12 sm:h-16 sm:w-16 rounded-full bg-black/20 hover:bg-black/60 backdrop-blur-sm border border-white/5 hover:border-white/20 flex items-center justify-center text-white/70 hover:text-white transition-all duration-300 group z-[155] hidden sm:flex cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
                      >
                        <ChevronRight size={32} className="group-hover:translate-x-1 transition-transform duration-300" />
                      </button>
                    </>
                  )}
                </div>

                <div className="absolute bottom-0 left-0 right-0 z-[160] bg-gradient-to-t from-black via-black/90 to-transparent pt-12 pb-6 px-6">
                  <div className="max-w-7xl mx-auto w-full flex flex-col gap-6">
                    
                    {images.length > 1 && (
                      <div className="flex justify-center sm:justify-start overflow-x-auto pb-2 gap-2 no-scrollbar mask-linear-fade">
                        {images.map((img, idx) => (
                          <Thumbnail
                            key={`thumb-${idx}`}
                            src={img}
                            index={idx}
                            currentIndex={currentIndex}
                            onClick={() => goToImage(idx)}
                          />
                        ))}
                      </div>
                    )}

                    <div className="flex items-end justify-between gap-4">
                      <div className="flex-1 min-w-0 text-left">
                        <h2 className="text-white font-display text-xl sm:text-2xl font-medium truncate shadow-black drop-shadow-md">
                          {safeProject.title}
                        </h2>
                        <p className="text-zinc-300 text-sm truncate">
                          {safeProject.category}
                          {safeProject.year && `  ${safeProject.year}`}
                          {safeProject.duration && `  ${safeProject.duration}`}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

              </motion.div>
            </DialogPrimitive.Content>
          </DialogPrimitive.Portal>
        )}
      </AnimatePresence>
    </DialogPrimitive.Root>
  );
}

export function EnhancedPortfolioModal(props: EnhancedPortfolioModalProps) {
  return (
    <ErrorBoundary>
      <PortfolioModalContent {...props} />
    </ErrorBoundary>
  );
}
