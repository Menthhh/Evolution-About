"use client";

import React from "react";
import { cn, evolutionClasses } from "@/lib/utils";
import Logo from "../Logo";
import Navigation from "../Navigation";
import SearchBar from "../SearchBar";

interface HeaderComponentProps {
  logoSrc?: string;
  navigationItems?: Array<{
    id: string;
    label: string;
    href: string;
    isActive?: boolean;
  }>;
  onSearch?: (query: string) => void;
}

const Header: React.FC<HeaderComponentProps> = ({
  logoSrc,
  navigationItems = [],
  onSearch,
}) => {
  // Default navigation items with Thai language support
  const defaultNavItems = [
    { id: "home", label: "หน้าแรก", href: "/", isActive: true },
    { id: "articles", label: "บทความ", href: "/articles" },
    { id: "videos", label: "วิดีโอ", href: "/videos" },
    { id: "publications", label: "สิ่งพิมพ์", href: "/publications" },
    { id: "about", label: "เกี่ยวกับเรา", href: "/about" },
  ];

  const navItems =
    navigationItems.length > 0 ? navigationItems : defaultNavItems;

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b",
        evolutionClasses.visual.backdrop,
        evolutionClasses.visual.border,
        evolutionClasses.visual.shadow
      )}
    >
      <div
        className={cn(
          evolutionClasses.container,
          "h-14 sm:h-16 lg:h-18 flex items-center justify-between"
        )}
      >
        {/* Left side: Logo and Navigation */}
        <div className="flex items-center gap-2 sm:gap-4 lg:gap-8 flex-1 min-w-0">
          {/* Logo component - responsive sizing */}
          <div className="flex-shrink-0">
            <Logo
              src={logoSrc || "/logos/main-logo.png"}
              alt="Evolution About Logo"
              size="medium"
            />
          </div>

          {/* Navigation component - hidden on mobile, shown on desktop */}
          <div className="hidden md:flex flex-1">
            <Navigation items={navItems} />
          </div>
        </div>

        {/* Right side: Search and Mobile Navigation */}
        <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0">
          {/* Search bar component - responsive */}
          <SearchBar
            placeholder="ค้นหา..."
            onSearch={onSearch || (() => {})}
            variant="dark"
          />

          {/* Mobile Navigation - shown only on mobile */}
          <div className="md:hidden">
            <Navigation items={navItems} />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
