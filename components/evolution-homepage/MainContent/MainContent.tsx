"use client";

import React from "react";
import { MainContentProps } from "@/types/evolution-homepage";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";

/**
 * MainContent Component
 *
 * Left column container for primary content sections (articles, videos, books).
 * Provides proper spacing, section dividers, and consistent typography for main content area.
 *
 * Requirements:
 * - 1.1: Main content area (approximately 70% width on desktop)
 * - 1.3: Proper spacing between content sections
 * - 7.3: Responsive behavior for main content area
 */
export function MainContent({ children }: MainContentProps) {
  // Convert children to array to add separators between sections
  const childrenArray = React.Children.toArray(children);

  return (
    <div
      className={cn(
        // Flex column layout for stacking content sections
        "flex flex-col",
        // Spacing between sections
        "space-y-8",
        // Full width with overflow prevention
        "w-full min-w-0",
        // Prevent content from overflowing
        "overflow-hidden"
      )}
      role="region"
      aria-label="Main content area"
    >
      {childrenArray.map((child, index) => (
        <React.Fragment key={index}>
          {/* Section container with consistent styling */}
          <section
            className={cn(
              // Section spacing and layout
              "space-y-6",
              // Responsive padding
              "px-0 sm:px-2"
            )}
          >
            {child}
          </section>

          {/* Add separator between sections (not after the last one) */}
          {index < childrenArray.length - 1 && (
            <Separator
              className={cn("my-8", "bg-border/50", "h-px")}
              aria-hidden="true"
            />
          )}
        </React.Fragment>
      ))}
    </div>
  );
}

export default MainContent;
