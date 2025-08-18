# Design Document

## Overview

The Evolution About homepage will be built as a two-column layout component-based UI using modern web technologies. The design follows a dark theme with a scientific aesthetic, featuring a main content area (left column) with articles, videos, and books sections, and a comprehensive sidebar (right column) with search, categories, latest content, popular content, and podcast sections.

## Architecture

### Technology Stack

- **Frontend Framework**: React with TypeScript
- **Styling**: Tailwind CSS for utility-first styling with shadcn/ui component library
- **Layout**: CSS Grid and Flexbox utilities from Tailwind for two-column responsive layouts
- **Icons**: Lucide React icons for consistent iconography
- **Images**: Next.js Image component with optimized web formats (WebP, PNG) and proper alt text
- **Audio**: HTML5 audio elements for podcast playback functionality

### Component Hierarchy

```
HomePage
├── Header
│   ├── Logo
│   ├── Navigation
│   └── SearchBar
├── MainLayout (Two-column container)
│   ├── MainContent (Left Column - 70% width)
│   │   ├── ArticlesSection
│   │   │   └── ArticleCard (×9 in 3-column grid)
│   │   ├── VideosSection
│   │   │   ├── FeaturedVideo (Large embedded video)
│   │   │   └── VideoThumbnails (Horizontal row)
│   │   └── BooksSection
│   │       └── BookCard (×6+ in 3-column grid)
│   └── Sidebar (Right Column - 30% width)
│       ├── SearchSection
│       │   ├── SearchBox
│       │   └── SocialMediaIcons
│       ├── CategoriesSection
│       ├── LatestSection
│       ├── PopularSection
│       └── PodcastSection
│           └── PodcastEpisode (×multiple with play buttons)
```

## Components and Interfaces

### MainLayout Component

**Purpose**: Two-column layout container
**Props**:

- `children: ReactNode` - Main content and sidebar components

**Implementation**:

- Uses CSS Grid with `grid-cols-[1fr_400px]` for desktop layout
- Responsive design that stacks on mobile with `lg:grid-cols-[1fr_400px] grid-cols-1`
- Proper gap spacing using Tailwind utilities

### MainContent Component

**Purpose**: Left column container for primary content sections
**Props**:

- `children: ReactNode` - Articles, videos, and books sections

**Implementation**:

- Flex column layout with proper spacing between sections
- Full width on mobile, 70% width on desktop

### ArticlesSection Component

**Purpose**: Display articles in 3-column grid
**Props**:

- `articles: Article[]` - Array of articles to display
- `title: string` - Section title (default: "บทความ")

**Implementation**:

- Grid layout with `grid-cols-1 md:grid-cols-2 lg:grid-cols-3`
- Section header with Thai typography
- Responsive grid that adapts to screen size

### ArticleCard Component

**Purpose**: Individual article display in grid
**Props**:

- `article: Article` - Article data object

**Implementation**:

- Card design with thumbnail, title, author, and engagement metrics
- Hover effects with transform and shadow transitions
- Consistent aspect ratio for thumbnails

**Article Interface**:

```typescript
interface Article {
  id: string;
  title: string;
  author: string;
  thumbnail: string;
  excerpt?: string;
  publishDate: string;
  readTime?: string;
  likes: number;
  comments: number;
  href: string;
}
```

### VideosSection Component

**Purpose**: Display featured video and thumbnail row
**Props**:

- `featuredVideo: Video` - Large video to display at top
- `videos: Video[]` - Array of videos for thumbnail row
- `title: string` - Section title (default: "วิดีโอ")

**Implementation**:

- Featured video with large embedded YouTube player
- Horizontal scrolling row of video thumbnails below
- Responsive video player with proper aspect ratio

### FeaturedVideo Component

**Purpose**: Large embedded YouTube video display
**Props**:

- `video: Video` - Video data with YouTube ID
- `autoplay?: boolean` - Auto-play setting

**Implementation**:

- YouTube iframe embed with responsive aspect ratio
- Video title and description below player
- Proper loading states and error handling

### VideoThumbnails Component

**Purpose**: Horizontal row of smaller video previews
**Props**:

- `videos: Video[]` - Array of videos for thumbnails

**Implementation**:

- Horizontal scroll container with `overflow-x-auto`
- Thumbnail cards with play button overlays
- Smooth scrolling behavior

**Video Interface**:

```typescript
interface Video {
  id: string;
  title: string;
  thumbnail: string;
  duration: string;
  youtubeId: string;
  description?: string;
  views?: number;
}
```

### BooksSection Component

**Purpose**: Display book covers in 3-column grid
**Props**:

- `books: Book[]` - Array of books to display
- `title: string` - Section title (default: "หนังสือ")

**Implementation**:

- Grid layout with `grid-cols-2 md:grid-cols-3`
- Book covers with titles below
- Hover effects for interactive feedback

### BookCard Component

**Purpose**: Individual book display with cover and title
**Props**:

- `book: Book` - Book data object

**Implementation**:

- Book cover image with consistent aspect ratio
- Book title below cover with proper typography
- Hover effects with subtle animations

**Book Interface**:

```typescript
interface Book {
  id: string;
  title: string;
  coverImage: string;
  author?: string;
  year?: string;
  href?: string;
}
```

### Sidebar Component

**Purpose**: Right column container for all sidebar sections
**Props**:

- `searchProps: SearchSectionProps`
- `categories: Category[]`
- `latestItems: ContentItem[]`
- `popularItems: ContentItem[]`
- `podcastEpisodes: PodcastEpisode[]`

**Implementation**:

- Fixed width of 400px on desktop, full width on mobile
- Vertical stack of sections with consistent spacing
- Sticky positioning for better user experience

### SearchSection Component

**Purpose**: Search box with social media icons
**Props**:

- `onSearch: (query: string) => void` - Search callback
- `socialLinks: SocialLink[]` - Social media links

**Implementation**:

- Search input with search icon
- Row of social media icon buttons below search
- Consistent styling with other sidebar sections

### CategoriesSection Component

**Purpose**: List of content categories for navigation
**Props**:

- `categories: Category[]` - Array of category items

**Implementation**:

- Vertical list of category links
- Hover effects and active states
- Thai language category names

**Category Interface**:

```typescript
interface Category {
  id: string;
  name: string;
  href: string;
  count?: number;
}
```

### LatestSection Component

**Purpose**: Links to most recent articles and videos
**Props**:

- `items: ContentItem[]` - Array of recent content

**Implementation**:

- Vertical list of content links with timestamps
- Mixed content types (articles and videos)
- Truncated titles with proper ellipsis

### PopularSection Component

**Purpose**: Links to most popular content
**Props**:

- `items: ContentItem[]` - Array of popular content

**Implementation**:

- Similar to LatestSection but with popularity indicators
- View counts or engagement metrics display
- Consistent link styling

**ContentItem Interface**:

```typescript
interface ContentItem {
  id: string;
  title: string;
  type: "article" | "video";
  href: string;
  publishDate: string;
  views?: number;
  thumbnail?: string;
}
```

### PodcastSection Component

**Purpose**: List of podcast episodes with play functionality
**Props**:

- `episodes: PodcastEpisode[]` - Array of podcast episodes

**Implementation**:

- List of episodes with play buttons
- Audio player integration
- Episode titles and duration display

### PodcastEpisode Component

**Purpose**: Individual podcast episode with play button
**Props**:

- `episode: PodcastEpisode` - Episode data
- `onPlay: (episodeId: string) => void` - Play callback

**Implementation**:

- Episode title and duration
- Play/pause button with audio controls
- Progress indicator for current playing episode

**PodcastEpisode Interface**:

```typescript
interface PodcastEpisode {
  id: string;
  title: string;
  duration: string;
  audioUrl: string;
  publishDate: string;
  description?: string;
}
```

**SocialLink Interface**:

```typescript
interface SocialLink {
  platform: "facebook" | "youtube" | "twitter" | "instagram";
  url: string;
  label: string;
}
```

## Data Models

### Layout Configuration

```typescript
interface LayoutConfig {
  mainContent: {
    width: string; // "70%" on desktop
    maxWidth: string; // "1200px"
  };
  sidebar: {
    width: string; // "400px" fixed width on desktop
    minWidth: string; // "300px"
  };
  grid: {
    articles: {
      desktop: number; // 3 columns
      tablet: number; // 2 columns
      mobile: number; // 1 column
    };
    books: {
      desktop: number; // 3 columns
      tablet: number; // 2 columns
      mobile: number; // 2 columns
    };
  };
  spacing: {
    sectionGap: string; // "2rem"
    cardGap: string; // "1.5rem"
    sidebarGap: string; // "1.5rem"
  };
}
```

### Theme Configuration

```typescript
interface ThemeConfig {
  colors: {
    primary: string;
    secondary: string;
    background: string;
    surface: string;
    text: string;
    textSecondary: string;
    accent: string;
    border: string;
  };
  typography: {
    sectionTitle: string; // Thai font settings
    cardTitle: string;
    bodyText: string;
  };
  breakpoints: {
    mobile: string; // "640px"
    tablet: string; // "768px"
    desktop: string; // "1024px"
    large: string; // "1280px"
  };
}
```

## Error Handling

### Image Loading

- Implement fallback images for broken thumbnails
- Use loading states for image components
- Provide alt text for accessibility

### Content Loading

- Display skeleton loaders while content loads
- Handle empty states gracefully
- Show error messages for failed content loads

### Responsive Behavior

- Graceful degradation for smaller screens
- Maintain functionality across all breakpoints
- Handle orientation changes on mobile devices

## Testing Strategy

As per requirements, no unit tests or integration tests will be implemented. The focus is purely on UI implementation and visual testing through browser development.

### Manual Testing Approach

- Cross-browser compatibility testing (Chrome, Firefox, Safari, Edge)
- Responsive design testing across different screen sizes
- Visual regression testing by comparing with reference design
- Accessibility testing using browser dev tools
- Performance testing for image loading and rendering

### Development Testing

- Component isolation testing using Storybook (optional)
- Hot reload testing during development
- CSS-only interaction testing (hover states, transitions)

## Styling Architecture

### Tailwind CSS Organization

```
app/
├── globals.css          # Tailwind directives and CSS custom properties
lib/
├── utils.ts            # Tailwind utility functions and Evolution-specific classes
components/
├── ui/                 # shadcn/ui components (Card, Button, Input, etc.)
└── evolution-homepage/ # Feature-specific components with Tailwind classes
tailwind.config.ts      # Tailwind configuration with Evolution theme colors
```

### Design System

- **Two-Column Layout**: CSS Grid with `grid-cols-[1fr_400px]` for desktop, stacked on mobile
- **Component Library**: shadcn/ui for consistent, accessible UI components
- **Custom Utilities**: Evolution-specific utility classes in `lib/utils.ts`
- **Color System**: Extended Tailwind palette with Evolution brand colors
- **Typography**: Tailwind typography utilities with Thai language support
- **Spacing**: Consistent spacing scale for sections and components
- **Animations**: Smooth transitions for hover effects and interactions

### Responsive Design Strategy

- **Desktop First**: Two-column layout with fixed sidebar width (400px)
- **Tablet**: Adjusted grid columns (3→2 for articles, 3→2 for books)
- **Mobile**: Single column stack with full-width sidebar below content
- **Breakpoints**: lg: (1024px) for two-column, md: (768px) for grid adjustments
- **Touch-Friendly**: Proper button sizes and spacing for mobile interaction

### Evolution-Specific Layout Utilities

```typescript
// Available in lib/utils.ts
evolutionClasses = {
  layout: {
    twoColumn: "grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-8",
    mainContent: "space-y-8",
    sidebar: "space-y-6",
  },
  grid: {
    articles: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6",
    books: "grid grid-cols-2 md:grid-cols-3 gap-4",
    videoThumbnails: "flex gap-4 overflow-x-auto pb-4",
  },
  card: {
    base: "bg-card border border-border rounded-lg overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1",
    article:
      "bg-card border border-border rounded-lg overflow-hidden transition-all duration-300 hover:shadow-lg",
    book: "bg-card border border-border rounded-lg overflow-hidden transition-transform duration-300 hover:scale-105",
  },
  section: {
    title: "text-2xl font-bold text-foreground mb-6",
    container: "space-y-6",
  },
  sidebar: {
    section: "bg-card border border-border rounded-lg p-4",
    list: "space-y-2",
    item: "text-sm text-muted-foreground hover:text-foreground transition-colors",
  },
};
```

### Video Integration

- **Featured Video**: Responsive YouTube embed with 16:9 aspect ratio
- **Video Thumbnails**: Horizontal scrolling container with play button overlays
- **Audio Player**: HTML5 audio controls for podcast episodes
- **Media Queries**: Proper responsive behavior for video content
