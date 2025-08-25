"use client";

import { useState } from "react";
import { Play, Pause, MoreHorizontal } from "lucide-react";
import { PodcastEpisode } from "@/types/evolution-homepage";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface PodcastCardProps {
  episode: PodcastEpisode;
  isPlaying: boolean;
  isLoading: boolean;
  onPlay: (episodeId: string, audioUrl: string) => void;
  colorVariant?: "dark" | "brown" | "blue" | "green" | "purple";
}

const colorVariants = {
  dark: "bg-gradient-to-r from-slate-700 to-slate-800 text-white border-slate-600/30",
  brown:
    "bg-gradient-to-r from-amber-800 to-amber-900 text-white border-amber-700/30",
  blue: "bg-gradient-to-r from-blue-800 to-blue-900 text-white border-blue-700/30",
  green:
    "bg-gradient-to-r from-emerald-700 to-emerald-800 text-white border-emerald-600/30",
  purple:
    "bg-gradient-to-r from-red-800 to-red-900 text-white border-red-700/30",
};

export function PodcastCard({
  episode,
  isPlaying,
  isLoading,
  onPlay,
  colorVariant = "dark",
}: PodcastCardProps) {
  const [imageError, setImageError] = useState(false);

  const handlePlayClick = () => {
    onPlay(episode.id, episode.audioUrl);
  };

  return (
    <div
      className={cn(
        "relative rounded-xl border transition-all duration-300 hover:shadow-lg hover:-translate-y-1 p-4",
        colorVariants[colorVariant]
      )}
    >
      {/* Spotify Logo */}
      <div className="absolute top-3 right-3 opacity-80">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="#1DB954">
          <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.42 1.56-.299.421-1.02.599-1.559.3z" />
        </svg>
      </div>

      <div className="flex items-center gap-3">
        {/* Episode Cover Art */}
        <div className="flex-shrink-0">
          <div className="w-14 h-14 rounded-lg overflow-hidden bg-black/20">
            {!imageError ? (
              <Image
                src={episode.coverImage || "/images/podcasts/default-cover.svg"}
                alt={episode.title}
                width={56}
                height={56}
                className="w-full h-full object-cover"
                onError={() => setImageError(true)}
              />
            ) : (
              <div className="w-full h-full bg-black/30 flex items-center justify-center">
                <div className="text-xs font-bold text-white/70">EA</div>
              </div>
            )}
          </div>
        </div>

        {/* Episode Info */}
        <div className="flex-1 min-w-0">
          <h3 className="font-medium text-sm leading-tight mb-1 line-clamp-2 text-white">
            {episode.title}
          </h3>
          <p className="text-xs text-white/70 mb-2">
            May 23 · EVOLUTION-ABOUT (PODCAST)
          </p>

          {/* Save on Spotify Button */}
          <button className="flex items-center gap-1.5 text-xs text-white/80 hover:text-white transition-colors">
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.29 1.51 4.04 3 5.5l7 7Z" />
            </svg>
            Save on Spotify
          </button>
        </div>
      </div>

      {/* Progress Bar at Bottom */}
      <div className="mt-3 flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-white/30"></div>
        <div className="flex-1 h-1 bg-white/20 rounded-full">
          <div
            className="h-full bg-white/40 rounded-full"
            style={{ width: "0%" }}
          ></div>
        </div>
        <div className="w-2 h-2 rounded-full bg-white/30"></div>

        {/* Right Side Controls */}
        <div className="flex items-center gap-2">
          {/* Duration */}
          <div className="text-xs text-white/70">{episode.duration}</div>

          {/* More Options */}
          <button className="p-1 hover:bg-white/10 rounded transition-colors">
            <MoreHorizontal className="w-4 h-4 text-white/70" />
          </button>

          {/* Play Button */}
          <button
            onClick={handlePlayClick}
            disabled={isLoading}
            className={cn(
              "w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200",
              "bg-green-500 hover:bg-green-400 text-black hover:scale-105",
              "focus:outline-none focus:ring-2 focus:ring-green-400",
              isLoading && "opacity-50 cursor-not-allowed"
            )}
          >
            {isLoading ? (
              <div className="w-3 h-3 border-2 border-black border-t-transparent rounded-full animate-spin" />
            ) : isPlaying ? (
              <Pause className="w-4 h-4" />
            ) : (
              <Play className="w-4 h-4 ml-0.5" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
