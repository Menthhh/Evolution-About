"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  Calendar,
  Clock,
  ArrowLeft,
} from "lucide-react";
import { PodcastEpisode } from "@/types/evolution-homepage";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Navigation from "../Navigation";
import { PodcastCard } from "../PodcastSection";

interface PodcastDetailPageProps {
  episode: PodcastEpisode;
  allEpisodes: PodcastEpisode[];
}

const navigationItems = [
  {
    id: "home",
    label: "หน้าแรก",
    href: "/evolution-homepage",
    isActive: false,
  },
  {
    id: "articles",
    label: "บทความ",
    href: "/articles",
    isActive: false,
  },
  { id: "podcasts", label: "พอดแคสต์", href: "/podcasts", isActive: true },
  { id: "videos", label: "วิดีโอ", href: "/videos", isActive: false },
  {
    id: "publications",
    label: "หนังสือ",
    href: "/publications",
    isActive: false,
  },
];

export function PodcastDetailPage({
  episode,
  allEpisodes,
}: PodcastDetailPageProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [imageError, setImageError] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Get related episodes (exclude current episode)
  const relatedEpisodes = allEpisodes
    .filter((ep) => ep.id !== episode.id)
    .slice(0, 3);

  const handlePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        setIsLoading(true);
        audioRef.current.play().catch((error) => {
          console.error("Error playing audio:", error);
          setIsLoading(false);
        });
      }
    }
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (audioRef.current && duration > 0) {
      const rect = e.currentTarget.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const newTime = (clickX / rect.width) * duration;
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("th-TH", {
      year: "numeric",
      month: "long",
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

    const handlePlay = () => {
      setIsPlaying(true);
      setIsLoading(false);
    };

    const handlePause = () => {
      setIsPlaying(false);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
    };

    const handleError = () => {
      setIsPlaying(false);
      setIsLoading(false);
      console.error("Audio loading error");
    };

    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);
    audio.addEventListener("ended", handleEnded);
    audio.addEventListener("error", handleError);

    return () => {
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
      audio.removeEventListener("ended", handleEnded);
      audio.removeEventListener("error", handleError);
    };
  }, []);

  const colorVariants = ["dark", "brown", "blue", "green", "purple"] as const;

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-fixed"
      style={{
        backgroundImage: "url('/images/background-cover.jpg')",
      }}
    >
      <div className="min-h-screen bg-black/60">
        {/* Navigation */}
        <Navigation items={navigationItems} activeItem="podcasts" />

        {/* Main Content */}
        <main className="px-4 sm:px-6 lg:px-8 py-8">
          <div className="max-w-4xl mx-auto">
            {/* Back Button */}
            <div className="mb-6">
              <Link href="/podcasts">
                <Button
                  variant="outline"
                  className="bg-gray-800/80 border-gray-600 text-white hover:bg-gray-700"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  กลับไปหน้าพอดแคสต์
                </Button>
              </Link>
            </div>

            {/* Episode Header */}
            <div className="bg-gradient-to-r from-slate-800 to-slate-900 rounded-2xl p-8 mb-8 text-white">
              <div className="flex flex-col lg:flex-row gap-8">
                {/* Episode Cover */}
                <div className="flex-shrink-0">
                  <div className="w-48 h-48 rounded-xl overflow-hidden bg-black/20 shadow-2xl">
                    {!imageError ? (
                      <Image
                        src={
                          episode.coverImage ||
                          "/images/podcasts/default-cover.svg"
                        }
                        alt={episode.title}
                        width={192}
                        height={192}
                        className="w-full h-full object-cover"
                        onError={() => setImageError(true)}
                      />
                    ) : (
                      <div className="w-full h-full bg-black/30 flex items-center justify-center">
                        <div className="text-2xl font-bold text-white/70">
                          EA
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Episode Info */}
                <div className="flex-1">
                  <div className="mb-4">
                    <span className="inline-block px-3 py-1 bg-green-500 text-black text-sm font-medium rounded-full mb-4">
                      EVOLUTION-ABOUT PODCAST
                    </span>
                  </div>

                  <h1 className="text-2xl lg:text-3xl font-bold mb-4 leading-tight">
                    {episode.title}
                  </h1>

                  <div className="flex flex-wrap items-center gap-4 text-white/70 mb-6">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>{formatDate(episode.publishDate)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span>{episode.duration}</span>
                    </div>
                  </div>

                  {episode.description && (
                    <p className="text-white/80 leading-relaxed mb-6">
                      {episode.description}
                    </p>
                  )}

                  {/* Audio Player Controls */}
                  <div className="space-y-4">
                    {/* Play Button */}
                    <div className="flex items-center gap-4">
                      <button
                        onClick={handlePlay}
                        disabled={isLoading}
                        className={cn(
                          "w-16 h-16 rounded-full flex items-center justify-center transition-all duration-200",
                          "bg-green-500 hover:bg-green-400 text-black hover:scale-105",
                          "focus:outline-none focus:ring-2 focus:ring-green-400",
                          isLoading && "opacity-50 cursor-not-allowed"
                        )}
                      >
                        {isLoading ? (
                          <div className="w-6 h-6 border-2 border-black border-t-transparent rounded-full animate-spin" />
                        ) : isPlaying ? (
                          <Pause className="w-8 h-8" />
                        ) : (
                          <Play className="w-8 h-8 ml-1" />
                        )}
                      </button>

                      <div className="flex items-center gap-2">
                        <button className="p-2 hover:bg-white/10 rounded-full transition-colors">
                          <SkipBack className="w-5 h-5" />
                        </button>
                        <button className="p-2 hover:bg-white/10 rounded-full transition-colors">
                          <SkipForward className="w-5 h-5" />
                        </button>
                        <button className="p-2 hover:bg-white/10 rounded-full transition-colors">
                          <Volume2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="space-y-2">
                      <div
                        className="h-2 bg-white/20 rounded-full cursor-pointer"
                        onClick={handleSeek}
                      >
                        <div
                          className="h-full bg-green-500 rounded-full transition-all duration-300"
                          style={{
                            width:
                              duration > 0
                                ? `${(currentTime / duration) * 100}%`
                                : "0%",
                          }}
                        />
                      </div>
                      <div className="flex justify-between text-sm text-white/70">
                        <span>{formatTime(currentTime)}</span>
                        <span>{formatTime(duration)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Related Episodes */}
            {relatedEpisodes.length > 0 && (
              <div className="mt-12">
                <h2 className="text-2xl font-bold text-white mb-8">
                  ตอนอื่นๆ ที่น่าสนใจ
                </h2>
                <div className="space-y-8">
                  {relatedEpisodes.map((relatedEpisode, index) => {
                    const colorVariant =
                      colorVariants[index % colorVariants.length];
                    return (
                      <div key={relatedEpisode.id} className="mb-8">
                        <Link href={`/podcasts/${relatedEpisode.id}`}>
                          <div className="cursor-pointer">
                            <PodcastCard
                              episode={relatedEpisode}
                              isPlaying={false}
                              isLoading={false}
                              onPlay={() => {}}
                              colorVariant={colorVariant}
                            />
                          </div>
                        </Link>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </main>

        {/* Hidden Audio Element */}
        <audio
          ref={audioRef}
          src={episode.audioUrl}
          preload="metadata"
          className="hidden"
        />
      </div>
    </div>
  );
}
