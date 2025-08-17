import React from "react";
import Image from "next/image";
import Link from "next/link";
import { cn, evolutionClasses } from "@/lib/utils";
import { PublicationCardProps } from "@/types/evolution-homepage";

/**
 * PublicationCard component for displaying individual publications
 * Requirements: 4.1, 4.2, 4.3 - Publication cards with book covers, hover effects, and Evolution About branding
 */
const PublicationCard: React.FC<PublicationCardProps> = ({ publication }) => {
  const cardContent = (
    <article className={cn(evolutionClasses.card.base, "group cursor-pointer")}>
      {/* Book Cover with responsive aspect ratio */}
      <div className="aspect-[3/4] sm:aspect-[2/3] lg:aspect-[3/4] overflow-hidden relative bg-muted">
        <Image
          src={publication.coverImage}
          alt={`${publication.title} - Evolution About Publication`}
          fill
          className="object-cover transition-all duration-300 group-hover:scale-105 group-hover:brightness-110"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
        />

        {/* Evolution About branding overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Evolution About logo/branding - responsive sizing */}
        <div className="absolute top-1 right-1 sm:top-2 sm:right-2 bg-accent/90 text-accent-foreground text-xs px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-full font-medium opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
          <span className="hidden sm:inline">Evolution About</span>
          <span className="sm:hidden">EA</span>
        </div>

        {/* Author badge - responsive sizing */}
        {publication.author && (
          <div className="absolute top-1 left-1 sm:top-2 sm:left-2 bg-background/90 text-foreground text-xs px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-full font-medium">
            <span className="hidden sm:inline">{publication.author}</span>
            <span className="sm:hidden">ผู้เขียน</span>
          </div>
        )}
      </div>

      {/* Publication Details - responsive spacing and text */}
      <div className="p-2 sm:p-3 space-y-1 sm:space-y-2">
        <h3 className="text-xs sm:text-sm font-medium text-foreground line-clamp-2 group-hover:text-accent transition-colors duration-300 leading-tight">
          {publication.title}
        </h3>

        <div className="flex items-center justify-between text-xs text-muted-foreground">
          {publication.year && (
            <span className="font-medium">{publication.year}</span>
          )}
          <span className="text-accent/70 font-medium text-xs">
            <span className="hidden sm:inline">Evolution About</span>
            <span className="sm:hidden">EA</span>
          </span>
        </div>
      </div>

      {/* Hover effect border */}
      <div className="absolute inset-0 border-2 border-accent/0 group-hover:border-accent/30 rounded-lg transition-all duration-300 pointer-events-none" />
    </article>
  );

  // Conditional wrapper for Link vs div
  if (publication.href) {
    return (
      <Link href={publication.href} className="block">
        {cardContent}
      </Link>
    );
  }

  return <div className="block">{cardContent}</div>;
};

export default PublicationCard;
