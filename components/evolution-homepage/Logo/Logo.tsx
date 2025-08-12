import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { LogoProps } from "@/types/evolution-homepage";

/**
 * Logo component with Evolution About branding and DNA helix imagery
 * Requirements: 1.1 - Evolution About logo and DNA helix imagery
 */
const Logo: React.FC<LogoProps> = ({ src, alt, size = "medium" }) => {
  // Size variants using Tailwind utilities
  const sizeClasses = {
    small: {
      container: "gap-2",
      icon: "w-6 h-6",
      text: "text-lg",
      image: { width: 24, height: 24 },
    },
    medium: {
      container: "gap-3",
      icon: "w-8 h-8",
      text: "text-xl",
      image: { width: 32, height: 32 },
    },
    large: {
      container: "gap-4",
      icon: "w-10 h-10",
      text: "text-2xl",
      image: { width: 40, height: 40 },
    },
  };

  const currentSize = sizeClasses[size];

  return (
    <div
      className={cn(
        "flex items-center transition-all duration-300 hover:scale-105 cursor-pointer group",
        currentSize.container
      )}
    >
      {src ? (
        // Custom logo image
        <div className="relative overflow-hidden rounded-full">
          <Image
            src={src}
            alt={alt}
            width={currentSize.image.width}
            height={currentSize.image.height}
            className={cn(
              "transition-transform duration-300 group-hover:rotate-12",
              `h-${currentSize.icon.split("-")[1]} w-auto`
            )}
            priority
          />
        </div>
      ) : (
        // DNA helix icon with responsive sizing and hover effects
        <div
          className={cn(
            "bg-gradient-to-br from-accent to-accent/80 rounded-full flex items-center justify-center transition-all duration-300 group-hover:shadow-lg group-hover:shadow-accent/25 group-hover:rotate-12",
            currentSize.icon
          )}
        >
          {/* DNA helix SVG icon */}
          <svg
            className="w-1/2 h-1/2 text-accent-foreground transition-transform duration-300 group-hover:scale-110"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {/* DNA double helix representation */}
            <path d="M12 2C8 2 5 5 5 9s3 7 7 7 7-3 7-7-3-7-7-7z" />
            <path d="M12 16c-4 0-7 3-7 7s3 7 7 7 7-3 7-7-3-7-7-7z" />
            <path d="M5 9h14" />
            <path d="M5 15h14" />
            <circle cx="12" cy="9" r="1" />
            <circle cx="12" cy="15" r="1" />
          </svg>
        </div>
      )}

      {/* Evolution About text with hover effects */}
      <span
        className={cn(
          "font-bold text-foreground transition-all duration-300 group-hover:text-accent",
          currentSize.text
        )}
      >
        Evolution About
      </span>
    </div>
  );
};

export default Logo;
