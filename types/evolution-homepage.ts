// Core interfaces for Evolution About homepage components

/**
 * Article interface for featured articles display
 * Requirements: 2.2 - Article cards with thumbnail, title, author, engagement metrics
 */
export interface Article {
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

/**
 * Video interface for video content display
 * Requirements: 3.3 - Video titles and descriptions in Thai
 */
export interface Video {
  id: string;
  title: string;
  thumbnail: string;
  duration: string;
  youtubeId: string;
  description?: string;
  views?: number;
}

/**
 * Book interface for books section with cover image and title properties
 * Requirements: 4.1, 4.2 - Book covers in 3-column grid layout
 */
export interface Book {
  id: string;
  title: string;
  coverImage: string;
  author?: string;
  year?: string;
  href?: string;
}

/**
 * Category interface for sidebar categories section
 * Requirements: 5.2 - Categories list for content organization
 */
export interface Category {
  id: string;
  name: string;
  href: string;
  count?: number;
}

/**
 * ContentItem interface for latest and popular sections
 * Requirements: 5.3, 5.4 - Latest and popular content with mixed types
 */
export interface ContentItem {
  id: string;
  title: string;
  type: "article" | "video";
  href: string;
  publishDate: string;
  views?: number;
  thumbnail?: string;
}

/**
 * PodcastEpisode interface with audio playback properties
 * Requirements: 6.1, 6.2, 6.3 - Podcast episodes with play functionality
 */
export interface PodcastEpisode {
  id: string;
  title: string;
  duration: string;
  audioUrl: string;
  publishDate: string;
  description?: string;
}

// Backward compatibility - Publication is now Book
/**
 * @deprecated Use Book interface instead
 */
export type Publication = Book;

/**
 * Social media link interface for sidebar integration
 * Requirements: 5.2 - Facebook and other relevant platform links
 */
export interface SocialLink {
  platform: "facebook" | "youtube" | "twitter" | "instagram";
  url: string;
  label: string;
}

/**
 * Navigation item interface for header navigation
 * Requirements: 1.2 - Thai language menu items
 */
export interface NavItem {
  id: string;
  label: string;
  href: string;
  isActive?: boolean;
}

/**
 * Theme configuration interface for consistent styling
 * Requirements: 6.4 - Dark theme consistency
 */
export interface ThemeConfig {
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

/**
 * Layout configuration interface for two-column responsive design
 * Requirements: 1.1, 1.2, 7.1 - Two-column layout with responsive behavior
 */
export interface LayoutConfig {
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

// Component prop interfaces for type safety

/**
 * Header component props interface
 */
export interface HeaderProps {
  logoSrc: string;
  navigationItems: NavItem[];
  onSearch: (query: string) => void;
}

/**
 * Logo component props interface
 */
export interface LogoProps {
  src: string;
  alt: string;
  size?: "small" | "medium" | "large";
}

/**
 * Navigation component props interface
 */
export interface NavigationProps {
  items: NavItem[];
  activeItem?: string;
}

/**
 * SearchBar component props interface
 */
export interface SearchBarProps {
  placeholder: string;
  onSearch: (query: string) => void;
  variant?: "light" | "dark";
}

/**
 * FeaturedArticles component props interface
 */
export interface FeaturedArticlesProps {
  articles: Article[];
  maxItems?: number;
}

/**
 * ArticleCard component props interface
 */
export interface ArticleCardProps {
  article: Article;
}

/**
 * VideoSection component props interface
 */
export interface VideoSectionProps {
  videos: Video[];
  title: string;
  layout?: "grid" | "list";
}

/**
 * VideoCard component props interface
 */
export interface VideoCardProps {
  video: Video;
  autoplay?: boolean;
}

/**
 * BooksSection component props interface
 */
export interface BooksSectionProps {
  books: Book[];
  title?: string;
}

/**
 * BookCard component props interface
 */
export interface BookCardProps {
  book: Book;
}

/**
 * MainLayout component props interface for two-column layout
 */
export interface MainLayoutProps {
  children: React.ReactNode;
}

/**
 * MainContent component props interface for left column
 */
export interface MainContentProps {
  children: React.ReactNode;
}

/**
 * ArticlesSection component props interface for 3-column grid
 */
export interface ArticlesSectionProps {
  articles: Article[];
  title?: string;
}

/**
 * VideosSection component props interface for featured video and thumbnails
 */
export interface VideosSectionProps {
  featuredVideo: Video;
  videos: Video[];
  title?: string;
}

/**
 * FeaturedVideo component props interface for large embedded video
 */
export interface FeaturedVideoProps {
  video: Video;
  autoplay?: boolean;
}

/**
 * VideoThumbnails component props interface for horizontal scroll
 */
export interface VideoThumbnailsProps {
  videos: Video[];
}

/**
 * Sidebar component props interface for comprehensive right column
 */
export interface SidebarProps {
  searchProps: SearchSectionProps;
  categories: Category[];
  latestItems: ContentItem[];
  popularItems: ContentItem[];
  podcastEpisodes: PodcastEpisode[];
}

/**
 * SearchSection component props interface for search box and social icons
 */
export interface SearchSectionProps {
  onSearch: (query: string) => void;
  socialLinks: SocialLink[];
}

/**
 * CategoriesSection component props interface
 */
export interface CategoriesSectionProps {
  categories: Category[];
}

/**
 * LatestSection component props interface
 */
export interface LatestSectionProps {
  items: ContentItem[];
}

/**
 * PopularSection component props interface
 */
export interface PopularSectionProps {
  items: ContentItem[];
}

/**
 * PodcastSection component props interface
 */
export interface PodcastSectionProps {
  episodes: PodcastEpisode[];
}

/**
 * PodcastEpisode component props interface
 */
export interface PodcastEpisodeProps {
  episode: PodcastEpisode;
  onPlay: (episodeId: string) => void;
}

/**
 * SocialLinks component props interface
 */
export interface SocialLinksProps {
  links: SocialLink[];
}

/**
 * SectionTitle component props interface for consistent typography
 */
export interface SectionTitleProps {
  children: React.ReactNode;
  className?: string;
  level?: "h1" | "h2" | "h3";
  id?: string;
}

// Legacy component interfaces for backward compatibility
/**
 * @deprecated Use BookCardProps instead
 */
export interface PublicationCardProps {
  publication: Book;
}

/**
 * @deprecated Use BooksSectionProps instead
 */
export interface PublicationsGalleryProps {
  publications: Book[];
  columns?: number;
}
