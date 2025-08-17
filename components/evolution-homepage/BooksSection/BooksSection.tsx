import React from "react";
import { cn } from "@/lib/utils";
import { BooksSectionProps } from "@/types/evolution-homepage";
import BookCard from "../BookCard/BookCard";

/**
 * BooksSection component with 3-column grid layout
 * Requirements: 4.1, 4.2, 7.2 - Books container with responsive grid and Thai typography
 */
const BooksSection: React.FC<BooksSectionProps> = ({
  books,
  title = "หนังสือ",
}) => {
  if (!books || books.length === 0) {
    return (
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-foreground mb-6">{title}</h2>
        <div className="text-center py-8 text-muted-foreground">
          <p className="text-sm">ไม่มีหนังสือในขณะนี้</p>
        </div>
      </section>
    );
  }

  return (
    <section className="space-y-6">
      {/* Section Title with consistent typography */}
      <h2 className="text-2xl font-bold text-foreground mb-6">{title}</h2>

      {/* Books Grid - responsive grid with proper spacing */}
      <div
        className={cn(
          // Mobile-first responsive grid with improved spacing
          "grid w-full touch-manipulation",
          // Mobile: 2 columns, Tablet: 2-3 columns, Desktop: 3 columns
          "grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3",
          // Responsive gap spacing optimized for mobile
          "gap-3 sm:gap-4 md:gap-5 lg:gap-6",
          // Prevent overflow
          "min-w-0"
        )}
      >
        {books.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
    </section>
  );
};

export default BooksSection;
