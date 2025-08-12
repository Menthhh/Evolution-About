"use client";

import React, { useState } from "react";
import { cn, evolutionClasses } from "@/lib/utils";
import { NavigationProps } from "@/types/evolution-homepage";

/**
 * Navigation component with Thai language support and responsive design
 * Requirements: 1.2, 6.2 - Thai language menu items and responsive navigation
 */
const Navigation: React.FC<NavigationProps> = ({ items, activeItem }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      {/* Desktop Navigation - horizontal menu */}
      <nav className="hidden md:flex items-center space-x-1">
        {items.map((item) => (
          <a
            key={item.id}
            href={item.href}
            className={cn(
              evolutionClasses.nav.link,
              "text-sm font-medium transition-all duration-200 relative group",
              // Active state styling
              (item.isActive || activeItem === item.id) && [
                evolutionClasses.nav.active,
                "after:absolute after:bottom-0 after:left-1/2 after:transform after:-translate-x-1/2 after:w-full after:h-0.5 after:bg-accent after:rounded-full",
              ],
              // Hover effects
              "hover:text-foreground hover:bg-muted/50 hover:scale-105"
            )}
          >
            {item.label}
            {/* Hover underline effect */}
            <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-accent rounded-full transition-all duration-200 group-hover:w-full" />
          </a>
        ))}
      </nav>

      {/* Mobile Menu Button */}
      <button
        onClick={toggleMobileMenu}
        className="md:hidden p-2 rounded-md hover:bg-muted transition-colors focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
        aria-label="Toggle mobile menu"
        aria-expanded={isMobileMenuOpen}
      >
        <svg
          className={cn(
            "w-5 h-5 text-foreground transition-transform duration-200",
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

      {/* Mobile Navigation Menu - responsive collapse */}
      <div
        className={cn(
          "md:hidden absolute top-full left-0 right-0 border-t border-border bg-background/95 backdrop-blur transition-all duration-300 z-50",
          isMobileMenuOpen
            ? "opacity-100 translate-y-0 visible"
            : "opacity-0 -translate-y-2 invisible"
        )}
      >
        <nav className="px-4 py-4 space-y-2 max-h-96 overflow-y-auto">
          {items.map((item, index) => (
            <a
              key={item.id}
              href={item.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className={cn(
                "block px-3 py-3 text-sm font-medium rounded-md transition-all duration-200 transform",
                // Active state styling for mobile
                item.isActive || activeItem === item.id
                  ? "bg-accent text-accent-foreground shadow-sm scale-105"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted hover:scale-105",
                // Staggered animation delay
                `animate-in slide-in-from-top-2 duration-300`,
                `delay-${index * 50}`
              )}
              style={{
                animationDelay: `${index * 50}ms`,
              }}
            >
              <div className="flex items-center justify-between">
                <span>{item.label}</span>
                {(item.isActive || activeItem === item.id) && (
                  <div className="w-2 h-2 bg-accent-foreground rounded-full animate-pulse" />
                )}
              </div>
            </a>
          ))}
        </nav>
      </div>

      {/* Mobile menu overlay */}
      {isMobileMenuOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
          onClick={() => setIsMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}
    </>
  );
};

export default Navigation;
