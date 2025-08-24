"use client";

import React from "react";
import { cn, evolutionClasses } from "@/lib/utils";
import Header from "../Header";
import MainLayout from "../MainLayout";
import MainContent from "../MainContent";
import { ArticlesSection } from "../ArticlesSection";
import { VideosSection } from "../VideosSection";
import BooksSection from "../BooksSection";
import Sidebar from "../Sidebar";

// Import sample data
import { sampleArticles } from "@/data/sample-articles";
import { sampleVideos } from "@/data/sample-videos";
import { sampleBooks } from "@/data/sample-publications";
import { sampleSocialLinks } from "@/data/sample-social-links";
import { sampleCategories } from "@/data/sample-categories";
import {
  sampleLatestItems,
  samplePopularItems,
} from "@/data/sample-content-items";
import { samplePodcastEpisodes } from "@/data/sample-podcast-episodes";

const HomePage: React.FC = () => {
  const handleSearch = (query: string) => {
    // Search functionality implementation
    console.log("Search query:", query);
  };

  return (
    <div className="evolution-homepage min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Header component with navigation structure */}
      <Header />

      {/* Hero section - full width above the two-column layout */}
      <section
        className={cn(
          "text-center relative",
          evolutionClasses.spacing.sectionSmall,
          evolutionClasses.animation.fadeIn,
          // Container styling to match MainLayout
          "max-w-7xl mx-auto w-full px-3 sm:px-4 md:px-6 lg:px-8"
        )}
      >
        <div className="space-y-3 sm:space-y-4 lg:space-y-6">
          <h1
            className={cn(
              evolutionClasses.heading.gradient,
              evolutionClasses.animation.slideUp
            )}
          >
            Evolution About
          </h1>
          <p
            className={cn(
              "text-muted-foreground text-base sm:text-lg lg:text-xl max-w-2xl mx-auto px-4",
              evolutionClasses.animation.slideUp,
              "animation-delay-200"
            )}
          >
            ศูนย์การเรียนรู้วิทยาศาสตร์และวิวัฒนาการ
          </p>
        </div>

        {/* Subtle background gradient */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-accent/5 via-transparent to-transparent rounded-3xl" />
      </section>

      {/* Main layout with two-column structure - sidebar now aligns with articles */}
      <MainLayout>
        {/* Main content area (left column) */}
        <MainContent>
          {/* Articles section with 3-column grid layout - showing only first 3 articles */}
          <ArticlesSection
            articles={sampleArticles.slice(0, 6)}
            title="บทความ"
          />

          {/* Videos section with featured video and thumbnails */}
          <VideosSection
            featuredVideo={sampleVideos[0]}
            videos={sampleVideos.slice(1)}
            title="วิดีโอ"
          />

          {/* Books section with 3-column grid layout - showing only first 6 books */}
          <BooksSection books={sampleBooks.slice(0, 6)} title="หนังสือ" />
        </MainContent>

        {/* Sidebar (right column) - now aligns with articles section */}
        <Sidebar
          searchProps={{
            onSearch: handleSearch,
            socialLinks: sampleSocialLinks,
          }}
          categories={sampleCategories}
          latestItems={sampleLatestItems}
          popularItems={samplePopularItems}
          podcastEpisodes={samplePodcastEpisodes}
        />
      </MainLayout>
    </div>
  );
};

export default HomePage;
