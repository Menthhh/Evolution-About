"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Search, Headphones, ChevronLeft, ChevronRight } from "lucide-react";
import { PodcastEpisode } from "@/types/evolution-homepage";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Navigation from "../Navigation";
import { PodcastCard } from "../PodcastSection";

interface PodcastsPageProps {
  episodes: PodcastEpisode[];
}

const navigationItems = [
  {
    id: "home",
    label: "หน้าแรก",
    href: "/evolution-homepage",
    isActive: false,
  },
  {
    id: "articles",
    label: "บทความ",
    href: "/articles",
    isActive: false,
  },
  {
    id: "publications",
    label: "หนังสือ",
    href: "/publications",
    isActive: false,
  },
  { id: "videos", label: "วิดีโอ", href: "/videos", isActive: false },
  { id: "podcasts", label: "พอดแคสต์", href: "/podcasts", isActive: true },
];

const categories = [
  "วิวัฒนาการ",
  "วิทยาศาสตร์",
  "ธรรมชาติ",
  "การศึกษา",
  "ปรัชญา",
  "บทสัมภาษณ์",
];

const recommendedEpisodes = [
  "พื้นฐานของวิวัฒนาการ: จุดเริ่มต้นของทุกสิ่ง",
  "ชาร์ลส์ ดาร์วิน: บิดาแห่งทฤษฎีวิวัฒนาการ",
  "DNA: รหัสลับของชีวิต",
  "ฟอสซิล: หลักฐานจากอดีต",
  "การคัดเลือกโดยธรรมชาติ: กลไกแห่งการเปลี่ยนแปลง",
];

const EPISODES_PER_PAGE = 8;

export function PodcastsPage({ episodes }: PodcastsPageProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [currentPlaying, setCurrentPlaying] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState(1);

  // Filter episodes based on search query
  const filteredEpisodes = episodes.filter(
    (episode) =>
      episode.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (episode.description &&
        episode.description.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  // Pagination calculations
  const totalPages = Math.ceil(filteredEpisodes.length / EPISODES_PER_PAGE);
  const startIndex = (currentPage - 1) * EPISODES_PER_PAGE;
  const paginatedEpisodes = filteredEpisodes.slice(
    startIndex,
    startIndex + EPISODES_PER_PAGE
  );

  const handlePlay = (episodeId: string) => {
    if (currentPlaying === episodeId) {
      setCurrentPlaying(null);
    } else {
      setIsLoading(true);
      setCurrentPlaying(episodeId);
      // Simulate loading
      setTimeout(() => setIsLoading(false), 1000);
    }
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1); // Reset to first page when searching
  };

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(selectedCategory === category ? null : category);
    setCurrentPage(1); // Reset to first page when filtering
  };

  const colorVariants = ["dark", "brown", "blue", "green", "purple"] as const;

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-fixed"
      style={{
        backgroundImage: "url('/images/background-cover.jpg')",
      }}
    >
      {/* Dark overlay */}
      <div className="min-h-screen bg-black/60">
        {/* Navigation */}
        <Navigation items={navigationItems} activeItem="podcasts" />

        {/* Search Bar - Homepage Style */}
        <div className="max-w-7xl mx-auto w-full px-3 sm:px-4 md:px-6 lg:px-8 pb-4 pt-20">
          <form
            onSubmit={(e) => {
              e.preventDefault();
            }}
            className="space-y-2"
          >
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <input
                type="text"
                placeholder="ค้นหาตอนพอดแคสต์..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                className="pl-10 pr-4 py-2 w-full bg-slate-800/90 border border-slate-700/50 rounded-md focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 transition-all duration-200 text-slate-200 placeholder:text-slate-400 outline-none min-h-[44px]"
                aria-label="ค้นหาตอนพอดแคสต์"
              />
            </div>
          </form>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto w-full px-3 sm:px-4 md:px-6 lg:px-8 pt-0 pb-4 sm:pb-6 lg:pb-8">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] xl:grid-cols-[1fr_400px] gap-4 sm:gap-6 lg:gap-8 w-full min-w-0">
            {/* Main Content Area */}
            <div className="space-y-6">
              {/* Stats Bar */}
              <div className="bg-gray-800/80 backdrop-blur-sm rounded-lg p-4 border border-gray-600/40">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-4 text-gray-300">
                    <div className="flex items-center space-x-2">
                      <Headphones className="w-4 h-4" />
                      <span>{episodes.length} ตอนทั้งหมด</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span>🎧</span>
                      <span>ฟังออนไลน์</span>
                    </div>
                  </div>
                  <div className="text-gray-400">
                    แสดง {paginatedEpisodes.length} จาก{" "}
                    {filteredEpisodes.length} ตอน
                    {searchQuery && ` (ค้นหา: "${searchQuery}")`}
                  </div>
                </div>
              </div>

              {/* Episodes Grid */}
              {filteredEpisodes.length > 0 ? (
                <>
                  <div className="space-y-4">
                    {paginatedEpisodes.map((episode, index) => {
                      const isPlaying = currentPlaying === episode.id;
                      const isCurrentLoading =
                        isLoading && currentPlaying === episode.id;
                      const colorVariant =
                        colorVariants[
                          (startIndex + index) % colorVariants.length
                        ];

                      return (
                        <div key={episode.id} className="group">
                          <Link href={`/podcasts/${episode.id}`}>
                            <div className="cursor-pointer">
                              <PodcastCard
                                episode={episode}
                                isPlaying={isPlaying}
                                isLoading={isCurrentLoading}
                                onPlay={(id) => {
                                  // Prevent navigation when clicking play button
                                  handlePlay(id);
                                }}
                                colorVariant={colorVariant}
                              />
                            </div>
                          </Link>
                        </div>
                      );
                    })}
                  </div>

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <div className="flex items-center justify-center gap-2 mt-8">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          setCurrentPage(Math.max(1, currentPage - 1))
                        }
                        disabled={currentPage === 1}
                        className="bg-gray-800/80 border-gray-600/40 text-white hover:bg-gray-700/80 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <ChevronLeft className="w-4 h-4 mr-1" />
                      </Button>

                      <div className="flex items-center gap-1">
                        {Array.from(
                          { length: totalPages },
                          (_, i) => i + 1
                        ).map((page) => {
                          const isCurrentPage = page === currentPage;
                          const shouldShow =
                            page === 1 ||
                            page === totalPages ||
                            Math.abs(page - currentPage) <= 1;

                          if (!shouldShow) {
                            if (
                              page === currentPage - 2 ||
                              page === currentPage + 2
                            ) {
                              return (
                                <span key={page} className="text-white/50 px-2">
                                  ...
                                </span>
                              );
                            }
                            return null;
                          }

                          return (
                            <Button
                              key={page}
                              variant={isCurrentPage ? "default" : "outline"}
                              size="sm"
                              onClick={() => setCurrentPage(page)}
                              className={cn(
                                "min-w-[40px]",
                                isCurrentPage
                                  ? "bg-yellow-400 text-black hover:bg-yellow-500"
                                  : "bg-gray-800/80 border-gray-600/40 text-white hover:bg-gray-700/80"
                              )}
                            >
                              {page}
                            </Button>
                          );
                        })}
                      </div>

                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          setCurrentPage(Math.min(totalPages, currentPage + 1))
                        }
                        disabled={currentPage === totalPages}
                        className="bg-gray-800/80 border-gray-600/40 text-white hover:bg-gray-700/80 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <ChevronRight className="w-4 h-4 ml-1" />
                      </Button>
                    </div>
                  )}
                </>
              ) : (
                /* No Results */
                <div className="text-center py-16">
                  <Search className="w-16 h-16 text-white/30 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-2">
                    ไม่พบตอนพอดแคสต์
                  </h3>
                  <p className="text-white/70">
                    ลองค้นหาด้วยคำอื่น หรือดูตอนทั้งหมด
                  </p>
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="mt-4 px-6 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors"
                    >
                      ดูตอนทั้งหมด
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Recommended Episodes */}
              <div className="bg-gray-800/80 backdrop-blur-sm rounded-lg p-6 border border-gray-600/40">
                <h3 className="text-white font-semibold text-lg mb-4">
                  ตอนแนะนำ
                </h3>
                <div className="space-y-3">
                  {recommendedEpisodes.map((title, index) => (
                    <div key={index} className="flex items-start space-x-2">
                      <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full mt-2 flex-shrink-0" />
                      <a
                        href="#"
                        className="text-gray-300 text-sm hover:text-white hover:underline line-clamp-2 transition-colors"
                      >
                        {title}
                      </a>
                    </div>
                  ))}
                </div>
              </div>

              {/* Categories */}
              <div className="bg-gray-800/80 backdrop-blur-sm rounded-lg p-6 border border-gray-600/40">
                <h3 className="text-white font-semibold text-lg mb-4">
                  หมวดหมู่
                </h3>
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <Badge
                      key={category}
                      variant="secondary"
                      className={`cursor-pointer transition-colors rounded-full ${
                        selectedCategory === category
                          ? "bg-yellow-400 text-black hover:bg-yellow-500"
                          : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                      }`}
                      onClick={() => handleCategoryClick(category)}
                    >
                      {category}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Podcast Stats */}
              <div className="bg-gray-800/80 backdrop-blur-sm rounded-lg p-6 border border-gray-600/40">
                <h3 className="text-white font-semibold text-lg mb-4">
                  สถิติพอดแคสต์
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300 text-sm">ตอนทั้งหมด</span>
                    <span className="text-white font-medium">
                      {episodes.length}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300 text-sm">เวลารวม</span>
                    <span className="text-white font-medium">7+ ชั่วโมง</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300 text-sm">อัปเดตล่าสุด</span>
                    <span className="text-white font-medium">สัปดาห์นี้</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
