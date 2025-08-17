"use client";

import React, { useState } from "react";
import { FeaturedVideoProps } from "@/types/evolution-homepage";
import { Play, Loader2 } from "lucide-react";

/**
 * FeaturedVideo Component
 *
 * Large YouTube video embed with responsive 16:9 aspect ratio.
 * Displays video title and description below the embedded player.
 * Includes proper loading states and error handling for video embeds.
 *
 * Requirements:
 * - 3.1: Large embedded YouTube video at top of section
 * - 3.2: Video title, description, and proper aspect ratio
 * - Mobile-friendly video player functionality
 */
export function FeaturedVideo({ video, autoplay = false }: FeaturedVideoProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleIframeLoad = () => {
    setIsLoading(false);
  };

  const handleIframeError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  const embedUrl = `https://www.youtube.com/embed/${
    video.youtubeId
  }?${new URLSearchParams({
    rel: "0",
    modestbranding: "1",
    autoplay: autoplay ? "1" : "0",
    mute: autoplay ? "1" : "0",
  }).toString()}`;

  return (
    <div className="space-y-4">
      {/* Video Player Container */}
      <div className="relative w-full">
        {/* 16:9 Aspect Ratio Container */}
        <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-muted">
          {/* Loading State */}
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-muted">
              <div className="flex flex-col items-center space-y-2">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                <p className="text-sm text-muted-foreground">
                  กำลังโหลดวิดีโอ...
                </p>
              </div>
            </div>
          )}

          {/* Error State */}
          {hasError && (
            <div className="absolute inset-0 flex items-center justify-center bg-muted">
              <div className="flex flex-col items-center space-y-2 text-center">
                <Play className="h-12 w-12 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">
                  ไม่สามารถโหลดวิดีโอได้
                </p>
                <p className="text-xs text-muted-foreground">
                  กรุณาลองใหม่อีกครั้ง
                </p>
              </div>
            </div>
          )}

          {/* YouTube Embed */}
          {!hasError && (
            <iframe
              src={embedUrl}
              title={video.title}
              className="absolute inset-0 h-full w-full"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              onLoad={handleIframeLoad}
              onError={handleIframeError}
            />
          )}
        </div>
      </div>

      {/* Video Information */}
      <div className="space-y-2">
        {/* Video Title */}
        <h3 className="text-xl font-semibold text-foreground leading-tight">
          {video.title}
        </h3>

        {/* Video Metadata */}
        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
          <span>{video.duration}</span>
          {video.views && <span>{video.views.toLocaleString()} ครั้ง</span>}
        </div>

        {/* Video Description */}
        {video.description && (
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground leading-relaxed">
              {video.description}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
