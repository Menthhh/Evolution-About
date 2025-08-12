"use client";

import React from "react";
import Image from "next/image";
import { Play, Eye, Clock } from "lucide-react";
import { cn, evolutionClasses } from "@/lib/utils";
import { VideoCardProps } from "@/types/evolution-homepage";

/**
 * VideoCard component for displaying individual video content
 * Requirements: 3.1, 3.2, 3.3 - Video thumbnails with play button, proper aspect ratio, Thai text support
 */
export const VideoCard: React.FC<VideoCardProps> = ({ video }) => {
  const handleVideoClick = () => {
    // Open YouTube video in new tab or handle video playback
    const youtubeUrl = `https://www.youtube.com/watch?v=${video.youtubeId}`;
    window.open(youtubeUrl, "_blank");
  };

  return (
    <div
      className={cn(
        evolutionClasses.card.enhanced,
        evolutionClasses.interactive.card,
        evolutionClasses.interactive.glow,
        "cursor-pointer group"
      )}
      onClick={handleVideoClick}
    >
      {/* Video Thumbnail with Play Button Overlay */}
      <div className="relative aspect-video bg-muted">
        <Image
          src={video.thumbnail}
          alt={video.title}
          fill
          className={cn("object-cover", evolutionClasses.interactive.image)}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />

        {/* Enhanced Play Button Overlay */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-colors">
          <div
            className={cn(
              "bg-white/90 hover:bg-white rounded-full p-2 sm:p-3 lg:p-4 touch-manipulation",
              evolutionClasses.interactive.button,
              "hover:shadow-lg hover:shadow-accent/20"
            )}
          >
            <Play className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 text-black fill-black" />
          </div>
        </div>

        {/* Duration Badge - responsive positioning and sizing */}
        <div className="absolute bottom-1 right-1 sm:bottom-2 sm:right-2 bg-black/80 text-white text-xs px-1.5 py-0.5 sm:px-2 sm:py-1 rounded flex items-center gap-1">
          <Clock className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
          <span className="text-xs">{video.duration}</span>
        </div>
      </div>

      {/* Video Content */}
      <div className={evolutionClasses.card.content}>
        {/* Video Title with Thai text support - responsive sizing */}
        <h3
          className={cn(
            "text-sm sm:text-base lg:text-lg font-medium text-foreground",
            "mb-1 sm:mb-2 line-clamp-2 leading-tight",
            evolutionClasses.interactive.link
          )}
        >
          {video.title}
        </h3>

        {/* Video Description - responsive visibility and sizing */}
        {video.description && (
          <p className="text-muted-foreground text-xs sm:text-sm mb-2 sm:mb-3 line-clamp-1 sm:line-clamp-2">
            {video.description}
          </p>
        )}

        {/* Video Stats - responsive sizing */}
        {video.views && (
          <div className="flex items-center gap-3 sm:gap-4 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <Eye className="w-3 h-3" />
              <span className="hidden sm:inline">
                {video.views.toLocaleString()} views
              </span>
              <span className="sm:hidden">
                {video.views > 1000
                  ? `${Math.floor(video.views / 1000)}k`
                  : video.views}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoCard;
