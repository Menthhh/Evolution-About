"use client";

import React, { useState } from "react";
import { sampleVideos } from "@/data/sample-videos";
import Navigation from "../Navigation";
import VideoCard from "../VideoCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Search, Play, Eye } from "lucide-react";
import { cn } from "@/lib/utils";

const navigationItems = [
  {
    id: "home",
    label: "หน้าแรก",
    href: "/evolution-homepage",
    isActive: false,
  },
  { id: "articles", label: "บทความ", href: "/articles", isActive: false },
  { id: "books", label: "หนังสือ", href: "/publications", isActive: false },
  { id: "videos", label: "วิดีโอ", href: "/videos", isActive: true },
  { id: "podcasts", label: "พอดแคสต์", href: "/podcasts", isActive: false },
];

const categories = [
  "วิวัฒนาการ",
  "พันธุกรรม",
  "วิทยาศาสตร์",
  "ปรัชญา",
  "การศึกษา",
  "บทสัมภาษณ์",
];

const recommendedVideos = [
  "การศึกษาพันธุกรรมและวิวัฒนาการ",
  "วิทยาศาสตร์สมัยใหม่และทฤษฎีวิวัฒนาการ",
  "ปรัชญา วิทยาศาสตร์และข้อจำกัดของวิทยาศาสตร์",
  "โมเลกุลบ่งชี้ถึงอะไร?",
  "พระเจ้า ศาสนาและทฤษฎีวิวัฒนาการ",
];

const VIDEOS_PER_PAGE = 12;

export function VideosPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  // Filter videos based on search and selections
  const filteredVideos = sampleVideos.filter((video) => {
    const matchesSearch =
      searchQuery === "" ||
      video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      video.description?.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesSearch;
  });

  const totalPages = Math.ceil(filteredVideos.length / VIDEOS_PER_PAGE);
  const startIndex = (currentPage - 1) * VIDEOS_PER_PAGE;
  const paginatedVideos = filteredVideos.slice(
    startIndex,
    startIndex + VIDEOS_PER_PAGE
  );

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(selectedCategory === category ? null : category);
    setCurrentPage(1);
  };

  // Calculate total views for stats
  const totalViews = sampleVideos.reduce(
    (sum, video) => sum + (video.views || 0),
    0
  );

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
        <Navigation items={navigationItems} activeItem="videos" />

        {/* Search Bar */}
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
                placeholder="ค้นหาวิดีโอ..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                className="pl-10 pr-4 py-2 w-full bg-slate-800/90 border border-slate-700/50 rounded-md focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 transition-all duration-200 text-slate-200 placeholder:text-slate-400 outline-none min-h-[44px]"
                aria-label="ค้นหาวิดีโอ"
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
                      <Play className="w-4 h-4" />
                      <span>{sampleVideos.length} วิดีโอ</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Eye className="w-4 h-4" />
                      <span>{totalViews.toLocaleString()} ครั้ง</span>
                    </div>
                  </div>
                  <div className="text-gray-400">
                    แสดง {paginatedVideos.length} จาก {filteredVideos.length}{" "}
                    วิดีโอ
                  </div>
                </div>
              </div>

              {/* Videos Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
                {paginatedVideos.map((video) => (
                  <VideoCard key={video.id} video={video} />
                ))}
              </div>

              {/* Empty State */}
              {paginatedVideos.length === 0 && (
                <div className="text-center py-12">
                  <div className="bg-gray-800/80 backdrop-blur-sm rounded-lg p-8 border border-gray-600/40">
                    <Play className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-white text-lg font-medium mb-2">
                      ไม่พบวิดีโอ
                    </h3>
                    <p className="text-gray-400">
                      ลองเปลี่ยนคำค้นหาหรือเลือกหมวดหมู่อื่น
                    </p>
                  </div>
                </div>
              )}

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center space-x-2 py-8">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className="bg-gray-800/80 border-gray-600 text-white hover:bg-gray-700"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </Button>

                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (page) => (
                      <Button
                        key={page}
                        variant={currentPage === page ? "default" : "outline"}
                        size="sm"
                        onClick={() => setCurrentPage(page)}
                        className={cn(
                          currentPage === page
                            ? "bg-yellow-400 text-black hover:bg-yellow-500"
                            : "bg-gray-800/80 border-gray-600 text-white hover:bg-gray-700"
                        )}
                      >
                        {page}
                      </Button>
                    )
                  )}

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      setCurrentPage(Math.min(totalPages, currentPage + 1))
                    }
                    disabled={currentPage === totalPages}
                    className="bg-gray-800/80 border-gray-600 text-white hover:bg-gray-700"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Recommended Videos */}
              <div className="bg-gray-800/80 backdrop-blur-sm rounded-lg p-6 border border-gray-600/40">
                <h3 className="text-white font-semibold text-lg mb-4">
                  วิดีโอแนะนำ
                </h3>
                <div className="space-y-3">
                  {recommendedVideos.map((title, index) => (
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
                      className={cn(
                        "cursor-pointer transition-colors rounded-full",
                        selectedCategory === category
                          ? "bg-yellow-400 text-black hover:bg-yellow-500"
                          : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                      )}
                      onClick={() => handleCategoryClick(category)}
                    >
                      {category}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Popular Videos */}
              <div className="bg-gray-800/80 backdrop-blur-sm rounded-lg p-6 border border-gray-600/40">
                <h3 className="text-white font-semibold text-lg mb-4">
                  วิดีโอยอดนิยม
                </h3>
                <div className="space-y-4">
                  {sampleVideos
                    .sort((a, b) => (b.views || 0) - (a.views || 0))
                    .slice(0, 5)
                    .map((video, index) => (
                      <div
                        key={video.id}
                        className="flex items-start space-x-3"
                      >
                        <div className="flex-shrink-0 w-8 h-8 bg-yellow-400 text-black rounded-full flex items-center justify-center text-sm font-bold">
                          {index + 1}
                        </div>
                        <div className="flex-1 min-w-0">
                          <a
                            href={`/videos/${video.youtubeId}`}
                            className="text-gray-300 text-sm hover:text-white hover:underline line-clamp-2 transition-colors block"
                          >
                            {video.title}
                          </a>
                          <div className="flex items-center space-x-2 mt-1 text-xs text-gray-400">
                            <Eye className="w-3 h-3" />
                            <span>{video.views?.toLocaleString()}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VideosPage;
