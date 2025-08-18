"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { NavigationProps } from "@/types/evolution-homepage";

/**
 * Navigation component with responsive design and hamburger menu for mobile
 * Features dark gray background, rounded corners, and gold active states
 */
const Navigation: React.FC<NavigationProps> = ({ items, activeItem }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="w-full flex justify-center px-4 py-4 relative z-50">
      <nav className="bg-gradient-to-r from-gray-800/70 via-gray-700/60 to-gray-800/70 backdrop-blur-sm rounded-full px-4 md:px-12 py-3 border border-gray-500/40 w-full max-w-6xl relative z-50 shadow-lg">
        <div className="flex items-center justify-between md:justify-center md:space-x-16">
          {/* Logo Section */}
          <Link
            href="/"
            className="flex items-center space-x-2 md:space-x-3 group cursor-pointer transition-all duration-300 hover:scale-105"
          >
            <div className="w-6 h-6 md:w-8 md:h-8 rounded-full overflow-hidden flex items-center justify-center bg-transparent transition-all duration-300 group-hover:shadow-lg group-hover:shadow-blue-400/50 group-hover:scale-110">
              <Image
                src="/logos/main-logo.png"
                alt="Evolution About Logo"
                width={32}
                height={32}
                className="w-full h-full object-cover transition-all duration-300 group-hover:brightness-125"
              />
            </div>
            <div className="flex flex-col transition-all duration-300">
              <span className="text-white font-sans font-bold text-sm md:text-base uppercase tracking-wide transition-all duration-300 group-hover:text-blue-400 group-hover:drop-shadow-[0_0_8px_rgba(59,130,246,0.8)]">
                EVOLUTION-ABOUT
              </span>
              <span className="text-gray-300 font-sans text-[8px] md:text-[10px] uppercase tracking-wider transition-all duration-300 group-hover:text-blue-300 group-hover:drop-shadow-[0_0_6px_rgba(147,197,253,0.6)]">
                IT&apos;S ALL ABOUT EVOLUTION
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-10">
            {items.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                className={cn(
                  "font-sans font-medium text-sm transition-colors duration-200 px-4 py-2 rounded-md whitespace-nowrap",
                  item.isActive || activeItem === item.id
                    ? "text-yellow-400"
                    : "text-white hover:text-yellow-400"
                )}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Mobile Hamburger Button */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden p-2 rounded-md text-white hover:text-yellow-400 hover:bg-white/10 transition-all duration-200 focus:outline-none active:scale-95"
            aria-label="Toggle mobile menu"
            aria-expanded={isMobileMenuOpen}
          >
            <svg
              className={cn(
                "w-6 h-6 transition-transform duration-200",
                isMobileMenuOpen && "rotate-90"
              )}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMobileMenuOpen ? (
                // Close icon
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                // Hamburger icon
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        <div
          className={cn(
            "md:hidden absolute top-full left-4 right-4 mt-2 bg-gradient-to-b from-gray-800/80 to-gray-900/80 backdrop-blur-sm rounded-2xl border border-gray-500/40 transition-all duration-300 z-50 shadow-lg",
            isMobileMenuOpen
              ? "opacity-100 translate-y-0 visible"
              : "opacity-0 -translate-y-2 invisible"
          )}
        >
          <nav className="px-4 py-4 space-y-2">
            {items.map((item, index) => (
              <Link
                key={item.id}
                href={item.href}
                onClick={closeMobileMenu}
                className={cn(
                  "block px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 transform",
                  item.isActive || activeItem === item.id
                    ? "bg-yellow-400/20 text-yellow-400 shadow-sm scale-105"
                    : "text-white hover:text-yellow-400 hover:bg-white/10 hover:scale-105",
                  "animate-in slide-in-from-top-2 duration-300"
                )}
                style={{
                  animationDelay: `${index * 50}ms`,
                }}
              >
                <div className="flex items-center justify-between">
                  <span>{item.label}</span>
                  {(item.isActive || activeItem === item.id) && (
                    <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse" />
                  )}
                </div>
              </Link>
            ))}
          </nav>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      {isMobileMenuOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/30 z-40"
          onClick={closeMobileMenu}
          aria-hidden="true"
        />
      )}
    </div>
  );
};

export default Navigation;
