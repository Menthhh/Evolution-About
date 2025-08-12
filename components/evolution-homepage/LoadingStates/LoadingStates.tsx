import React from "react";
import { cn, evolutionClasses } from "@/lib/utils";

interface LoadingCardProps {
  className?: string;
  showImage?: boolean;
  showContent?: boolean;
  lines?: number;
}

interface LoadingDotsProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

interface LoadingSpinnerProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

/**
 * Loading card skeleton for article/video/publication cards
 */
export const LoadingCard: React.FC<LoadingCardProps> = ({
  className,
  showImage = true,
  showContent = true,
  lines = 3,
}) => {
  return (
    <div className={cn(evolutionClasses.card.enhanced, className)}>
      {showImage && <div className="aspect-video evolution-skeleton" />}
      {showContent && (
        <div className={evolutionClasses.card.content}>
          <div className="space-y-2">
            {Array.from({ length: lines }).map((_, i) => (
              <div
                key={i}
                className={cn(
                  "evolution-skeleton h-4",
                  i === lines - 1 ? "w-3/4" : "w-full"
                )}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

/**
 * Animated loading dots
 */
export const LoadingDots: React.FC<LoadingDotsProps> = ({
  className,
  size = "md",
}) => {
  const sizeClasses = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg",
  };

  return (
    <span
      className={cn("evolution-loading-dots", sizeClasses[size], className)}
    >
      Loading
    </span>
  );
};

/**
 * Spinning loader
 */
export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  className,
  size = "md",
}) => {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-6 h-6",
    lg: "w-8 h-8",
  };

  return (
    <div
      className={cn(
        "animate-spin rounded-full border-2 border-muted border-t-accent",
        sizeClasses[size],
        className
      )}
    />
  );
};

/**
 * Loading grid for multiple cards
 */
export const LoadingGrid: React.FC<{
  count?: number;
  gridClass?: string;
  cardProps?: LoadingCardProps;
}> = ({
  count = 3,
  gridClass = evolutionClasses.grid.articles,
  cardProps = {},
}) => {
  return (
    <div className={gridClass}>
      {Array.from({ length: count }).map((_, i) => (
        <LoadingCard
          key={i}
          className={`animation-delay-${i * 100}`}
          {...cardProps}
        />
      ))}
    </div>
  );
};

const LoadingStates = {
  LoadingCard,
  LoadingDots,
  LoadingSpinner,
  LoadingGrid,
};

export default LoadingStates;
