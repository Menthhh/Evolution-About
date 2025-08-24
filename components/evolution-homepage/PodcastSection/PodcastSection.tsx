"use client";

import { useState, useRef, useEffect } from "react";
import { PodcastSectionProps } from "@/types/evolution-homepage";
import { PodcastCard } from "./PodcastCard";
import { cn, evolutionClasses } from "@/lib/utils";

/**
 * PodcastSection component for podcast episodes with modern Spotify-style cards
 * Requirements: 6.1, 6.2, 6.3 - Podcast episodes with play functionality
 */
export function PodcastSection({ episodes }: PodcastSectionProps) {
  const [currentPlaying, setCurrentPlaying] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Color variants for different cards
  const colorVariants = ["dark", "brown", "blue", "green", "purple"] as const;

  const handlePlay = (episodeId: string, audioUrl: string) => {
    if (currentPlaying === episodeId) {
      // Pause current episode
      if (audioRef.current) {
        audioRef.current.pause();
        setCurrentPlaying(null);
      }
    } else {
      // Play new episode
      setIsLoading(true);
      setCurrentPlaying(episodeId);

      if (audioRef.current) {
        audioRef.current.src = audioUrl;
        audioRef.current.play().catch((error) => {
          console.error("Error playing audio:", error);
          setCurrentPlaying(null);
          setIsLoading(false);
        });
      }
    }
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleLoadedMetadata = () => {
      setIsLoading(false);
    };

    const handleEnded = () => {
      setCurrentPlaying(null);
    };

    const handleError = () => {
      setCurrentPlaying(null);
      setIsLoading(false);
      console.error("Audio loading error");
    };

    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("ended", handleEnded);
    audio.addEventListener("error", handleError);

    return () => {
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("ended", handleEnded);
      audio.removeEventListener("error", handleError);
    };
  }, []);

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
          const isPlaying = currentPlaying === episode.id;
          const isCurrentLoading = isLoading && currentPlaying === episode.id;
          const colorVariant = colorVariants[index % colorVariants.length];

          return (
            <PodcastCard
              key={episode.id}
              episode={episode}
              isPlaying={isPlaying}
              isLoading={isCurrentLoading}
              onPlay={handlePlay}
              colorVariant={colorVariant}
            />
          );
        })}
      </div>

      {/* Hidden Audio Element */}
      <audio ref={audioRef} preload="none" className="hidden" />
    </section>
  );
}
