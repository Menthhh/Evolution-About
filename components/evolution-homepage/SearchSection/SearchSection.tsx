"use client";

import React, { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import SocialLinks from "../SocialLinks/SocialLinks";
import { SearchSectionProps } from "@/types/evolution-homepage";

const SearchSection: React.FC<SearchSectionProps> = ({
  onSearch,
  socialLinks,
}) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearch(searchQuery.trim());
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <Card className="bg-card/50 backdrop-blur-sm border-border/50 transition-all duration-300 ease-out hover:bg-card/70 hover:shadow-lg hover:-translate-y-1 hover:border-accent/30">
      <CardContent className="p-3 sm:p-4 lg:p-6 space-y-3 sm:space-y-4">
        {/* Search Box */}
        <form onSubmit={handleSubmit} className="space-y-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              type="text"
              placeholder="ค้นหาเนื้อหา..."
              value={searchQuery}
              onChange={handleInputChange}
              className="pl-10 pr-4 py-2 w-full bg-background/50 border-border/50 focus:border-accent focus:ring-accent/20 transition-all duration-200 touch-manipulation min-h-[44px]"
              aria-label="ค้นหาเนื้อหา"
            />
            {searchQuery && (
              <Button
                type="submit"
                size="sm"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 px-3 text-xs bg-accent hover:bg-accent/80 transition-colors touch-manipulation min-h-[32px]"
              >
                ค้นหา
              </Button>
            )}
          </div>
        </form>

        {/* Social Media Icons */}
        <SocialLinks links={socialLinks} />
      </CardContent>
    </Card>
  );
};

export default SearchSection;
