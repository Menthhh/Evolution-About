"use client";

import React, { useState } from "react";
import { samplePublications } from "@/data/sample-publications";
import Navigation from "../Navigation";
import PublicationCard from "../PublicationCard/PublicationCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ChevronLeft,
  ChevronRight,
  Search,
  Book,
  Download,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navigationItems = [
  {
    id: "home",
    label: "หน้าแรก",
    href: "/evolution-homepage",
    isActive: false,
  },
  { id: "articles", label: "บทความ", href: "/articles", isActive: false },
  { id: "books", label: "หนังสือ", href: "/publications", isActive: true },
  { id: "videos", label: "วิดีโอ", href: "/videos", isActive: false },
  { id: "podcasts", label: "พอดแคสต์", href: "/podcasts", isActive: false },
];

const categories = [
  "วิวัฒนาการ",
  "พันธุกรรม",
  "วิทยาศาสตร์",
  "การศึกษา",
  "คู่มือ",
  "แปล",
];

const authors = [
  "Evolution About Team",
  "Dr. Siriporn Thanakit",
  "Prof. Somchai Jitpakdee",
  "Dr. Niran Fossil",
  "Charles Darwin",
];

const recommendedPublications = [
  "Evolution About: ความรู้พื้นฐานเรื่องวิวัฒนาการ เล่ม 1",
  "คู่มือการศึกษาวิวัฒนาการสำหรับครู",
  "DNA และพันธุกรรม: พื้นฐานสู่ความเข้าใจ",
  "บันทึกฟอสซิล: หลักฐานแห่งวิวัฒนาการ",
  "ต้นกำเนิดสายพันธุ์: ฉบับแปลไทย",
];

const PUBLICATIONS_PER_PAGE = 9;

export function PublicationsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedAuthor, setSelectedAuthor] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  // Filter publications based on search and selections
  const filteredPublications = samplePublications.filter((publication) => {
    const matchesSearch =
      searchQuery === "" ||
      publication.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      publication.author?.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesSearch;
  });

  const totalPages = Math.ceil(
    filteredPublications.length / PUBLICATIONS_PER_PAGE
  );
  const startIndex = (currentPage - 1) * PUBLICATIONS_PER_PAGE;
  const paginatedPublications = filteredPublications.slice(
    startIndex,
    startIndex + PUBLICATIONS_PER_PAGE
  );

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(selectedCategory === category ? null : category);
    setCurrentPage(1);
  };

  const handleAuthorClick = (author: string) => {
    setSelectedAuthor(selectedAuthor === author ? null : author);
    setCurrentPage(1);
  };

  // Static latest publications to prevent hydration mismatch
  const latestPublications = [
    samplePublications.find((p) => p.id === "evolution-about-vol-1"),
    samplePublications.find((p) => p.id === "evolution-about-vol-2"),
    samplePublications.find((p) => p.id === "evolution-about-vol-3"),
    samplePublications.find((p) => p.id === "molecular-evolution"),
    samplePublications.find((p) => p.id === "evolution-guide"),
  ].filter(Boolean) as typeof samplePublications;

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
        <Navigation items={navigationItems} activeItem="books" />

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
                placeholder="ค้นหาหนังสือและสิ่งพิมพ์..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                className="pl-10 pr-4 py-2 w-full bg-slate-800/90 border border-slate-700/50 rounded-md focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 transition-all duration-200 text-slate-200 placeholder:text-slate-400 outline-none min-h-[44px]"
                aria-label="ค้นหาหนังสือและสิ่งพิมพ์"
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
                      <Book className="w-4 h-4" />
                      <span>{samplePublications.length} หนังสือทั้งหมด</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Download className="w-4 h-4" />
                      <span>พร้อมดาวน์โหลด</span>
                    </div>
                  </div>
                  <div className="text-gray-400">
                    แสดง {paginatedPublications.length} จาก{" "}
                    {filteredPublications.length} หนังสือ
                  </div>
                </div>
              </div>

              {/* Publications Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
                {paginatedPublications.map((publication) => (
                  <PublicationCard
                    key={publication.id}
                    publication={publication}
                  />
                ))}
              </div>

              {/* Empty State */}
              {paginatedPublications.length === 0 && (
                <div className="text-center py-12">
                  <div className="bg-gray-800/80 backdrop-blur-sm rounded-lg p-8 border border-gray-600/40">
                    <Book className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-white text-lg font-medium mb-2">
                      ไม่พบหนังสือ
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
              {/* Recommended Publications */}
              <div className="bg-gray-800/80 backdrop-blur-sm rounded-lg p-6 border border-gray-600/40">
                <h3 className="text-white font-semibold text-lg mb-4">
                  หนังสือแนะนำ
                </h3>
                <div className="space-y-3">
                  {recommendedPublications.map((title, index) => (
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

              {/* Authors */}
              <div className="bg-gray-800/80 backdrop-blur-sm rounded-lg p-6 border border-gray-600/40">
                <h3 className="text-white font-semibold text-lg mb-4">
                  ผู้เขียน
                </h3>
                <div className="flex flex-wrap gap-2">
                  {authors.map((author) => (
                    <Badge
                      key={author}
                      variant="secondary"
                      className={cn(
                        "cursor-pointer transition-colors rounded-full text-xs",
                        selectedAuthor === author
                          ? "bg-yellow-400 text-black hover:bg-yellow-500"
                          : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                      )}
                      onClick={() => handleAuthorClick(author)}
                    >
                      {author}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Latest Publications */}
              <div className="bg-gray-800/80 backdrop-blur-sm rounded-lg p-6 border border-gray-600/40">
                <h3 className="text-white font-semibold text-lg mb-4">
                  หนังสือล่าสุด
                </h3>
                <div className="space-y-4">
                  {latestPublications.map((publication, index) => (
                    <div
                      key={publication.id}
                      className="flex items-start space-x-3"
                    >
                      <div className="flex-shrink-0 w-8 h-8 bg-yellow-400 text-black rounded-full flex items-center justify-center text-sm font-bold">
                        {index + 1}
                      </div>
                      <div className="flex-1 min-w-0">
                        <a
                          href={publication.href}
                          className="text-gray-300 text-sm hover:text-white hover:underline line-clamp-2 transition-colors block"
                        >
                          {publication.title}
                        </a>
                        <div className="flex items-center space-x-2 mt-1 text-xs text-gray-400">
                          <span>{publication.year}</span>
                          {publication.author && (
                            <>
                              <span>•</span>
                              <span>{publication.author}</span>
                            </>
                          )}
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

export default PublicationsPage;
