# Implementation Plan

- [x] 1. Create updated TypeScript interfaces for new layout structure

  - Define Book interface for books section with cover image and title properties
  - Create Category interface for sidebar categories section
  - Define ContentItem interface for latest and popular sections
  - Create PodcastEpisode interface with audio playback properties
  - Update existing interfaces to match new layout requirements
  - _Requirements: 2.1, 4.1, 5.2, 5.3, 5.4, 6.1_

- [x] 2. Implement two-column main layout structure

  - Create MainLayout component with CSS Grid two-column layout using `grid-cols-[1fr_400px]`
  - Implement responsive behavior that stacks columns on mobile devices
  - Add proper gap spacing between main content and sidebar columns
  - Set up semantic HTML structure with proper ARIA labels for accessibility
  - _Requirements: 1.1, 1.2, 7.1_

- [x] 3. Build main content area (left column) container

  - Create MainContent component as flex column container for content sections
  - Implement proper spacing between articles, videos, and books sections
  - Add section dividers and consistent typography for section titles
  - Ensure proper responsive behavior for main content area
  - _Requirements: 1.1, 1.3, 7.3_

- [x] 4. Implement articles section with 3-column grid

- [x] 4.1 Create ArticlesSection component with grid layout

  - Build articles container with `grid-cols-1 md:grid-cols-2 lg:grid-cols-3` responsive grid
  - Add section title "บทความ" with proper Thai typography
  - Implement proper spacing and alignment for article cards
  - _Requirements: 2.1, 2.4, 7.2_

- [x] 4.2 Update ArticleCard component for grid display

  - Modify existing ArticleCard to work within 3-column grid layout
  - Ensure consistent card heights and proper image aspect ratios
  - Add hover effects with transform and shadow transitions
  - Implement responsive text sizing for different screen sizes
  - _Requirements: 2.1, 2.2, 2.3_

- [x] 5. Build videos section with featured video and thumbnails

- [x] 5.1 Create VideosSection container component

  - Build videos section with title "วิดีโอ" and proper spacing
  - Implement layout structure for featured video at top and thumbnails below
  - Add responsive behavior for video section on different screen sizes
  - _Requirements: 3.1, 3.2, 7.2_

- [x] 5.2 Implement FeaturedVideo component with YouTube embed

  - Create large YouTube video embed with responsive 16:9 aspect ratio
  - Add video title and description display below the embedded player
  - Implement proper loading states and error handling for video embeds
  - Ensure video player works correctly on mobile devices
  - _Requirements: 3.1, 3.2_

- [x] 5.3 Create VideoThumbnails horizontal scroll component

  - Build horizontal scrolling container for smaller video thumbnails
  - Implement video thumbnail cards with play button overlays
  - Add smooth scrolling behavior and proper touch interaction for mobile
  - Create consistent thumbnail sizing and spacing
  - _Requirements: 3.3, 3.4_

- [x] 6. Implement books section with 3-column grid

- [x] 6.1 Create BooksSection component with grid layout

  - Build books container with `grid-cols-2 md:grid-cols-3` responsive grid
  - Add section title "หนังสือ" with consistent typography
  - Implement proper spacing between book items
  - _Requirements: 4.1, 4.2, 7.2_

- [x] 6.2 Build BookCard component for book covers and titles

  - Create book card with cover image and title below
  - Implement consistent aspect ratio for book cover images
  - Add hover effects with scale transform animation
  - Ensure proper text wrapping and truncation for long book titles
  - _Requirements: 4.1, 4.2, 4.3_

- [x] 7. Create comprehensive sidebar (right column) structure

- [x] 7.1 Build Sidebar container component

  - Create sidebar with fixed 400px width on desktop, full width on mobile
  - Implement vertical stack layout with consistent spacing between sections
  - Add responsive behavior that moves sidebar below content on mobile
  - Set up proper background and border styling for sidebar
  - _Requirements: 1.2, 5.1, 7.1, 7.4_

- [x] 7.2 Implement SearchSection with search box and social icons

  - Create search input component with search icon and proper styling
  - Build row of social media icon buttons below search box
  - Implement hover effects and proper accessibility for social icons
  - Add search functionality with proper form handling
  - _Requirements: 5.1, 5.2_

- [x] 8. Build sidebar content sections

- [ ] 8. Build sidebar content sections

- [x] 8.1 Create CategoriesSection component

  - Build categories list with proper Thai language category names
  - Implement category links with hover effects and active states
  - Add category item counts if available
  - Ensure proper spacing and typography for category list
  - _Requirements: 5.2_

- [x] 8.2 Implement LatestSection for recent content

  - Create list of recent articles and videos with timestamps
  - Add small thumbnail images for latest content items
  - Implement proper link styling and hover effects
  - Show content type indicators (article vs video)
  - _Requirements: 5.3_

- [x] 8.3 Build PopularSection for popular content

  - Create list of popular content with view counts or engagement metrics
  - Add popularity indicators (view counts, likes, etc.)
  - Implement consistent styling with LatestSection
  - Show trending or popular content badges
  - _Requirements: 5.4_

- [x] 8.4 Create PodcastSection with audio playback

  - Build list of podcast episodes with titles and durations
  - Implement play buttons for each podcast episode
  - Add HTML5 audio player integration for podcast playback
  - Create progress indicators and playback controls
  - _Requirements: 6.1, 6.2, 6.3_

- [x] 9. Implement responsive design and mobile optimization

- [x] 9.1 Add responsive breakpoints and mobile layout

  - Implement mobile-first responsive design with proper breakpoints
  - Ensure two-column layout stacks properly on mobile devices
  - Adjust grid layouts for tablet and mobile screen sizes
  - Test touch interactions and mobile usability
  - _Requirements: 7.1, 7.2, 7.3, 7.4_

- [x] 9.2 Optimize sidebar for mobile devices

  - Implement collapsible sidebar sections for mobile
  - Ensure proper touch targets for all interactive elements
  - Add mobile-specific spacing and typography adjustments
  - Test horizontal scrolling for video thumbnails on mobile
  - _Requirements: 7.3, 7.4_

- [x] 10. Create sample data for new layout sections

  - Generate sample book data with cover images and titles
  - Create sample category data for sidebar categories section
  - Build sample podcast episode data with audio URLs and metadata
  - Generate sample content for latest and popular sections
  - _Requirements: 4.1, 5.2, 5.3, 5.4, 6.1_

- [x] 11. Integrate all components and test complete layout

  - Combine all components into the complete two-column homepage layout
  - Test responsive behavior across all screen sizes and devices
  - Verify proper spacing, alignment, and visual hierarchy
  - Ensure all interactive elements work correctly (search, play buttons, links)
  - Test Thai language content display and typography
  - _Requirements: 1.1, 1.2, 1.3, 1.4, 7.1, 7.2, 7.3, 7.4_
