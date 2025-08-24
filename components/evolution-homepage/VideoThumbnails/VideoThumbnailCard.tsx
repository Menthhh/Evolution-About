"use client";

import React, { useState } from "react";
import { Video } from "@/types/evolution-homepage";
import { Play, Clock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface VideoThumbnailCardProps {
  video: Video;
}

/**
 * VideoThumbnailCard Component
 *
 * Individual video thumbnail card with play button overlay.
 * Displays video thumbnail, title, duration, and view count.
 * Includes hover effects and proper touch interaction.
 */
export function VideoThumbnailCard({ video }: VideoThumbnailCardProps) {
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <div className="flex-shrink-0 w-48 sm:w-56 lg:w-64 group">
      <Link
        href={`/videos/${video.youtubeId}`}
        className={cn(
          // Mobile-optimized spacing and interactions
          "block space-y-2 transition-all duration-300 cursor-pointer",
          // Touch-friendly hover effects
          "group-hover:scale-105 group-active:scale-95",
          // Ensure proper touch targets
          "touch-manipulation",
          // Mobile-friendly minimum touch target size
          "min-h-[44px]"
        )}
        aria-label={`เล่นวิดีโอ: ${video.title}`}
      >
        {/* Thumbnail Container */}
        <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-muted">
          {/* Thumbnail Image */}
          {!imageError ? (
            <Image
              src={video.thumbnail}
              alt={video.title}
              fill
              className="object-cover transition-opacity duration-300 group-hover:opacity-90"
              onError={handleImageError}
              sizes="(max-width: 768px) 256px, 256px"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-muted">
              <Play className="h-12 w-12 text-muted-foreground" />
            </div>
          )}

          {/* Play Button Overlay */}
          <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/90 shadow-lg transition-transform duration-300 group-hover:scale-110">
              <Play className="h-5 w-5 text-black ml-0.5" fill="currentColor" />
            </div>
          </div>

          {/* Duration Badge */}
          <div className="absolute bottom-2 right-2 flex items-center space-x-1 rounded bg-black/80 px-2 py-1 text-xs text-white">
            <Clock className="h-3 w-3" />
            <span>{video.duration}</span>
          </div>
        </div>

        {/* Video Information */}
        <div className="space-y-1">
          {/* Video Title */}
          <h4 className="text-sm font-medium text-foreground leading-tight line-clamp-2 group-hover:text-primary transition-colors duration-200">
            {video.title}
          </h4>

          {/* Video Metadata */}
          <div className="flex items-center space-x-2 text-xs text-muted-foreground">
            {video.views && <span>{video.views.toLocaleString()} ครั้ง</span>}
          </div>
        </div>
      </Link>
    </div>
  );
}
