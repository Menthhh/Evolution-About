# Design Document

## Overview

The Evolution About homepage will be built as a component-based UI using modern web technologies. The design follows a dark theme with a scientific aesthetic, featuring a DNA helix motif and professional layout. The page will be structured as reusable components that can be easily maintained and extended.

## Architecture

### Technology Stack

- **Frontend Framework**: React with TypeScript
- **Styling**: Tailwind CSS for utility-first styling with shadcn/ui component library
- **Layout**: CSS Grid and Flexbox utilities from Tailwind for responsive layouts
- **Icons**: Lucide React icons for consistent iconography
- **Images**: Next.js Image component with optimized web formats (WebP, PNG) and proper alt text

### Component Hierarchy

```
HomePage
├── Header
│   ├── Logo
│   ├── Navigation
│   └── SearchBar
├── HeroSection
├── FeaturedArticles
│   └── ArticleCard (×3)
├── VideoSection
│   └── VideoCard (×multiple)
├── PublicationsGallery
│   └── PublicationCard (×multiple)
└── Sidebar
    ├── SocialLinks
    └── AdditionalContent
```

## Components and Interfaces

### Header Component

**Purpose**: Top navigation and branding
**Props**:

- `logoSrc: string` - Evolution About logo image
- `navigationItems: NavItem[]` - Menu items array
- `onSearch: (query: string) => void` - Search handler

**Structure**:

- Sticky header with backdrop blur using Tailwind utilities
- Logo with DNA helix on the left using Tailwind flex layout
- Horizontal navigation menu in center (hidden on mobile with `hidden md:flex`)
- Search bar on the right using shadcn/ui Input component
- Responsive design with Tailwind responsive prefixes

### Logo Component

**Purpose**: Brand identity display
**Props**:

- `src: string` - Logo image source
- `alt: string` - Accessibility text
- `size?: 'small' | 'medium' | 'large'` - Size variant

### Navigation Component

**Purpose**: Main site navigation
**Props**:

- `items: NavItem[]` - Navigation menu items
- `activeItem?: string` - Currently active menu item

**NavItem Interface**:

```typescript
interface NavItem {
  id: string;
  label: string;
  href: string;
  isActive?: boolean;
}
```

### SearchBar Component

**Purpose**: Content search functionality
**Props**:

- `placeholder: string` - Search input placeholder
- `onSearch: (query: string) => void` - Search callback
- `variant?: 'light' | 'dark'` - Theme variant

**Implementation**:

- Uses Tailwind CSS for styling with focus states
- Integrates Lucide React Search icon
- Responsive width with Tailwind utilities

### FeaturedArticles Component

**Purpose**: Showcase main articles
**Props**:

- `articles: Article[]` - Array of featured articles
- `maxItems?: number` - Maximum articles to display (default: 3)

### ArticleCard Component

**Purpose**: Individual article display
**Props**:

- `article: Article` - Article data object
- `size?: 'small' | 'medium' | 'large'` - Card size variant

**Implementation**:

- Uses evolutionClasses.card.base for consistent styling
- Next.js Image component for optimized thumbnails
- Lucide React icons for engagement metrics (Heart, MessageCircle, Clock)
- Tailwind hover effects and transitions

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

### VideoSection Component

**Purpose**: Display video content
**Props**:

- `videos: Video[]` - Array of video items
- `title: string` - Section title
- `layout?: 'grid' | 'list'` - Display layout

### VideoCard Component

**Purpose**: Individual video display
**Props**:

- `video: Video` - Video data object
- `autoplay?: boolean` - Auto-play setting

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

### PublicationsGallery Component

**Purpose**: Display book/publication covers
**Props**:

- `publications: Publication[]` - Array of publications
- `columns?: number` - Grid columns (default: 3)

### PublicationCard Component

**Purpose**: Individual publication display
**Props**:

- `publication: Publication` - Publication data

**Publication Interface**:

```typescript
interface Publication {
  id: string;
  title: string;
  coverImage: string;
  volume?: string;
  year?: string;
  href?: string;
}
```

### Sidebar Component

**Purpose**: Secondary content and social links
**Props**:

- `socialLinks: SocialLink[]` - Social media links
- `additionalContent?: ReactNode` - Extra sidebar content

**Implementation**:

- Uses shadcn/ui Card components for consistent styling
- Tailwind spacing utilities for layout
- Responsive design with Tailwind grid system

### SocialLinks Component

**Purpose**: Social media integration
**Props**:

- `links: SocialLink[]` - Social platform links

**Implementation**:

- Lucide React icons for social platforms (Facebook, Youtube, Twitter, Instagram)
- Tailwind hover effects and color transitions
- Accessible link styling with proper ARIA labels

**SocialLink Interface**:

```typescript
interface SocialLink {
  platform: "facebook" | "youtube" | "twitter" | "instagram";
  url: string;
  label: string;
}
```

## Data Models

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
  };
  spacing: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
  breakpoints: {
    mobile: string;
    tablet: string;
    desktop: string;
  };
}
```

### Layout Configuration

```typescript
interface LayoutConfig {
  maxWidth: string;
  gridGap: string;
  sidebarWidth: string;
  headerHeight: string;
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

- **Utility Classes**: Tailwind CSS utility-first approach for rapid development
- **Component Library**: shadcn/ui for consistent, accessible UI components
- **Custom Utilities**: Evolution-specific utility classes in `lib/utils.ts`
- **Color System**: Extended Tailwind palette with Evolution brand colors
- **Typography**: Tailwind typography utilities with custom heading classes
- **Spacing**: Tailwind spacing scale with consistent units
- **Animations**: Tailwind CSS animations with custom transitions

### Responsive Design Strategy

- **Mobile-first**: Tailwind's responsive prefix system (sm:, md:, lg:, xl:)
- **Breakpoints**: Standard Tailwind breakpoints (640px, 768px, 1024px, 1280px, 1536px)
- **Grid Systems**: Tailwind Grid utilities for flexible layouts
- **Typography**: Responsive text sizing with Tailwind utilities
- **Interactive Elements**: Touch-friendly sizing using Tailwind spacing classes

### Evolution-Specific Utilities

```typescript
// Available in lib/utils.ts
evolutionClasses = {
  container: "max-w-6xl mx-auto px-4 sm:px-6 lg:px-8",
  grid: {
    articles: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6",
    videos: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6",
    publications: "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4",
  },
  card: {
    base: "bg-card border border-border rounded-lg overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1",
  },
  heading: {
    h1: "text-3xl lg:text-4xl font-bold text-foreground",
    h2: "text-2xl lg:text-3xl font-semibold text-foreground",
  },
};
```
