/**
 * Centralized export for all sample data used in Evolution About homepage
 * This file provides easy access to all sample data for components and demos
 * Requirements: 4.1, 5.2, 5.3, 5.4, 6.1 - Complete sample data for all layout sections
 */

// Article data
export { sampleArticles } from "./sample-articles";

// Video data
export { sampleVideos } from "./sample-videos";

// Book data (publications)
export { sampleBooks, samplePublications } from "./sample-publications";

// Category data for sidebar
export { sampleCategories } from "./sample-categories";

// Content items for latest and popular sections
export { sampleLatestItems, samplePopularItems } from "./sample-content-items";

// Podcast episode data
export { samplePodcastEpisodes } from "./sample-podcast-episodes";

// Social media links
export { sampleSocialLinks } from "./sample-social-links";

// Navigation data
export { sampleNavigation } from "./sample-navigation";

// Re-export types for convenience
export type {
  Article,
  Video,
  Book,
  Category,
  ContentItem,
  PodcastEpisode,
  SocialLink,
  NavItem,
} from "@/types/evolution-homepage";
