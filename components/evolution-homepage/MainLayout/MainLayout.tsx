"use client";

import React from "react";
import { MainLayoutProps } from "@/types/evolution-homepage";
import { cn } from "@/lib/utils";

/**
 * MainLayout Component
 *
 * Two-column layout container with CSS Grid for Evolution About homepage.
 * Implements responsive behavior that stacks columns on mobile devices.
 *
 * Requirements:
 * - 1.1: Two-column layout with main content (70%) and sidebar (30%)
 * - 1.2: Consistent spacing between main content and sidebar
 * - 7.1: Responsive design that stacks on mobile
 * - 9.1: Mobile-first responsive design with proper breakpoints
 */
export function MainLayout({ children }: MainLayoutProps) {
  return (
    <main className="w-full">
      <div
        className={cn(
          // Container with proper width constraints
          "max-w-7xl mx-auto w-full",
          // Mobile-first responsive padding
          "px-3 sm:px-4 md:px-6 lg:px-8",
          // Responsive vertical spacing
          "py-4 sm:py-6 lg:py-8"
        )}
      >
        <div
          className={cn(
            // Mobile-first responsive grid layout
            "grid grid-cols-1",
            // Desktop: two-column layout with responsive sidebar width
            "lg:grid-cols-[1fr_320px] xl:grid-cols-[1fr_400px]",
            // Responsive gap spacing
            "gap-4 sm:gap-6 lg:gap-8",
            // Prevent overflow
            "w-full min-w-0"
          )}
          role="main"
          aria-label="Main content layout"
        >
          {children}
        </div>
      </div>
    </main>
  );
}

export default MainLayout;
