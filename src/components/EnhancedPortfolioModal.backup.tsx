import * as DialogPrimitive from '@radix-ui/react-dialog';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, X, Info, Maximize2, Minimize2, XCircle } from 'lucide-react';
import { useMemo, useState, useEffect, useCallback } from 'react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription, SheetClose } from './ui/sheet';

type EnhancedPortfolioModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  project: any | null;
  onPrimaryCta?: () => void;
  onSecondaryCta?: () => void;
};

export function EnhancedPortfolioModal({
  open,
  onOpenChange,
  project,
  onPrimaryCta,
  onSecondaryCta,
}: EnhancedPortfolioModalProps) {
  const safeProject = project ?? ({} as any);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  
  const images = useMemo<string[]>(() => {
    if (Array.isArray(safeProject?.gallery) && safeProject.gallery.length > 0) {
      return safeProject.gallery;
    }
    if (safeProject?.image) {
      return [safeProject.image];
    }
    return [];
  }, [safeProject]);

  const src = images[currentIndex] ?? safeProject.image ?? '';
  const canNavigate = images.length > 1;

  useEffect(() => {
    setCurrentIndex(0);
    setImageLoading(true);
  }, [safeProject?.id]);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [open]);

  const prev = useCallback(() => {
    if (!canNavigate) return;
    setImageLoading(true);
    setCurrentIndex((p) => (p === 0 ? images.length - 1 : p - 1));
  }, [canNavigate, images.length]);

  const next = useCallback(() => {
    if (!canNavigate) return;
    setImageLoading(true);
    setCurrentIndex((p) => (p === images.length - 1 ? 0 : p + 1));
  }, [canNavigate, images.length]);

  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  }, []);

  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
      if (e.key === 'Escape') onOpenChange(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open, prev, next, onOpenChange]);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    if (distance > 50) next();
    if (distance < -50) prev();
    setTouchStart(0);
    setTouchEnd(0);
  };

  // Details Content (Reused in Sheet)
  const ProjectDetailsContent = () => (
    <div className="flex flex-col h-full text-left">
      <div className="space-y-6 p-6 overflow-y-auto flex-1">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Badge className="bg-primary text-white border-0 text-xs px-2 py-1">
              {safeProject.category || 'Portfolio'}
            </Badge>
            {safeProject.year && (
              <span className="text-xs text-zinc-500 font-medium">{safeProject.year}</span>
            )}
          </div>
          <h2 className="text-2xl font-display font-semibold text-white leading-tight">
            {safeProject.title || 'Project Title'}
          </h2>
          {safeProject.location && (
            <p className="text-sm text-zinc-400 flex items-center gap-1">
              {safeProject.location}
            </p>
          )}
        </div>

        <div className="prose prose-invert prose-sm max-w-none">
          <p className="text-zinc-300 leading-relaxed">
            {safeProject.fullDescription || safeProject.description || 'No description available.'}
          </p>
        </div>

        {(safeProject.duration || safeProject.size) && (
          <div className="grid grid-cols-2 gap-3 py-4 border-y border-white/10">
            {safeProject.duration && (
              <div>
                <div className="text-[10px] text-zinc-500 uppercase tracking-wider font-medium">Duration</div>
                <div className="text-sm text-white font-medium mt-0.5">{safeProject.duration}</div>
              </div>
            )}
            {safeProject.size && (
              <div>
                <div className="text-[10px] text-zinc-500 uppercase tracking-wider font-medium">Size</div>
                <div className="text-sm text-white font-medium mt-0.5">{safeProject.size}</div>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="p-6 border-t border-white/10 bg-zinc-900/50 space-y-3 mt-auto">
        <Button 
          size="lg" 
          className="w-full bg-primary hover:bg-primary/90 text-white"
          onClick={() => {
            onPrimaryCta ? onPrimaryCta() : onOpenChange(false);
          }}
        >
          Start Your Project
        </Button>
        <Button 
          size="lg" 
          variant="outline" 
          className="w-full border-white/10 text-white hover:bg-white/5 hover:text-white"
          onClick={() => {
            onSecondaryCta ? onSecondaryCta() : onOpenChange(false);
          }}
        >
          Request Consultation
        </Button>
      </div>
    </div>
  );

  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <AnimatePresence>
        {open && (
          <DialogPrimitive.Portal forceMount>
            {/* Backdrop with Blur - Z-Index 140 */}
            <DialogPrimitive.Overlay asChild>
              <motion.div
                className="fixed inset-0 z-[140] bg-black/95 backdrop-blur-md"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              />
            </DialogPrimitive.Overlay>

            <DialogPrimitive.Content asChild>
              <motion.div
                className="fixed inset-0 z-[150] w-screen h-screen overflow-hidden"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
              >
                <DialogPrimitive.Title className="sr-only">
                  {safeProject.title ?? 'Project Gallery'}
                </DialogPrimitive.Title>
                <DialogPrimitive.Description className="sr-only">
                  Image gallery for {safeProject.title}
                </DialogPrimitive.Description>

                {/* === TOP BAR === Z-Index 200 */}
                <div className="absolute top-0 left-0 right-0 z-[200] p-4 sm:p-6 flex justify-between items-start">
                  {/* Left: Counter (Mobile/Desktop) */}
                  <div className="pointer-events-auto">
                    <Badge variant="outline" className="bg-black/40 backdrop-blur-md text-white border-white/10">
                      {currentIndex + 1} / {images.length}
                    </Badge>
                  </div>

                  {/* Right: Controls */}
                  <div className="flex gap-2 z-[210]">
                    <button
                      onClick={toggleFullscreen}
                      style={{ backgroundColor: '#1f2937', zIndex: 210 }}
                      className="h-14 w-14 rounded-lg border-2 border-white/40 flex items-center justify-center text-white hover:bg-gray-600 hover:scale-105 transition-all"
                      aria-label="Toggle Fullscreen"
                    >
                      {isFullscreen ? <Minimize2 size={22} /> : <Maximize2 size={22} />}
                    </button>
                    <button
                      onClick={(e) => { e.stopPropagation(); onOpenChange(false); }}
                      style={{ backgroundColor: '#dc2626', zIndex: 210 }}
                      className="h-16 w-16 rounded-full border-4 border-white flex items-center justify-center text-white hover:opacity-90 hover:scale-105 transition-all shadow-2xl cursor-pointer"
                      aria-label="Close Gallery"
                      type="button"
                    >
                      <X size={32} strokeWidth={4} className="text-white" />
                    </button>
                  </div>
                </div>

                {/* === MAIN IMAGE AREA === */}
                <div 
                  className="absolute inset-0 flex items-center justify-center w-full h-full px-4 sm:px-8 lg:px-16"
                  onTouchStart={handleTouchStart}
                  onTouchMove={handleTouchMove}
                  onTouchEnd={handleTouchEnd}
                >
                  {/* Image Constraint Container */}
                  <div className="relative w-full flex items-center justify-center max-w-6xl mx-auto" style={{ maxHeight: '100%' }}>
                    {imageLoading && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-16 h-16 border-4 border-white/20 border-t-white rounded-full animate-spin" />
                      </div>
                    )}
                    <AnimatePresence mode="wait">
                      {src && (
                        <motion.div
                          key={src}
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          transition={{ duration: 0.3 }}
                          className="flex items-center justify-center"
                        >
                          <img
                            src={src}
                            alt={safeProject.title}
                            style={{ maxHeight: '70vh', maxWidth: '85vw' }}
                            className="w-auto h-auto object-contain rounded-lg shadow-2xl"
                            onLoad={() => setImageLoading(false)}
                          />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Navigation Arrows (Floating) - Z-Index 155 */}
                  {canNavigate && (
                    <>
                      <button
                        onClick={prev}
                        aria-label="Previous image"
                        className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 h-12 w-12 sm:h-16 sm:w-16 rounded-full bg-black/20 hover:bg-black/60 backdrop-blur-sm border border-white/5 hover:border-white/20 flex items-center justify-center text-white/70 hover:text-white transition-all group z-[155] hidden sm:flex cursor-pointer"
                      >
                        <ChevronLeft size={32} className="group-hover:-translate-x-1 transition-transform" />
                      </button>
                      <button
                        onClick={next}
                        aria-label="Next image"
                        className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 h-12 w-12 sm:h-16 sm:w-16 rounded-full bg-black/20 hover:bg-black/60 backdrop-blur-sm border border-white/5 hover:border-white/20 flex items-center justify-center text-white/70 hover:text-white transition-all group z-[155] hidden sm:flex cursor-pointer"
                      >
                        <ChevronRight size={32} className="group-hover:translate-x-1 transition-transform" />
                      </button>
                    </>
                  )}
                </div>

                {/* === BOTTOM BAR (Overlay) === Z-Index 160 */}
                <div className="absolute bottom-0 left-0 right-0 z-[160] bg-gradient-to-t from-black via-black/90 to-transparent pt-12 pb-6 px-6">
                  <div className="max-w-7xl mx-auto w-full flex flex-col gap-6">
                    
                    {/* Thumbnail Strip (Visible on Desktop & Mobile) */}
                    {images.length > 1 && (
                      <div className="flex justify-center sm:justify-start overflow-x-auto pb-2 gap-2 no-scrollbar mask-linear-fade">
                        {images.map((img, idx) => (
                          <button
                            key={`thumb-${idx}`}
                            onClick={() => setCurrentIndex(idx)}
                            aria-label={`View image ${idx + 1}`}
                            className={`relative h-12 w-12 sm:h-16 sm:w-16 shrink-0 rounded-md overflow-hidden border-2 transition-all ${
                              idx === currentIndex
                                ? 'border-primary ring-2 ring-primary/20 opacity-100 scale-105'
                                : 'border-transparent opacity-50 hover:opacity-100 hover:border-white/30'
                            }`}
                          >
                            <img src={img} alt="" className="w-full h-full object-cover" />
                          </button>
                        ))}
                      </div>
                    )}

                    {/* Info & Actions Row */}
                    <div className="flex items-end justify-between gap-4">
                      <div className="flex-1 min-w-0 text-left">
                        <h2 className="text-white font-display text-xl sm:text-2xl font-medium truncate shadow-black drop-shadow-md">
                          {safeProject.title}
                        </h2>
                        <p className="text-zinc-300 text-sm truncate">
                          {safeProject.category}
                        </p>
                      </div>

                      <Sheet open={detailsOpen} onOpenChange={setDetailsOpen}>
                        <SheetTrigger asChild>
                          <Button 
                            variant="outline" 
                            className="bg-zinc-900 backdrop-blur-md border-2 border-white/30 text-white hover:bg-primary hover:border-primary hover:scale-105 transition-all duration-200 gap-2 shadow-xl h-11 px-4 sm:px-5 font-semibold"
                            onClick={() => setDetailsOpen(true)}
                          >
                            <Info size={20} strokeWidth={2.5} />
                            <span className="font-semibold">Project Details</span>
                          </Button>
                        </SheetTrigger>
                        <SheetContent side="right" className="!w-[450px] !max-w-[90vw] !bg-zinc-950 border-l-2 border-white/20 p-0 overflow-hidden" style={{ backgroundColor: '#09090b', width: '450px' }}>
                          <div className="absolute top-4 right-4 z-[100]">
                            <SheetClose asChild>
                              <button
                                style={{ backgroundColor: '#dc2626' }}
                                className="h-12 w-12 rounded-lg border-2 border-white flex items-center justify-center text-white hover:opacity-90 hover:scale-105 transition-all duration-200 cursor-pointer shadow-xl"
                                aria-label="Close Details"
                              >
                                <X size={24} strokeWidth={3} />
                              </button>
                            </SheetClose>
                          </div>
                          <div className="h-full pt-16 overflow-y-auto">
                            <SheetTitle className="sr-only">Project Details</SheetTitle>
                            <SheetDescription className="sr-only">Full details for {safeProject.title}</SheetDescription>
                            <ProjectDetailsContent />
                          </div>
                        </SheetContent>
                      </Sheet>
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
