"use client";

import React from "react";
import { MainLayout } from "./MainLayout";
import { MainContent } from "../MainContent/MainContent";

/**
 * Demo component to test MainLayout functionality
 * This demonstrates the two-column layout with proper responsive behavior
 */
export function MainLayoutDemo() {
  return (
    <MainLayout>
      {/* Main Content (Left Column) */}
      <MainContent>
        <div className="bg-card border border-border rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4">Main Content Area</h2>
          <p className="text-muted-foreground mb-4">
            This is the main content area that takes up approximately 70% of the
            width on desktop. It contains articles, videos, and books sections.
          </p>
          <div className="space-y-4">
            <div className="bg-muted/20 rounded-lg p-4">
              <h3 className="font-semibold mb-2">Articles Section</h3>
              <p className="text-sm text-muted-foreground">
                3-column grid of articles would go here
              </p>
            </div>
            <div className="bg-muted/20 rounded-lg p-4">
              <h3 className="font-semibold mb-2">Videos Section</h3>
              <p className="text-sm text-muted-foreground">
                Featured video and thumbnails would go here
              </p>
            </div>
            <div className="bg-muted/20 rounded-lg p-4">
              <h3 className="font-semibold mb-2">Books Section</h3>
              <p className="text-sm text-muted-foreground">
                3-column grid of books would go here
              </p>
            </div>
          </div>
        </div>
      </MainContent>

      {/* Sidebar (Right Column) */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h2 className="text-xl font-bold mb-4">Sidebar</h2>
        <p className="text-muted-foreground mb-4">
          This is the sidebar that has a fixed width of 400px on desktop. On
          mobile, it stacks below the main content.
        </p>
        <div className="space-y-4">
          <div className="bg-muted/20 rounded-lg p-3">
            <h4 className="font-medium mb-1">Search Section</h4>
            <p className="text-xs text-muted-foreground">
              Search box and social icons
            </p>
          </div>
          <div className="bg-muted/20 rounded-lg p-3">
            <h4 className="font-medium mb-1">Categories</h4>
            <p className="text-xs text-muted-foreground">
              Content categories list
            </p>
          </div>
          <div className="bg-muted/20 rounded-lg p-3">
            <h4 className="font-medium mb-1">Latest Content</h4>
            <p className="text-xs text-muted-foreground">
              Recent articles and videos
            </p>
          </div>
          <div className="bg-muted/20 rounded-lg p-3">
            <h4 className="font-medium mb-1">Popular Content</h4>
            <p className="text-xs text-muted-foreground">
              Most popular content
            </p>
          </div>
          <div className="bg-muted/20 rounded-lg p-3">
            <h4 className="font-medium mb-1">Podcast Section</h4>
            <p className="text-xs text-muted-foreground">
              Audio episodes with play buttons
            </p>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

export default MainLayoutDemo;
