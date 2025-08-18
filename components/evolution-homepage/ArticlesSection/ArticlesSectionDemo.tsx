"use client";

import React from "react";
import { ArticlesSection } from "./ArticlesSection";
import { sampleArticles } from "@/data/sample-articles";

/**
 * ArticlesSectionDemo Component
 *
 * Demonstrates the ArticlesSection component with sample data
 * for development and testing purposes.
 */
export function ArticlesSectionDemo() {
  return (
    <div className="container mx-auto px-4 py-8">
      <ArticlesSection articles={sampleArticles} title="บทความ" />
    </div>
  );
}

export default ArticlesSectionDemo;
