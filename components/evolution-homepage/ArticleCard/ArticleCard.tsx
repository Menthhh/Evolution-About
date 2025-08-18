import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, MessageCircle, Clock } from "lucide-react";
import { cn, evolutionClasses } from "@/lib/utils";
import { ArticleCardProps } from "@/types/evolution-homepage";

/**
 * ArticleCard component for displaying individual articles in grid layout
 * Requirements: 2.1, 2.2, 2.3 - Article cards with thumbnails, titles, author info, and engagement metrics
 * Updated for 3-column grid display with consistent heights and responsive behavior
 */
export const ArticleCard: React.FC<ArticleCardProps> = ({ article }) => {
  return (
    <Link href={article.href} className="block h-full">
      <article
        className={cn(
          // Base card styling with enhanced hover effects
          evolutionClasses.card.enhanced,
          // Interactive states with transform and shadow transitions
          "transition-all duration-300 ease-out",
          "hover:shadow-lg hover:-translate-y-1 hover:scale-[1.02]",
          "hover:border-accent/50",
          // Full height for consistent grid layout
          "h-full flex flex-col",
          // Group for child element hover states
          "group cursor-pointer",
          // Responsive width - full width in grid
          "w-full"
        )}
      >
        {/* Article Thumbnail - consistent aspect ratio for grid */}
        <div className="relative overflow-hidden aspect-[16/10] rounded-t-lg">
          <Image
            src={article.thumbnail}
            alt={article.title}
            fill
            className={cn(
              "object-cover",
              // Enhanced hover effect with smooth scaling
              "transition-transform duration-300 ease-out",
              "group-hover:scale-110"
            )}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            priority={false}
          />
          {/* Read time overlay - improved positioning and styling */}
          {article.readTime && (
            <div className="absolute top-3 right-3 bg-black/80 backdrop-blur-sm text-white text-xs px-2.5 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg">
              <Clock className="w-3 h-3" />
              <span className="font-medium">{article.readTime}</span>
            </div>
          )}
          {/* Gradient overlay for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        {/* Article Content - flex-1 to fill remaining space */}
        <div
          className={cn(evolutionClasses.card.content, "flex-1 flex flex-col")}
        >
          {/* Article Title - optimized for grid display */}
          <h3
            className={cn(
              // Responsive text sizing optimized for 3-column grid
              "text-sm sm:text-base lg:text-lg font-semibold text-foreground",
              // Consistent line clamping for uniform card heights
              "mb-3 line-clamp-2 leading-snug",
              // Enhanced hover effect
              "group-hover:text-accent transition-colors duration-300",
              // Thai font support
              "font-thai-safe"
            )}
          >
            {article.title}
          </h3>

          {/* Article Excerpt - responsive visibility and consistent height */}
          {article.excerpt && (
            <p className="text-muted-foreground text-xs sm:text-sm mb-4 line-clamp-3 leading-relaxed flex-1">
              {article.excerpt}
            </p>
          )}

          {/* Spacer to push footer content to bottom */}
          <div className="flex-1" />

          {/* Author and Date - compact layout for grid */}
          <div className="flex flex-col gap-2 mb-3">
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span className="font-medium truncate pr-2">
                {article.author}
              </span>
              <time
                dateTime={article.publishDate}
                className="text-xs whitespace-nowrap"
                title={new Date(article.publishDate).toLocaleDateString(
                  "th-TH",
                  {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  }
                )}
              >
                {new Date(article.publishDate).toLocaleDateString("th-TH", {
                  month: "short",
                  day: "numeric",
                })}
              </time>
            </div>
          </div>

          {/* Engagement Metrics - compact layout for grid */}
          <div className="flex items-center justify-between pt-3 border-t border-border/50">
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <div
                className={cn(
                  "flex items-center gap-1.5 touch-manipulation cursor-pointer",
                  "transition-all duration-200 hover:text-red-500 hover:scale-105"
                )}
              >
                <Heart className="w-3.5 h-3.5" />
                <span className="font-medium">
                  {article.likes.toLocaleString()}
                </span>
              </div>
              <div
                className={cn(
                  "flex items-center gap-1.5 touch-manipulation cursor-pointer",
                  "transition-all duration-200 hover:text-blue-500 hover:scale-105"
                )}
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span className="font-medium">
                  {article.comments.toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
};

export default ArticleCard;
