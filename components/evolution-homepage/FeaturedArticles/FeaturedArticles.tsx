import React from "react";
import { cn, evolutionClasses } from "@/lib/utils";
import { FeaturedArticlesProps } from "@/types/evolution-homepage";
import { ArticleCard } from "../ArticleCard";

/**
 * FeaturedArticles container component for displaying a grid of featured articles
 * Requirements: 2.1, 2.4, 6.1 - Grid of featured articles with responsive layout
 */
export const FeaturedArticles: React.FC<FeaturedArticlesProps> = ({
  articles,
  maxItems = 3,
}) => {
  // Limit articles to maxItems
  const displayedArticles = articles.slice(0, maxItems);

  return (
    <section className={evolutionClasses.spacing.section}>
      {/* Section Header - responsive spacing and typography */}
      <div
        className={cn(
          evolutionClasses.container,
          evolutionClasses.spacing.elementSmall
        )}
      >
        <h2 className={evolutionClasses.heading.h2}>บทความเด่น</h2>
        <p className="text-muted-foreground mt-1 sm:mt-2 text-sm sm:text-base">
          ค้นพบบทความล่าสุดเกี่ยวกับวิวัฒนาการและวิทยาศาสตร์
        </p>
      </div>

      {/* Articles Grid - responsive container and grid */}
      <div className={evolutionClasses.container}>
        <div
          className={cn(
            evolutionClasses.grid.articles,
            evolutionClasses.animation.fadeIn
          )}
        >
          {displayedArticles.map((article, index) => (
            <div
              key={article.id}
              className={cn(
                evolutionClasses.animation.slideUp,
                `animation-delay-${index * 100}`
              )}
            >
              <ArticleCard article={article} size="medium" />
            </div>
          ))}
        </div>

        {/* Show more articles link - responsive button */}
        {articles.length > maxItems && (
          <div className="text-center mt-6 sm:mt-8">
            <button
              className={cn(
                evolutionClasses.button.secondary,
                evolutionClasses.interactive.button,
                evolutionClasses.interactive.glow,
                "inline-flex items-center gap-2 text-sm sm:text-base"
              )}
            >
              <span className="hidden sm:inline">ดูบทความทั้งหมด</span>
              <span className="sm:hidden">ดูทั้งหมด</span>
              <span className="text-xs sm:text-sm">
                ({articles.length} บทความ)
              </span>
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedArticles;
