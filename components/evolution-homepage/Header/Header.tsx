"use client";

import React from "react";
import Navigation from "../Navigation";

interface HeaderComponentProps {
  navigationItems?: Array<{
    id: string;
    label: string;
    href: string;
    isActive?: boolean;
  }>;
}

const Header: React.FC<HeaderComponentProps> = ({ navigationItems = [] }) => {
  // Default navigation items with Thai language support
  const defaultNavItems = [
    {
      id: "home",
      label: "หน้าหลัก",
      href: "/evolution-homepage",
      isActive: true,
    },
    { id: "articles", label: "บทความ", href: "/articles" },
    { id: "publications", label: "หนังสือ", href: "/publications" },
    { id: "videos", label: "วิดีโอ", href: "/videos" },
    { id: "podcasts", label: "พอดแคสต์", href: "/podcasts" },
  ];

  const navItems =
    navigationItems.length > 0 ? navigationItems : defaultNavItems;

  return (
    <header className="sticky top-0 z-50">
      <div className="flex items-center justify-center w-full py-2">
        {/* Navigation only - centered */}
        <Navigation items={navItems} />
      </div>
    </header>
  );
};

export default Header;
