"use client";

import React from "react";
import { MainContent } from "./MainContent";
import { SectionTitle } from "./SectionTitle";

/**
 * Demo component to test MainContent functionality
 * This demonstrates the enhanced MainContent with section dividers and consistent typography
 */
export function MainContentDemo() {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">MainContent Component Demo</h1>

      <MainContent>
        {/* Articles Section */}
        <div>
          <SectionTitle>บทความ</SectionTitle>
          <div className="bg-card border border-border rounded-lg p-6">
            <p className="text-muted-foreground mb-4">
              This would be the articles section with a 3-column grid layout.
              The section title uses consistent Thai typography.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-muted/20 rounded-lg p-4">
                  <h4 className="font-semibold mb-2">Article {i}</h4>
                  <p className="text-sm text-muted-foreground">
                    Sample article content with proper spacing and typography.
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Videos Section */}
        <div>
          <SectionTitle>วิดีโอ</SectionTitle>
          <div className="bg-card border border-border rounded-lg p-6">
            <p className="text-muted-foreground mb-4">
              This would be the videos section with a featured video at the top
              and smaller thumbnails below.
            </p>
            <div className="space-y-4">
              <div className="bg-muted/20 rounded-lg p-4">
                <h4 className="font-semibold mb-2">Featured Video</h4>
                <p className="text-sm text-muted-foreground">
                  Large embedded YouTube video would go here
                </p>
              </div>
              <div className="flex gap-4 overflow-x-auto pb-2">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="bg-muted/20 rounded-lg p-3 min-w-[200px]"
                  >
                    <h5 className="font-medium text-sm">Video {i}</h5>
                    <p className="text-xs text-muted-foreground">Thumbnail</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Books Section */}
        <div>
          <SectionTitle>หนังสือ</SectionTitle>
          <div className="bg-card border border-border rounded-lg p-6">
            <p className="text-muted-foreground mb-4">
              This would be the books section with book covers in a 3-column
              grid.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="bg-muted/20 rounded-lg p-4 text-center">
                  <div className="bg-muted/40 rounded aspect-[3/4] mb-2 flex items-center justify-center">
                    <span className="text-xs text-muted-foreground">
                      Cover {i}
                    </span>
                  </div>
                  <h5 className="font-medium text-sm">Book Title {i}</h5>
                </div>
              ))}
            </div>
          </div>
        </div>
      </MainContent>
    </div>
  );
}

export default MainContentDemo;
