import React from "react";
import { cn, evolutionClasses } from "@/lib/utils";
import { VideoSectionProps } from "@/types/evolution-homepage";
import { VideoCard } from "../VideoCard";

/**
 * VideoSection component for displaying multiple video cards in a responsive grid
 * Requirements: 3.1, 3.4, 6.1 - Video section layout, responsive grid, proper spacing
 */
export const VideoSection: React.FC<VideoSectionProps> = ({
  videos,
  title,
  layout = "grid",
}) => {
  const gridClasses =
    layout === "grid" ? evolutionClasses.grid.videos : "flex flex-col gap-4";

  return (
    <section
      className={cn(
        evolutionClasses.container,
        evolutionClasses.spacing.section
      )}
    >
      {/* Section Title - responsive spacing */}
      <div className={evolutionClasses.spacing.elementSmall}>
        <h2 className={evolutionClasses.heading.h2}>{title}</h2>
      </div>

      {/* Video Grid - responsive layout */}
      <div className={cn(gridClasses, evolutionClasses.animation.fadeIn)}>
        {videos.map((video) => (
          <VideoCard key={video.id} video={video} />
        ))}
      </div>

      {/* Empty State - responsive text sizing */}
      {videos.length === 0 && (
        <div className="text-center py-8 sm:py-12">
          <p className="text-muted-foreground text-base sm:text-lg">
            ไม่มีวิดีโอในขณะนี้
          </p>
        </div>
      )}
    </section>
  );
};

export default VideoSection;
