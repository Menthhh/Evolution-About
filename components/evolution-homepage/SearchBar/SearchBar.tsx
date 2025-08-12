"use client";

import React, { useState, useRef } from "react";
import { Search, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { SearchBarProps } from "@/types/evolution-homepage";

/**
 * SearchBar component with dark theme utilities and Lucide React icons
 * Requirements: 1.3 - Search bar with proper positioning and focus states
 */
const SearchBar: React.FC<SearchBarProps> = ({
  placeholder,
  onSearch,
  variant = "dark",
}) => {
  const [searchValue, setSearchValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);
    onSearch(value);
  };

  const handleClear = () => {
    setSearchValue("");
    onSearch("");
    inputRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Escape") {
      handleClear();
      inputRef.current?.blur();
    }
  };

  // Variant-specific styling
  const variantClasses = {
    light: {
      container: "bg-white border-gray-300 focus-within:border-accent",
      input: "text-gray-900 placeholder:text-gray-500",
      icon: "text-gray-500",
    },
    dark: {
      container: "bg-muted border-border focus-within:border-accent",
      input: "text-foreground placeholder:text-muted-foreground",
      icon: "text-muted-foreground",
    },
  };

  const currentVariant = variantClasses[variant];

  return (
    <div className="flex items-center">
      {/* Desktop Search Bar - responsive width */}
      <div className="hidden sm:flex items-center">
        <div
          className={cn(
            "relative flex items-center w-48 sm:w-56 lg:w-64 transition-all duration-300 ease-out",
            isFocused && "w-56 sm:w-64 lg:w-72 transform scale-105"
          )}
        >
          <div
            className={cn(
              "relative flex items-center w-full border rounded-md transition-all duration-200 ease-out",
              currentVariant.container,
              isFocused &&
                "ring-2 ring-accent/20 shadow-lg shadow-accent/10 border-accent/50"
            )}
          >
            {/* Search Icon */}
            <Search
              className={cn(
                "absolute left-3 w-4 h-4 transition-all duration-200 ease-out",
                currentVariant.icon,
                isFocused && "text-accent transform scale-110"
              )}
            />

            {/* Search Input */}
            <input
              ref={inputRef}
              type="search"
              value={searchValue}
              onChange={handleInputChange}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              onKeyDown={handleKeyDown}
              placeholder={placeholder}
              className={cn(
                "w-full pl-10 pr-10 py-2 text-sm bg-transparent border-none outline-none transition-all duration-200",
                currentVariant.input
              )}
              autoComplete="off"
              spellCheck="false"
            />

            {/* Clear Button */}
            {searchValue && (
              <button
                onClick={handleClear}
                className={cn(
                  "absolute right-3 p-0.5 rounded-full transition-all duration-200 ease-out hover:bg-muted-foreground/10",
                  "hover:scale-110 active:scale-95",
                  currentVariant.icon,
                  "hover:text-foreground"
                )}
                aria-label="Clear search"
              >
                <X className="w-3 h-3" />
              </button>
            )}
          </div>

          {/* Enhanced search suggestions with animations */}
          {isFocused && searchValue && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-background border border-border rounded-md shadow-lg z-50 max-h-64 overflow-y-auto animate-in slide-in-from-top-2 duration-200">
              <div className="p-3 text-sm text-muted-foreground flex items-center gap-2">
                <div className="w-3 h-3 border-2 border-accent border-t-transparent rounded-full animate-spin" />
                กำลังค้นหา &quot;{searchValue}&quot;...
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Enhanced Mobile Search Button */}
      <button
        className="sm:hidden p-2 rounded-md hover:bg-muted transition-all duration-200 ease-out hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 touch-manipulation min-h-[44px] min-w-[44px] flex items-center justify-center"
        onClick={() => {
          // This could trigger a mobile search modal
          console.log("Mobile search clicked");
        }}
        aria-label="Search"
      >
        <Search className="w-5 h-5 text-foreground" />
      </button>
    </div>
  );
};

export default SearchBar;
