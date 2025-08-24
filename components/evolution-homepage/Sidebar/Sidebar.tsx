"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SidebarProps } from "@/types/evolution-homepage";
import { cn } from "@/lib/utils";
import { ChevronDown, ChevronUp } from "lucide-react";
import SearchSection from "../SearchSection/SearchSection";
import { PodcastSection } from "../PodcastSection";

const Sidebar: React.FC<SidebarProps> = ({
  searchProps,
  categories,
  latestItems,
  popularItems,
  podcastEpisodes,
}) => {
  // Collapsible state for mobile sections
  const [collapsedSections, setCollapsedSections] = useState({
    categories: false,
    latest: false,
    popular: false,
    podcast: false,
  });

  const toggleSection = (section: keyof typeof collapsedSections) => {
    setCollapsedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  return (
    <aside
      className={cn(
        // Mobile-first responsive width and spacing
        "w-full min-w-0",
        // Responsive width constraints - let grid handle the width
        "lg:w-auto xl:w-auto",
        // Mobile-optimized spacing
        "space-y-3 sm:space-y-4 lg:space-y-6",
        // Enhanced mobile styling
        "bg-background/50 backdrop-blur-sm",
        "border border-border/50 rounded-lg",
        // Mobile-first responsive padding
        "p-3 sm:p-4 lg:p-6",
        // Ensure proper touch targets on mobile
        "touch-manipulation",
        // Mobile sticky behavior
        "lg:sticky lg:top-4 lg:self-start",
        // Align with article cards - positioned a bit higher
        "mt-12 lg:mt-14"
      )}
    >
      {/* Search Section with Social Links */}
      <SearchSection
        onSearch={searchProps.onSearch}
        socialLinks={searchProps.socialLinks}
      />

      {/* Categories Section - Collapsible on Mobile */}
      <Card className="bg-card/50 backdrop-blur-sm border-border/50 transition-all duration-300 ease-out hover:bg-card/70 hover:shadow-lg hover:-translate-y-1 hover:border-accent/30">
        <CardHeader
          className={cn(
            "pb-2 sm:pb-3 px-3 sm:px-4 lg:px-6 pt-3 sm:pt-4 lg:pt-6",
            "sm:cursor-default cursor-pointer touch-manipulation"
          )}
          onClick={() => toggleSection("categories")}
        >
          <CardTitle className="text-sm sm:text-base lg:text-lg font-semibold text-foreground flex items-center justify-between">
            <span>หมวดหมู่</span>
            <button
              className="sm:hidden p-1 hover:bg-muted/50 rounded transition-colors touch-manipulation min-h-[44px] min-w-[44px] flex items-center justify-center"
              aria-label={
                collapsedSections.categories ? "ขยายหมวดหมู่" : "ย่อหมวดหมู่"
              }
            >
              {collapsedSections.categories ? (
                <ChevronDown className="h-4 w-4" />
              ) : (
                <ChevronUp className="h-4 w-4" />
              )}
            </button>
          </CardTitle>
        </CardHeader>
        <CardContent
          className={cn(
            "space-y-2 px-3 sm:px-4 lg:px-6 pb-3 sm:pb-4 lg:pb-6 transition-all duration-300",
            collapsedSections.categories && "sm:block hidden"
          )}
        >
          {categories.map((category) => (
            <div
              key={category.id}
              className={cn(
                "flex items-center justify-between p-2 rounded-lg",
                "hover:bg-muted/50 transition-colors cursor-pointer",
                "touch-manipulation min-h-[44px]"
              )}
            >
              <span className="text-xs sm:text-sm text-foreground hover:text-accent transition-colors">
                {category.name}
              </span>
              {category.count && (
                <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full">
                  {category.count}
                </span>
              )}
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Latest Content Section - Collapsible on Mobile */}
      <Card className="bg-card/50 backdrop-blur-sm border-border/50 transition-all duration-300 ease-out hover:bg-card/70 hover:shadow-lg hover:-translate-y-1 hover:border-accent/30">
        <CardHeader
          className={cn(
            "pb-2 sm:pb-3 px-3 sm:px-4 lg:px-6 pt-3 sm:pt-4 lg:pt-6",
            "sm:cursor-default cursor-pointer touch-manipulation"
          )}
          onClick={() => toggleSection("latest")}
        >
          <CardTitle className="text-sm sm:text-base lg:text-lg font-semibold text-foreground flex items-center justify-between">
            <span>ล่าสุด</span>
            <button
              className="sm:hidden p-1 hover:bg-muted/50 rounded transition-colors touch-manipulation min-h-[44px] min-w-[44px] flex items-center justify-center"
              aria-label={
                collapsedSections.latest
                  ? "ขยายเนื้อหาล่าสุด"
                  : "ย่อเนื้อหาล่าสุด"
              }
            >
              {collapsedSections.latest ? (
                <ChevronDown className="h-4 w-4" />
              ) : (
                <ChevronUp className="h-4 w-4" />
              )}
            </button>
          </CardTitle>
        </CardHeader>
        <CardContent
          className={cn(
            "space-y-2 px-3 sm:px-4 lg:px-6 pb-3 sm:pb-4 lg:pb-6 transition-all duration-300",
            collapsedSections.latest && "sm:block hidden"
          )}
        >
          {latestItems.slice(0, 5).map((item) => (
            <div
              key={item.id}
              className={cn(
                "p-2 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer",
                "touch-manipulation min-h-[44px] flex flex-col justify-center"
              )}
            >
              <h4 className="text-xs sm:text-sm font-medium text-foreground hover:text-accent transition-colors line-clamp-2">
                {item.title}
              </h4>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-xs text-muted-foreground capitalize">
                  {item.type === "article" ? "บทความ" : "วิดีโอ"}
                </span>
                {item.views && (
                  <span className="text-xs text-muted-foreground">
                    {item.views.toLocaleString()} ครั้ง
                  </span>
                )}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Popular Content Section - Collapsible on Mobile */}
      <Card className="bg-card/50 backdrop-blur-sm border-border/50 transition-all duration-300 ease-out hover:bg-card/70 hover:shadow-lg hover:-translate-y-1 hover:border-accent/30">
        <CardHeader
          className={cn(
            "pb-2 sm:pb-3 px-3 sm:px-4 lg:px-6 pt-3 sm:pt-4 lg:pt-6",
            "sm:cursor-default cursor-pointer touch-manipulation"
          )}
          onClick={() => toggleSection("popular")}
        >
          <CardTitle className="text-sm sm:text-base lg:text-lg font-semibold text-foreground flex items-center justify-between">
            <span>ยอดนิยม</span>
            <button
              className="sm:hidden p-1 hover:bg-muted/50 rounded transition-colors touch-manipulation min-h-[44px] min-w-[44px] flex items-center justify-center"
              aria-label={
                collapsedSections.popular
                  ? "ขยายเนื้อหายอดนิยม"
                  : "ย่อเนื้อหายอดนิยม"
              }
            >
              {collapsedSections.popular ? (
                <ChevronDown className="h-4 w-4" />
              ) : (
                <ChevronUp className="h-4 w-4" />
              )}
            </button>
          </CardTitle>
        </CardHeader>
        <CardContent
          className={cn(
            "space-y-2 px-3 sm:px-4 lg:px-6 pb-3 sm:pb-4 lg:pb-6 transition-all duration-300",
            collapsedSections.popular && "sm:block hidden"
          )}
        >
          {popularItems.slice(0, 5).map((item) => (
            <div
              key={item.id}
              className={cn(
                "p-2 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer",
                "touch-manipulation min-h-[44px] flex flex-col justify-center"
              )}
            >
              <h4 className="text-xs sm:text-sm font-medium text-foreground hover:text-accent transition-colors line-clamp-2">
                {item.title}
              </h4>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-xs text-muted-foreground capitalize">
                  {item.type === "article" ? "บทความ" : "วิดีโอ"}
                </span>
                {item.views && (
                  <span className="text-xs text-muted-foreground">
                    {item.views.toLocaleString()} ครั้ง
                  </span>
                )}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Podcast Section - Modern Spotify-style Cards */}
      <div
        className={cn(
          "transition-all duration-300",
          collapsedSections.podcast && "sm:block hidden"
        )}
      >
        <PodcastSection episodes={podcastEpisodes.slice(0, 6)} />
      </div>
    </aside>
  );
};

export default Sidebar;
