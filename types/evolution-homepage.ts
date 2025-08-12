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
 * Publication interface for publications gallery
 * Requirements: 4.2 - Evolution About branded materials display
 */
export interface Publication {
  id: string;
  title: string;
  coverImage: string;
  volume?: string;
  year?: string;
  href?: string;
}

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
 * Layout configuration interface for responsive design
 * Requirements: 6.1, 6.3 - Grid layouts and responsive behavior
 */
export interface LayoutConfig {
  maxWidth: string;
  gridGap: string;
  sidebarWidth: string;
  headerHeight: string;
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
  size?: "small" | "medium" | "large";
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
 * PublicationsGallery component props interface
 */
export interface PublicationsGalleryProps {
  publications: Publication[];
  columns?: number;
}

/**
 * PublicationCard component props interface
 */
export interface PublicationCardProps {
  publication: Publication;
}

/**
 * Sidebar component props interface
 */
export interface SidebarProps {
  socialLinks: SocialLink[];
  additionalContent?: React.ReactNode;
}

/**
 * SocialLinks component props interface
 */
export interface SocialLinksProps {
  links: SocialLink[];
}
