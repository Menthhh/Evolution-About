"use client";

import React, { useState } from "react";
import { sampleArticles } from "@/data/sample-articles";
import Navigation from "../Navigation";
// import SearchBar from "../SearchBar";
import ArticleCard from "../ArticleCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Search, FileText } from "lucide-react";
import { cn } from "@/lib/utils";

const navigationItems = [
  {
    id: "home",
    label: "หน้าแรก",
    href: "/evolution-homepage",
    isActive: false,
  },
  { id: "articles", label: "บทความ", href: "/articles", isActive: true },
  { id: "books", label: "หนังสือ", href: "/publications", isActive: false },
  { id: "videos", label: "วิดีโอ", href: "/videos", isActive: false },
  { id: "podcasts", label: "พอดแคสต์", href: "/podcasts", isActive: false },
];

const categories = [
  "วิวัฒนาการ",
  "ข่าว",
  "งานวิจัย",
  "บทสรุป",
  "ปรัชญา",
  "บทวิจารณ์",
];

const authors = ["arif_dawah", "menth", "erum"];

const recommendedArticles = [
  "Neo-Darwinism ต้องกลายพันธุ์เพื่อความอยู่รอด",
  "นักเคมีระดับโลก กล่าวว่า ข้อความจากโมเลกุล",
  "อินเทอร์เน็ตแห่งโลกธรรมชาติ",
  "กระบวนการผลิตพลังงานในโรงงานเซลล์",
  "ผู้บุกเบิกโอเมก้า 3 กล่าวว่าวิวัฒนาการ",
];

const ARTICLES_PER_PAGE = 12;

export function ArticlesPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedAuthor, setSelectedAuthor] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  // Filter articles based on search and selections
  const filteredArticles = sampleArticles.filter((article) => {
    const matchesSearch =
      searchQuery === "" ||
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.excerpt?.toLowerCase().includes(searchQuery.toLowerCase());

    // For demo purposes, we'll just filter by search
    return matchesSearch;
  });

  const totalPages = Math.ceil(filteredArticles.length / ARTICLES_PER_PAGE);
  const startIndex = (currentPage - 1) * ARTICLES_PER_PAGE;
  const paginatedArticles = filteredArticles.slice(
    startIndex,
    startIndex + ARTICLES_PER_PAGE
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
        <Navigation items={navigationItems} activeItem="articles" />

        {/* Search Bar - Homepage Style */}
        <div className="max-w-7xl mx-auto w-full px-3 sm:px-4 md:px-6 lg:px-8 pb-4 pt-20">
          {/* <div className="bg-card/50 backdrop-blur-sm border-border/50 rounded-lg p-4 transition-all duration-300 ease-out hover:bg-card/70 hover:shadow-lg hover:-translate-y-1 hover:border-accent/30"> */}
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
                placeholder="ค้นหาบทความ..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                className="pl-10 pr-4 py-2 w-full bg-slate-800/90 border border-slate-700/50 rounded-md focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 transition-all duration-200 text-slate-200 placeholder:text-slate-400 outline-none min-h-[44px]"
                aria-label="ค้นหาบทความ"
              />
            </div>
          </form>
          {/* </div> */}
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
                      <FileText className="w-4 h-4" />
                      <span>{sampleArticles.length} บทความทั้งหมด</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span>📖</span>
                      <span>อ่านออนไลน์</span>
                    </div>
                  </div>
                  <div className="text-gray-400">
                    แสดง {paginatedArticles.length} จาก{" "}
                    {filteredArticles.length} บทความ
                    {searchQuery && ` (ค้นหา: "${searchQuery}")`}
                  </div>
                </div>
              </div>

              {/* Articles Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
                {paginatedArticles.map((article) => (
                  <ArticleCard key={article.id} article={article} />
                ))}
              </div>

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
              {/* Recommended Articles */}
              <div className="bg-gray-800/80 backdrop-blur-sm rounded-lg p-6 border border-gray-600/40">
                <h3 className="text-white font-semibold text-lg mb-4">
                  บทความแนะนำ
                </h3>
                <div className="space-y-3">
                  {recommendedArticles.map((title, index) => (
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
                        "cursor-pointer transition-colors rounded-full",
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ArticlesPage;
