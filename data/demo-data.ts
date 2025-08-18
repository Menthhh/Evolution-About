/**
 * Demo data configuration for Evolution About homepage
 * This file provides pre-configured data sets for different demo scenarios
 * Requirements: 4.1, 5.2, 5.3, 5.4, 6.1 - Complete demo data for all sections
 */

import {
  sampleArticles,
  sampleVideos,
  sampleBooks,
  sampleCategories,
  sampleLatestItems,
  samplePopularItems,
  samplePodcastEpisodes,
  sampleSocialLinks,
} from "./index";

/**
 * Complete homepage demo data
 * Contains all data needed for the full two-column layout
 */
export const homepageDemo = {
  // Main content sections
  articles: sampleArticles.slice(0, 9), // 3x3 grid for articles
  featuredVideo: sampleVideos[0], // First video as featured
  videos: sampleVideos.slice(1, 6), // 5 videos for thumbnails
  books: sampleBooks.slice(0, 9), // 3x3 grid for books

  // Sidebar sections
  categories: sampleCategories,
  latestItems: sampleLatestItems.slice(0, 5), // 5 latest items
  popularItems: samplePopularItems.slice(0, 5), // 5 popular items
  podcastEpisodes: samplePodcastEpisodes.slice(0, 6), // 6 podcast episodes
  socialLinks: sampleSocialLinks,

  // Search functionality
  searchProps: {
    onSearch: (query: string) => console.log("Search:", query),
    socialLinks: sampleSocialLinks,
  },
};

/**
 * Minimal demo data for testing
 * Contains reduced data sets for faster loading and testing
 */
export const minimalDemo = {
  articles: sampleArticles.slice(0, 3),
  featuredVideo: sampleVideos[0],
  videos: sampleVideos.slice(1, 3),
  books: sampleBooks.slice(0, 3),
  categories: sampleCategories.slice(0, 5),
  latestItems: sampleLatestItems.slice(0, 3),
  popularItems: samplePopularItems.slice(0, 3),
  podcastEpisodes: samplePodcastEpisodes.slice(0, 3),
  socialLinks: sampleSocialLinks,
};

/**
 * Extended demo data for stress testing
 * Contains full data sets to test component performance with larger datasets
 */
export const extendedDemo = {
  articles: sampleArticles,
  featuredVideo: sampleVideos[0],
  videos: sampleVideos,
  books: sampleBooks,
  categories: sampleCategories,
  latestItems: sampleLatestItems,
  popularItems: samplePopularItems,
  podcastEpisodes: samplePodcastEpisodes,
  socialLinks: sampleSocialLinks,
};

/**
 * Empty demo data for testing empty states
 */
export const emptyDemo = {
  articles: [],
  featuredVideo: sampleVideos[0], // Keep one video to avoid errors
  videos: [],
  books: [],
  categories: [],
  latestItems: [],
  popularItems: [],
  podcastEpisodes: [],
  socialLinks: sampleSocialLinks, // Keep social links for functionality
};
