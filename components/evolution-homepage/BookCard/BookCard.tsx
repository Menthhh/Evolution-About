import React from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { BookCardProps } from "@/types/evolution-homepage";

/**
 * BookCard component for book covers and titles
 * Requirements: 4.1, 4.2, 4.3 - Book card with cover image, title, hover effects
 */
const BookCard: React.FC<BookCardProps> = ({ book }) => {
  const cardContent = (
    <article
      className={cn(
        "bg-card border border-border rounded-lg overflow-hidden",
        "transition-all duration-300 hover:scale-105 active:scale-95", // Enhanced mobile interactions
        "group cursor-pointer touch-manipulation", // Touch-friendly
        "min-h-[200px] sm:min-h-[240px]" // Consistent minimum height
      )}
    >
      {/* Book Cover with consistent aspect ratio */}
      <div className="aspect-[3/4] overflow-hidden relative bg-muted">
        <Image
          src={book.coverImage}
          alt={`${book.title} - Book Cover`}
          fill
          className="object-cover transition-all duration-300 group-hover:brightness-110"
          sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
        />

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Book Title and Details */}
      <div className="p-2 sm:p-3 space-y-1 sm:space-y-2">
        <h3
          className={cn(
            "text-xs sm:text-sm font-medium text-foreground",
            "line-clamp-2", // Text wrapping and truncation for long titles
            "group-hover:text-accent transition-colors duration-300",
            "leading-tight min-h-[2.5rem] sm:min-h-[3rem]" // Consistent title height
          )}
        >
          {book.title}
        </h3>

        {/* Author and Year */}
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          {book.author && (
            <span className="truncate flex-1 mr-2">{book.author}</span>
          )}
          {book.year && <span className="font-medium">{book.year}</span>}
        </div>
      </div>
    </article>
  );

  // Conditional wrapper for Link vs div
  if (book.href) {
    return (
      <Link href={book.href} className="block">
        {cardContent}
      </Link>
    );
  }

  return <div className="block">{cardContent}</div>;
};

export default BookCard;
