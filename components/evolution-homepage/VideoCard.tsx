import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Play, Eye, Clock } from "lucide-react";
import { Video } from "@/types/evolution-homepage";

interface VideoCardProps {
  video: Video;
}

export function VideoCard({ video }: VideoCardProps) {
  return (
    <Link href={`/videos/${video.youtubeId}`} className="group">
      <div className="bg-gray-800/60 backdrop-blur-sm rounded-lg overflow-hidden border border-gray-600/40 hover:border-yellow-400/50 transition-all duration-300 hover:bg-gray-800/80 hover:shadow-lg hover:-translate-y-1">
        {/* Video Thumbnail */}
        <div className="relative aspect-video">
          <Image
            src={video.thumbnail}
            alt={video.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />

          {/* Play Button */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-12 h-12 bg-black/60 rounded-full flex items-center justify-center group-hover:bg-black/80 group-hover:scale-110 transition-all duration-300">
              <Play className="w-5 h-5 text-white ml-0.5" />
            </div>
          </div>

          {/* Duration Badge */}
          <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
            {video.duration}
          </div>
        </div>

        {/* Video Info */}
        <div className="p-4">
          <h3 className="text-white font-medium text-sm md:text-base line-clamp-2 group-hover:text-yellow-400 transition-colors leading-tight mb-3">
            {video.title}
          </h3>

          {/* Video Stats */}
          <div className="flex items-center justify-between text-gray-400 text-xs">
            {video.views && (
              <div className="flex items-center space-x-1">
                <Eye className="w-3 h-3" />
                <span>{video.views.toLocaleString()}</span>
              </div>
            )}
            <div className="flex items-center space-x-1">
              <Clock className="w-3 h-3" />
              <span>{video.duration}</span>
            </div>
          </div>

          {/* Description */}
          {video.description && (
            <p className="text-gray-400 text-xs mt-2 line-clamp-2 leading-relaxed">
              {video.description}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
}

export default VideoCard;
