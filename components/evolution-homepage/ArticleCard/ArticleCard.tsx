import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, MessageCircle, Clock } from "lucide-react";
import { cn, evolutionClasses } from "@/lib/utils";
import { ArticleCardProps } from "@/types/evolution-homepage";

/**
 * ArticleCard component for displaying individual articles
 * Requirements: 2.1, 2.2, 2.3 - Article cards with thumbnails, titles, author info, and engagement metrics
 */
export const ArticleCard: React.FC<ArticleCardProps> = ({
  article,
  size = "medium",
}) => {
  const sizeClasses = {
    small: "w-full max-w-sm",
    medium: "w-full max-w-md",
    large: "w-full max-w-lg",
  };

  return (
    <Link href={article.href} className="block">
      <article
        className={cn(
          evolutionClasses.card.enhanced,
          evolutionClasses.interactive.card,
          sizeClasses[size],
          "group cursor-pointer"
        )}
      >
        {/* Article Thumbnail - responsive aspect ratio */}
        <div className="relative overflow-hidden aspect-[4/3] sm:aspect-video">
          <Image
            src={article.thumbnail}
            alt={article.title}
            fill
            className={cn("object-cover", evolutionClasses.interactive.image)}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            priority={false}
          />
          {/* Read time overlay - responsive sizing */}
          {article.readTime && (
            <div className="absolute top-2 right-2 sm:top-3 sm:right-3 bg-black/70 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
              <Clock className="w-3 h-3" />
              <span className="hidden sm:inline">{article.readTime}</span>
              <span className="sm:hidden">
                {article.readTime.replace(" นาที", "m")}
              </span>
            </div>
          )}
        </div>

        {/* Article Content */}
        <div className={evolutionClasses.card.content}>
          {/* Article Title - responsive text sizing */}
          <h3
            className={cn(
              "text-base sm:text-lg lg:text-xl font-medium text-foreground",
              "mb-2 line-clamp-2 leading-tight",
              evolutionClasses.interactive.link
            )}
          >
            {article.title}
          </h3>

          {/* Article Excerpt - responsive visibility and sizing */}
          {article.excerpt && (
            <p className="text-muted-foreground text-xs sm:text-sm mb-2 sm:mb-3 line-clamp-2 sm:line-clamp-3">
              {article.excerpt}
            </p>
          )}

          {/* Author and Date - responsive layout */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-xs sm:text-sm text-muted-foreground mb-2 sm:mb-3 gap-1 sm:gap-0">
            <span className="font-medium truncate">{article.author}</span>
            <time dateTime={article.publishDate} className="text-xs sm:text-sm">
              {new Date(article.publishDate).toLocaleDateString("th-TH", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </time>
          </div>

          {/* Engagement Metrics - responsive sizing and spacing */}
          <div className="flex items-center gap-3 sm:gap-4 text-xs sm:text-sm text-muted-foreground">
            <div
              className={cn(
                "flex items-center gap-1 touch-manipulation cursor-pointer",
                evolutionClasses.interactive.button,
                "hover:text-red-500"
              )}
            >
              <Heart className="w-3 h-3 sm:w-4 sm:h-4" />
              <span>{article.likes.toLocaleString()}</span>
            </div>
            <div
              className={cn(
                "flex items-center gap-1 touch-manipulation cursor-pointer",
                evolutionClasses.interactive.button,
                "hover:text-blue-500"
              )}
            >
              <MessageCircle className="w-3 h-3 sm:w-4 sm:h-4" />
              <span>{article.comments.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
};

export default ArticleCard;
