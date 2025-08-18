import React from "react";
import BooksSection from "./BooksSection";
import { sampleBooks } from "@/data/sample-publications";

/**
 * Demo component for BooksSection
 * Shows the books section with sample data for development and testing
 */
const BooksSectionDemo: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-foreground">
          Books Section Demo
        </h1>
        <p className="text-muted-foreground">
          Demonstrating the BooksSection component with 3-column responsive grid
        </p>
      </div>

      {/* Books Section with sample data */}
      <BooksSection books={sampleBooks} />

      {/* Books Section with custom title */}
      <BooksSection books={sampleBooks.slice(0, 4)} title="หนังสือแนะนำ" />

      {/* Empty state demo */}
      <BooksSection books={[]} title="หนังสือที่ไม่มี" />
    </div>
  );
};

export default BooksSectionDemo;
