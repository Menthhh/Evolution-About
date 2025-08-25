"use client";

import Link from "next/link";
import { PodcastSectionProps } from "@/types/evolution-homepage";
import { PodcastCard } from "./PodcastCard";
import { cn, evolutionClasses } from "@/lib/utils";

/**
 * PodcastSection component for podcast episodes with modern Spotify-style cards
 * Requirements: 6.1, 6.2, 6.3 - Podcast episodes with navigation to individual pages
 */
export function PodcastSection({ episodes }: PodcastSectionProps) {
  // Color variants for different cards
  const colorVariants = ["dark", "brown", "blue", "green", "purple"] as const;

  const handlePlay = (episodeId: string) => {
    // Navigate to podcast detail page instead of playing
    window.location.href = `/podcasts/${episodeId}`;
  };

  return (
    <section
      className={cn(
        // Section spacing consistent with other sections
        evolutionClasses.spacing.section,
        // Content stack spacing
        "space-y-6"
      )}
      aria-labelledby="podcast-section-title"
    >
      {/* Section Title with consistent typography */}
      <header>
        <h2
          id="podcast-section-title"
          className={cn(
            // Responsive heading styles matching other sections
            evolutionClasses.heading.h2,
            // Additional spacing for section titles
            "mb-6"
          )}
        >
          พอดแคสต์
        </h2>
      </header>

      {/* Podcast Cards */}
      <div className="space-y-4">
        {episodes.map((episode, index) => {
          const colorVariant = colorVariants[index % colorVariants.length];

          return (
            <div key={episode.id} className="mb-6">
              <Link href={`/podcasts/${episode.id}`}>
                <div className="cursor-pointer">
                  <PodcastCard
                    episode={episode}
                    isPlaying={false}
                    isLoading={false}
                    onPlay={handlePlay}
                    colorVariant={colorVariant}
                  />
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </section>
  );
}
