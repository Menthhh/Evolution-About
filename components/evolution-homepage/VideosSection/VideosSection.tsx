"use client";

import React from "react";
import { VideosSectionProps } from "@/types/evolution-homepage";
import { FeaturedVideo } from "../FeaturedVideo";
import { VideoThumbnails } from "../VideoThumbnails";

/**
 * VideosSection Component
 *
 * Container component for the videos section with featured video at top and thumbnails below.
 * Implements responsive layout structure for different screen sizes.
 *
 * Requirements:
 * - 3.1: Display large embedded YouTube video at top of section
 * - 3.2: Show video title, description, and proper aspect ratio
 * - 7.2: Responsive behavior for video section on different screen sizes
 */
export function VideosSection({
  featuredVideo,
  videos,
  title = "วิดีโอ",
}: VideosSectionProps) {
  return (
    <section className="space-y-6 w-full min-w-0 overflow-hidden">
      {/* Section Title */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-foreground">{title}</h2>
      </div>

      {/* Featured Video Container */}
      <div className="space-y-4">
        <FeaturedVideo video={featuredVideo} />
      </div>

      {/* Video Thumbnails Container */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-foreground">วิดีโออื่นๆ</h3>
        <VideoThumbnails videos={videos} />
      </div>
    </section>
  );
}
