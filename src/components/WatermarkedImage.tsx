/**
 * WatermarkedImage Component
 * 
 * Displays images with a semi-transparent watermark overlay that appears on the image itself.
 * The watermark is embedded in the visual layer, making it visible even when downloaded.
 * 
 * Features:
 * - Diagonal watermark text across the image
 * - Semi-transparent to not obscure the image too much
 * - Appears on the actual image (not as a separate overlay)
 * - Visible when image is downloaded or screenshot
 */

import { ImageWithFallback } from './figma/ImageWithFallback';

interface WatermarkedImageProps {
  src: string;
  alt: string;
  className?: string;
  watermarkText?: string;
}

export function WatermarkedImage({ 
  src, 
  alt, 
  className = '',
  watermarkText = 'HOF INTERIORS'
}: WatermarkedImageProps) {
  return (
    <div className="relative inline-block w-full h-full">
      <ImageWithFallback
        src={src}
        alt={alt}
        className={className}
      />
      {/* Watermark overlay - appears on the image itself */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center overflow-hidden">
        {/* Multiple diagonal watermarks for better coverage */}
        <div className="absolute inset-0 flex flex-col justify-around">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="whitespace-nowrap text-white/20 font-display text-4xl md:text-6xl lg:text-7xl font-bold tracking-widest transform -rotate-45 select-none watermark-shadow"
              // eslint-disable-next-line no-inline-styles
              style={{
                transform: `rotate(-45deg) translateY(${i * 100 - 200}px)`
              }}
            >
              {watermarkText} • {watermarkText} • {watermarkText}
            </div>
          ))}
        </div>
        
        {/* Center watermark - more prominent */}
        <div
          className="text-white/30 font-display text-5xl md:text-7xl lg:text-8xl font-bold tracking-widest transform -rotate-45 select-none watermark-shadow-strong"
        >
          {watermarkText}
        </div>
      </div>
    </div>
  );
}
