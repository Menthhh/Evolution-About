"use client";

import React from "react";
import { cn, evolutionClasses } from "@/lib/utils";
import Header from "../Header";
import FeaturedArticles from "../FeaturedArticles";
import VideoSection from "../VideoSection";
import PublicationsGallery from "../PublicationsGallery";
import Sidebar from "../Sidebar";

// Import sample data
import { sampleArticles } from "@/data/sample-articles";
import { sampleVideos } from "@/data/sample-videos";
import { samplePublications } from "@/data/sample-publications";
import { sampleSocialLinks } from "@/data/sample-social-links";

const HomePage: React.FC = () => {
  const handleSearch = (query: string) => {
    // Search functionality will be implemented in later tasks
    console.log("Search query:", query);
  };

  return (
    <div className="evolution-homepage min-h-screen bg-background text-foreground">
      {/* Main page wrapper with proper semantic HTML structure */}
      <div className="grid min-h-screen grid-rows-[auto_1fr] lg:grid-rows-[auto_1fr]">
        {/* Header component with navigation structure */}
        <Header onSearch={handleSearch} />

        {/* Main content area with responsive grid layout */}
        <main className="flex-1">
          <div
            className={cn(
              evolutionClasses.container,
              evolutionClasses.spacing.section
            )}
          >
            {/* CSS Grid for main content and sidebar positioning - mobile-first responsive */}
            <div className={evolutionClasses.layout.mainGrid}>
              {/* Main content area - responsive grid layout with vertical stacking on mobile */}
              <div className={evolutionClasses.layout.contentStack}>
                {/* Hero section with enhanced dark theme styling */}
                <section
                  className={cn(
                    "text-center relative",
                    evolutionClasses.spacing.sectionSmall,
                    evolutionClasses.animation.fadeIn
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

                {/* Featured Articles section with real data */}
                <FeaturedArticles articles={sampleArticles} maxItems={3} />

                {/* Video section with real data */}
                <VideoSection
                  videos={sampleVideos}
                  title="วิดีโอการศึกษา"
                  layout="grid"
                />

                {/* Publications section with real data */}
                <PublicationsGallery
                  publications={samplePublications}
                  columns={3}
                />
              </div>

              {/* Sidebar with real social links data */}
              <Sidebar
                socialLinks={sampleSocialLinks}
                additionalContent={
                  <div className="space-y-3">
                    <h4 className="text-sm font-medium text-foreground">
                      ข่าวสารล่าสุด
                    </h4>
                    <div className="space-y-2">
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        ติดตามการอัปเดตเนื้อหาใหม่ๆ และกิจกรรมทางวิทยาศาสตร์
                      </p>
                      <div className="flex items-center gap-2 text-xs text-accent">
                        <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
                        <span>มีบทความใหม่ 3 บทความ</span>
                      </div>
                    </div>
                  </div>
                }
              />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default HomePage;
