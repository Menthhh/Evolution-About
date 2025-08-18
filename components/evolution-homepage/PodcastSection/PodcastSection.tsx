"use client";

import { useState, useRef, useEffect } from "react";
import { Play, Pause, Volume2, Clock } from "lucide-react";
import { PodcastSectionProps } from "@/types/evolution-homepage";
import { cn } from "@/lib/utils";

/**
 * PodcastSection component for podcast episodes with audio playback
 * Requirements: 6.1, 6.2, 6.3 - Podcast episodes with play functionality
 */
export function PodcastSection({ episodes }: PodcastSectionProps) {
  const [currentPlaying, setCurrentPlaying] = useState<string | null>(null);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

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

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const formatDuration = (duration: string) => {
    return duration;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("th-TH", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
      setIsLoading(false);
    };

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const handleEnded = () => {
      setCurrentPlaying(null);
      setCurrentTime(0);
    };

    const handleError = () => {
      setCurrentPlaying(null);
      setIsLoading(false);
      console.error("Audio loading error");
    };

    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("ended", handleEnded);
    audio.addEventListener("error", handleError);

    return () => {
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("ended", handleEnded);
      audio.removeEventListener("error", handleError);
    };
  }, []);

  return (
    <div className="bg-card border border-border rounded-lg p-4">
      <div className="flex items-center gap-2 mb-4">
        <Volume2 className="w-5 h-5 text-primary" />
        <h3 className="text-lg font-semibold text-foreground">พอดแคสต์</h3>
      </div>

      <div className="space-y-3">
        {episodes.map((episode) => {
          const isPlaying = currentPlaying === episode.id;
          const isCurrentLoading = isLoading && currentPlaying === episode.id;

          return (
            <div
              key={episode.id}
              className={cn(
                "p-3 rounded-md border transition-all duration-200",
                isPlaying
                  ? "bg-primary/5 border-primary/20"
                  : "bg-muted/30 border-border hover:bg-muted/50"
              )}
            >
              <div className="flex items-start gap-3">
                {/* Play/Pause Button */}
                <button
                  onClick={() => handlePlay(episode.id, episode.audioUrl)}
                  disabled={isCurrentLoading}
                  className={cn(
                    "flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200",
                    "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
                    isPlaying
                      ? "bg-primary text-primary-foreground hover:bg-primary/90"
                      : "bg-muted text-muted-foreground hover:bg-primary hover:text-primary-foreground",
                    isCurrentLoading && "opacity-50 cursor-not-allowed"
                  )}
                >
                  {isCurrentLoading ? (
                    <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                  ) : isPlaying ? (
                    <Pause className="w-4 h-4" />
                  ) : (
                    <Play className="w-4 h-4 ml-0.5" />
                  )}
                </button>

                {/* Episode Info */}
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-medium text-foreground line-clamp-2 leading-tight">
                    {episode.title}
                  </h4>

                  <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{formatDuration(episode.duration)}</span>
                    </div>
                    <span>•</span>
                    <span>{formatDate(episode.publishDate)}</span>
                  </div>

                  {/* Progress Bar for Currently Playing Episode */}
                  {isPlaying && duration > 0 && (
                    <div className="mt-2">
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span>{formatTime(currentTime)}</span>
                        <div className="flex-1 h-1 bg-muted rounded-full overflow-hidden">
                          <div
                            className="h-full bg-primary transition-all duration-300"
                            style={{
                              width: `${(currentTime / duration) * 100}%`,
                            }}
                          />
                        </div>
                        <span>{formatTime(duration)}</span>
                      </div>
                    </div>
                  )}

                  {/* Episode Description */}
                  {episode.description && (
                    <p className="text-xs text-muted-foreground mt-2 line-clamp-2">
                      {episode.description}
                    </p>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Hidden Audio Element */}
      <audio ref={audioRef} preload="none" className="hidden" />
    </div>
  );
}
