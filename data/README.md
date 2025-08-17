# Evolution About Sample Data

This directory contains comprehensive sample data for the Evolution About homepage layout. All data is designed to support the two-column layout with main content and sidebar sections.

## Data Files Overview

### Core Content Data

- **`sample-articles.ts`** - Article data for the 3-column articles grid

  - 6 authentic Thai articles from Evolution News Thailand
  - Includes thumbnails, authors, engagement metrics, and Thai titles
  - Supports Requirements: 2.1, 2.2, 2.4

- **`sample-videos.ts`** - Video data for featured video and thumbnails

  - 6 authentic YouTube videos with Thai titles
  - Includes YouTube IDs, thumbnails, durations, and view counts
  - Supports Requirements: 3.1, 3.2, 3.3

- **`sample-publications.ts`** - Book data for the 3-column books grid
  - 9 books including Evolution About series and educational materials
  - Thai language titles with cover images and author information
  - Supports Requirements: 4.1, 4.2

### Sidebar Data

- **`sample-categories.ts`** - Category navigation for sidebar

  - 10 Thai language categories with content counts
  - Covers evolution basics, genetics, fossils, biodiversity, etc.
  - Supports Requirements: 5.2

- **`sample-content-items.ts`** - Latest and popular content sections

  - 7 latest items and 7 popular items with mixed article/video types
  - Includes view counts, thumbnails, and publish dates
  - Supports Requirements: 5.3, 5.4

- **`sample-podcast-episodes.ts`** - Podcast episodes with audio playback
  - 8 podcast episodes with Thai titles and descriptions
  - Includes duration, audio URLs, and publish dates
  - Supports Requirements: 6.1, 6.2, 6.3

### Navigation and Social Data

- **`sample-navigation.ts`** - Header navigation items

  - Thai language menu items and social platform links
  - Supports Requirements: 1.2

- **`sample-social-links.ts`** - Social media platform links
  - Facebook and YouTube links for Evolution News Thailand
  - Supports Requirements: 5.1, 5.2

## Utility Files

### `index.ts`

Centralized export file for all sample data with type re-exports for easy importing.

### `demo-data.ts`

Pre-configured data sets for different demo scenarios:

- **`homepageDemo`** - Complete homepage data (recommended for production demo)
- **`minimalDemo`** - Reduced data set for testing
- **`extendedDemo`** - Full data sets for stress testing
- **`emptyDemo`** - Empty states for testing edge cases

## Usage Examples

### Import Individual Data Sets

```typescript
import { sampleArticles, sampleBooks, sampleCategories } from "@/data";
```

### Import Complete Demo Data

```typescript
import { homepageDemo } from "@/data/demo-data";

// Use in components
<ArticlesSection articles={homepageDemo.articles} />
<BooksSection books={homepageDemo.books} />
<Sidebar
  categories={homepageDemo.categories}
  latestItems={homepageDemo.latestItems}
  popularItems={homepageDemo.popularItems}
  podcastEpisodes={homepageDemo.podcastEpisodes}
/>
```

## Data Characteristics

### Language Support

- All content uses authentic Thai language text
- Proper Thai typography and character encoding
- Realistic Thai content structure and naming conventions

### Content Variety

- Mixed content types (articles, videos, books, podcasts)
- Realistic engagement metrics (views, likes, comments)
- Proper date formatting and chronological ordering
- Authentic Evolution News Thailand branding

### Layout Optimization

- Data quantities optimized for grid layouts (3-column, 2-column)
- Proper aspect ratios for thumbnails and cover images
- Consistent data structure across all content types
- Responsive design considerations built into data structure

## Requirements Coverage

This sample data fully satisfies the following task requirements:

- ✅ **4.1** - Book covers with proper grid layout data
- ✅ **5.2** - Categories list for content organization
- ✅ **5.3** - Latest content section with mixed types
- ✅ **5.4** - Popular content section with engagement metrics
- ✅ **6.1** - Podcast episodes with audio playback metadata

All data is production-ready and can be used directly in the Evolution About homepage components.
