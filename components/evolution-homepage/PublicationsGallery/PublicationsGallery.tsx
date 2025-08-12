import React from "react";
import { cn, evolutionClasses } from "@/lib/utils";
import { PublicationsGalleryProps } from "@/types/evolution-homepage";
import PublicationCard from "../PublicationCard/PublicationCard";

/**
 * PublicationsGallery component for displaying multiple publication cards
 * Requirements: 4.1, 4.4, 6.1 - Grid layout with responsive columns and proper spacing
 */
const PublicationsGallery: React.FC<PublicationsGalleryProps> = ({
  publications,
  columns = 3,
}) => {
  // Generate responsive grid classes based on columns prop
  const getGridClasses = (cols: number) => {
    const gridMap = {
      2: "grid-cols-2 md:grid-cols-2 lg:grid-cols-2",
      3: "grid-cols-2 md:grid-cols-3 lg:grid-cols-3",
      4: "grid-cols-2 md:grid-cols-3 lg:grid-cols-4",
      5: "grid-cols-2 md:grid-cols-3 lg:grid-cols-5",
      6: "grid-cols-2 md:grid-cols-4 lg:grid-cols-6",
    };
    return (
      gridMap[cols as keyof typeof gridMap] ||
      evolutionClasses.grid.publications
    );
  };

  if (!publications || publications.length === 0) {
    return (
      <section className={evolutionClasses.layout.contentStack}>
        <h2 className={evolutionClasses.heading.h2}>สิ่งพิมพ์</h2>
        <div className="text-center py-8 sm:py-12 text-muted-foreground">
          <p className="text-sm sm:text-base">ไม่มีสิ่งพิมพ์ในขณะนี้</p>
        </div>
      </section>
    );
  }

  return (
    <section className={evolutionClasses.layout.contentStack}>
      {/* Section Header - responsive layout */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4">
        <h2 className={evolutionClasses.heading.h2}>สิ่งพิมพ์</h2>
        <div className="text-xs sm:text-sm text-muted-foreground">
          {publications.length} รายการ
        </div>
      </div>

      {/* Publications Grid - responsive spacing and columns */}
      <div
        className={cn(
          "grid gap-3 sm:gap-4 lg:gap-6",
          getGridClasses(columns),
          evolutionClasses.animation.fadeIn
        )}
      >
        {publications.map((publication, index) => (
          <div
            key={publication.id}
            className={cn(
              evolutionClasses.animation.slideUp,
              "animation-delay-" + (index % 6) // Stagger animation for first 6 items
            )}
            style={{
              animationDelay: `${(index % 6) * 100}ms`,
            }}
          >
            <PublicationCard publication={publication} />
          </div>
        ))}
      </div>

      {/* Evolution About branding footer - responsive spacing */}
      <div className="text-center pt-4 sm:pt-6 border-t border-border">
        <p className="text-xs sm:text-sm text-muted-foreground">
          สิ่งพิมพ์ทั้งหมดจาก{" "}
          <span className="text-accent font-medium">Evolution About</span>
        </p>
      </div>
    </section>
  );
};

export default PublicationsGallery;
