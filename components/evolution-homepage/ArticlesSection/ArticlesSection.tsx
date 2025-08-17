"use client";

import React from "react";
import { ArticlesSectionProps } from "@/types/evolution-homepage";
import { ArticleCard } from "@/components/evolution-homepage/ArticleCard/ArticleCard";
import { cn, evolutionClasses } from "@/lib/utils";

/**
 * ArticlesSection Component
 *
 * Displays articles in a responsive 3-column grid layout with proper Thai typography.
 * Implements responsive behavior that adapts from 1 column on mobile to 3 columns on desktop.
 *
 * Requirements:
 * - 2.1: Articles displayed in 3-column grid layout
 * - 2.4: Consistent card styling with proper spacing
 * - 7.2: Responsive grid that adapts to screen size
 */
export function ArticlesSection({
  articles,
  title = "บทความ",
}: ArticlesSectionProps) {
  return (
    <section
      className={cn(
        // Section spacing
        evolutionClasses.spacing.section,
        // Content stack spacing
        "space-y-6"
      )}
      aria-labelledby="articles-section-title"
    >
      {/* Section Title with proper Thai typography */}
      <header>
        <h2
          id="articles-section-title"
          className={cn(
            // Responsive heading styles
            evolutionClasses.heading.h2,
            // Additional spacing and styling for section titles
            "mb-6",
            // Thai font support
            "font-thai-safe"
          )}
        >
          {title}
        </h2>
      </header>

      {/* Articles Grid Container */}
      <div
        className={cn(
          // Mobile-first responsive grid with improved breakpoints
          "grid grid-cols-1",
          // Small screens: 1 column, Medium: 2 columns, Large: 3 columns
          "sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
          // Responsive gap spacing optimized for mobile
          "gap-3 sm:gap-4 md:gap-5 lg:gap-6",
          // Ensure proper alignment and touch-friendly spacing
          "items-start",
          // Add padding for mobile touch interaction
          "touch-manipulation",
          // Prevent overflow
          "w-full min-w-0"
        )}
        role="list"
        aria-label="Articles list"
      >
        {articles.map((article) => (
          <div
            key={article.id}
            role="listitem"
            className={cn(
              // Ensure consistent card heights in grid
              "h-full",
              // Animation for loading
              evolutionClasses.animation.fadeIn
            )}
          >
            <ArticleCard article={article} />
          </div>
        ))}
      </div>

      {/* Empty state */}
      {articles.length === 0 && (
        <div
          className={cn("text-center py-12", "text-muted-foreground")}
          role="status"
          aria-live="polite"
        >
          <p className="text-lg">ไม่มีบทความในขณะนี้</p>
          <p className="text-sm mt-2">กรุณาลองใหม่อีกครั้งในภายหลัง</p>
        </div>
      )}
    </section>
  );
}

export default ArticlesSection;
