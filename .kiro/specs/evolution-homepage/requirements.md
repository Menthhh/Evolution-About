# Requirements Document

## Introduction

This feature involves updating the Evolution About homepage layout to match a specific two-column design with a main content area (left column) and sidebar (right column). The layout will display articles in a 3-column grid, videos with a large featured video followed by smaller thumbnails, books in a 3-column grid, and a comprehensive sidebar with search, categories, latest content, popular content, and podcast sections.

**Technology Update**: The implementation uses Tailwind CSS with shadcn/ui component library for styling, providing a utility-first approach with consistent, accessible components.

## Requirements

### Requirement 1

**User Story:** As a visitor, I want to see a two-column layout with main content and sidebar, so that I can easily navigate between primary content and supplementary features.

#### Acceptance Criteria

1. WHEN the page loads THEN the system SHALL display a two-column layout with main content on the left (approximately 70% width) and sidebar on the right (approximately 30% width)
2. WHEN the layout renders THEN the system SHALL maintain consistent spacing between the main content and sidebar
3. WHEN viewed on desktop THEN the system SHALL keep both columns visible side by side
4. WHEN viewed on mobile devices THEN the system SHALL stack the sidebar below the main content

### Requirement 2

**User Story:** As a visitor, I want to see articles displayed in a 3-column grid in the main content area, so that I can browse multiple articles efficiently.

#### Acceptance Criteria

1. WHEN the articles section loads THEN the system SHALL display articles in a 3-column grid layout
2. WHEN displaying article cards THEN the system SHALL show thumbnail images, titles, author information, and engagement metrics for each article
3. WHEN article cards are displayed THEN the system SHALL use consistent card styling with proper spacing and hover effects
4. WHEN the articles grid renders THEN the system SHALL maintain equal column widths and consistent row heights

### Requirement 3

**User Story:** As a visitor, I want to see video content with a large featured video at the top followed by smaller video thumbnails, so that I can access both primary and secondary video content.

#### Acceptance Criteria

1. WHEN the videos section loads THEN the system SHALL display a large embedded YouTube video at the top of the section
2. WHEN the featured video is displayed THEN the system SHALL show the video title, description, and proper aspect ratio
3. WHEN below the featured video THEN the system SHALL display smaller video thumbnails in a horizontal row
4. WHEN displaying video thumbnails THEN the system SHALL show video titles and play button overlays

### Requirement 4

**User Story:** As a visitor, I want to see book covers displayed in a 3-column grid with titles, so that I can browse available publications.

#### Acceptance Criteria

1. WHEN the books section loads THEN the system SHALL display book covers in a 3-column grid layout
2. WHEN displaying book covers THEN the system SHALL show the cover image and book title below each cover
3. WHEN book items are displayed THEN the system SHALL maintain consistent spacing and alignment
4. WHEN hovering over book covers THEN the system SHALL provide visual feedback with hover effects

### Requirement 5

**User Story:** As a visitor, I want to see a comprehensive sidebar with search and navigation features, so that I can quickly find and access different types of content.

#### Acceptance Criteria

1. WHEN the sidebar loads THEN the system SHALL display a search box at the top with social media icon buttons
2. WHEN the sidebar renders THEN the system SHALL show a categories list for content organization
3. WHEN the sidebar displays THEN the system SHALL include a "Latest" section with links to recent articles and videos
4. WHEN the sidebar shows THEN the system SHALL include a "Popular" section with links to most popular content

### Requirement 6

**User Story:** As a visitor interested in audio content, I want to see a podcast section in the sidebar, so that I can access audio episodes with play functionality.

#### Acceptance Criteria

1. WHEN the sidebar loads THEN the system SHALL display a podcast section with a list of audio episodes
2. WHEN podcast episodes are shown THEN the system SHALL include episode titles and play buttons for each episode
3. WHEN displaying podcast content THEN the system SHALL maintain consistent styling with other sidebar sections
4. WHEN play buttons are clicked THEN the system SHALL provide audio playback functionality

### Requirement 7

**User Story:** As a visitor using any device, I want the layout to be responsive and maintain usability across different screen sizes, so that I can access content from desktop, tablet, or mobile devices.

#### Acceptance Criteria

1. WHEN viewed on desktop THEN the system SHALL maintain the two-column layout with proper proportions
2. WHEN viewed on tablet THEN the system SHALL adjust grid layouts to 2 columns for articles and books
3. WHEN viewed on mobile THEN the system SHALL stack all content vertically with single-column layouts
4. WHEN the layout adapts THEN the system SHALL preserve content hierarchy and maintain readability
