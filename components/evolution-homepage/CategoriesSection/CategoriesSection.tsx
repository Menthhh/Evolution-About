"use client";

import Link from "next/link";
import { CategoriesSectionProps } from "@/types/evolution-homepage";
import { cn } from "@/lib/utils";

/**
 * CategoriesSection component for sidebar categories list
 * Requirements: 5.2 - Categories list for content organization
 */
export function CategoriesSection({ categories }: CategoriesSectionProps) {
  return (
    <div className="bg-card border border-border rounded-lg p-4">
      <h3 className="text-lg font-semibold text-foreground mb-4">หมวดหมู่</h3>
      <nav className="space-y-2" role="navigation" aria-label="หมวดหมู่เนื้อหา">
        {categories.map((category) => (
          <Link
            key={category.id}
            href={category.href}
            className={cn(
              "flex items-center justify-between py-2 px-3 rounded-md",
              "text-sm text-muted-foreground hover:text-foreground",
              "hover:bg-muted/50 transition-all duration-200",
              "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            )}
          >
            <span className="font-medium">{category.name}</span>
            {category.count && (
              <span className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded-full">
                {category.count}
              </span>
            )}
          </Link>
        ))}
      </nav>
    </div>
  );
}
