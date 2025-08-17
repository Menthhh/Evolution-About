import React from "react";
import { VideoThumbnailsProps } from "@/types/evolution-homepage";
import { VideoThumbnailCard } from "./VideoThumbnailCard";
import { cn } from "@/lib/utils";

/**
 * VideoThumbnails Component
 *
 * Horizontal scrolling container for smaller video thumbnails.
 * Implements video thumbnail cards with play button overlays.
 * Includes smooth scrolling behavior and proper touch interaction for mobile.
 *
 * Requirements:
 * - 3.3: Display smaller video thumbnails in horizontal row
 * - 3.4: Video titles and play button overlays
 * - Smooth scrolling and touch interaction for mobile
 */
export function VideoThumbnails({ videos }: VideoThumbnailsProps) {
  if (!videos || videos.length === 0) {
    return (
      <div className="flex items-center justify-center py-8 text-muted-foreground">
        <p>ไม่มีวิดีโออื่นๆ</p>
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Horizontal Scroll Container - Enhanced for Mobile */}
      <div
        className={cn(
          // Mobile-optimized horizontal scrolling
          "flex overflow-x-auto overscroll-x-contain",
          // Mobile-first responsive gap spacing
          "gap-3 sm:gap-4 lg:gap-6",
          // Mobile-friendly padding and scrolling
          "pb-3 sm:pb-4",
          // Smooth scrolling behavior
          "scroll-smooth",
          // Enhanced scrollbar styling
          "scrollbar-thin scrollbar-track-transparent",
          "scrollbar-thumb-muted-foreground/20 hover:scrollbar-thumb-muted-foreground/40",
          // Touch-friendly scrolling
          "touch-pan-x",
          // Snap scrolling for better mobile UX
          "snap-x snap-mandatory",
          // Hide scrollbar on mobile for cleaner look
          "sm:scrollbar-thin scrollbar-none sm:scrollbar-track-transparent"
        )}
      >
        {videos.map((video, index) => (
          <div
            key={video.id}
            className={cn(
              // Snap alignment for mobile scrolling
              "snap-start snap-always",
              // Prevent shrinking and ensure consistent sizing
              "flex-shrink-0",
              // Animation delay for staggered loading
              index < 3 && "animate-in slide-in-from-right-4",
              index < 3 && `animation-delay-${index * 100 + 100}`
            )}
          >
            <VideoThumbnailCard video={video} />
          </div>
        ))}
      </div>

      {/* Mobile Scroll Indicators */}
      <div className="flex justify-center mt-2 sm:hidden">
        <div className="flex space-x-1">
          {Array.from({ length: Math.min(videos.length, 5) }).map(
            (_, index) => (
              <div
                key={index}
                className={cn(
                  "h-1 rounded-full transition-all duration-300",
                  index === 0 ? "w-6 bg-accent" : "w-2 bg-muted-foreground/30"
                )}
              />
            )
          )}
        </div>
      </div>
    </div>
  );
}
