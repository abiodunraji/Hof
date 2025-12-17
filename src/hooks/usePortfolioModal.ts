import { useState, useCallback, useEffect, useMemo } from 'react';

interface UsePortfolioModalProps {
  images: string[];
  initialIndex?: number;
  onClose: () => void;
}

export function usePortfolioModal({ images, initialIndex = 0, onClose }: UsePortfolioModalProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [isZoomed, setIsZoomed] = useState(false);
  const [touchStart, setTouchStart] = useState({ x: 0, y: 0 });
  const [touchEnd, setTouchEnd] = useState({ x: 0, y: 0 });
  
  // Pan/drag state for zoomed images
  const [panPosition, setPanPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  // Navigation
  const next = useCallback(() => {
    if (currentIndex < images.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setIsZoomed(false);
      setPanPosition({ x: 0, y: 0 });
    }
  }, [currentIndex, images.length]);

  const prev = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
      setIsZoomed(false);
      setPanPosition({ x: 0, y: 0 });
    }
  }, [currentIndex]);

  const goToImage = useCallback((index: number) => {
    if (index >= 0 && index < images.length) {
      setCurrentIndex(index);
      setIsZoomed(false);
      setPanPosition({ x: 0, y: 0 });
    }
  }, [images.length]);

  // Zoom toggle
  const toggleZoom = useCallback(() => {
    setIsZoomed(prev => {
      if (prev) setPanPosition({ x: 0, y: 0 }); // Reset pan when zooming out
      return !prev;
    });
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') next();
      else if (e.key === 'ArrowLeft') prev();
      else if (e.key === 'Escape') onClose();
      else if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        toggleZoom();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [next, prev, onClose, toggleZoom]);

  // Touch gestures - horizontal swipe for navigation, drag for panning when zoomed
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    const touch = e.targetTouches[0];
    setTouchStart({ x: touch.clientX, y: touch.clientY });
    
    if (isZoomed) {
      setIsDragging(true);
      setDragStart({ 
        x: touch.clientX - panPosition.x, 
        y: touch.clientY - panPosition.y 
      });
    }
  }, [isZoomed, panPosition]);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    const touch = e.targetTouches[0];
    setTouchEnd({ x: touch.clientX, y: touch.clientY });
    
    if (isZoomed && isDragging) {
      // touchAction: 'none' in CSS prevents default scrolling, so no need for preventDefault
      setPanPosition({
        x: touch.clientX - dragStart.x,
        y: touch.clientY - dragStart.y
      });
    }
  }, [isZoomed, isDragging, dragStart]);

  const handleTouchEnd = useCallback(() => {
    if (isZoomed && isDragging) {
      setIsDragging(false);
      return;
    }
    
    if (!touchStart.x || !touchEnd.x) return;

    const distanceX = touchStart.x - touchEnd.x;
    const distanceY = touchStart.y - touchEnd.y;
    const isHorizontal = Math.abs(distanceX) > Math.abs(distanceY);

    // Horizontal swipe for navigation (only when not zoomed)
    if (isHorizontal && !isZoomed) {
      if (distanceX > 50) next();
      if (distanceX < -50) prev();
    } 
    // Vertical swipe down to close (mobile)
    else if (distanceY < -100 && !isZoomed) {
      onClose();
    }

    setTouchStart({ x: 0, y: 0 });
    setTouchEnd({ x: 0, y: 0 });
    setIsDragging(false);
  }, [touchStart, touchEnd, isZoomed, isDragging, next, prev, onClose]);

  // Mouse drag handlers for desktop
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (isZoomed) {
      setIsDragging(true);
      setDragStart({ 
        x: e.clientX - panPosition.x, 
        y: e.clientY - panPosition.y 
      });
    }
  }, [isZoomed, panPosition]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (isZoomed && isDragging) {
      setPanPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      });
    }
  }, [isZoomed, isDragging, dragStart]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  // Image preloading
  useEffect(() => {
    // Preload next and previous images
    const preloadImages = [
      images[currentIndex + 1],
      images[currentIndex - 1]
    ].filter(Boolean);

    preloadImages.forEach(src => {
      const img = new Image();
      img.src = src;
    });
  }, [currentIndex, images]);

  // Current image with memoization
  const currentImage = useMemo(() => images[currentIndex], [images, currentIndex]);

  const canNavigate = images.length > 1;
  const hasNext = currentIndex < images.length - 1;
  const hasPrev = currentIndex > 0;

  return {
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
  };
}
