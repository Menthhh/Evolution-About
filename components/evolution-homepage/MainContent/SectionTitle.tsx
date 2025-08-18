"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { SectionTitleProps } from "@/types/evolution-homepage";

/**
 * SectionTitle Component
 *
 * Consistent typography component for section titles in the main content area.
 * Provides proper Thai language support and responsive text sizing.
 *
 * Requirements:
 * - 1.3: Consistent typography for section titles
 * - 7.3: Responsive behavior for main content area
 */

export function SectionTitle({
  children,
  className,
  level = "h2",
  id,
}: SectionTitleProps) {
  const Component = level;

  return (
    <Component
      id={id}
      className={cn(
        // Base typography
        "font-bold text-foreground",
        // Responsive text sizing
        "text-xl sm:text-2xl lg:text-3xl",
        // Spacing
        "mb-6",
        // Thai language support
        "leading-relaxed",
        // Accessibility
        "scroll-mt-20",
        className
      )}
    >
      {children}
    </Component>
  );
}

export default SectionTitle;
