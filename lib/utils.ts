import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Check if required Supabase environment variables are set
export const hasEnvVars =
  process.env.NEXT_PUBLIC_SUPABASE_URL &&
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Evolution About specific utility classes with enhanced responsive design
export const evolutionClasses = {
  // Layout - Mobile-first responsive design
  container: "max-w-6xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8",

  // Responsive grids with mobile-first approach
  grid: {
    articles: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6",
    videos: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6",
    publications:
      "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4",
  },

  // Cards with enhanced dark theme styling and responsive padding
  card: {
    base: "evolution-card-enhanced touch-manipulation",
    enhanced:
      "evolution-card-enhanced evolution-surface-hover touch-manipulation hover:evolution-glow",
    content: "p-3 sm:p-4 lg:p-6",
    header: "p-3 sm:p-4 lg:p-6 border-b border-border/50",
    footer: "p-3 sm:p-4 lg:p-6 border-t border-border/50 bg-muted/20",
  },

  // Enhanced typography with dark theme styling and consistent spacing
  heading: {
    h1: "text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-foreground leading-tight tracking-tight",
    h2: "text-xl sm:text-2xl lg:text-3xl font-semibold text-foreground leading-tight tracking-tight",
    h3: "text-lg sm:text-xl lg:text-2xl font-medium text-foreground leading-tight",
    h4: "text-base sm:text-lg font-medium text-foreground leading-tight",
    gradient:
      "evolution-text-gradient text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold leading-tight tracking-tight",
  },

  // Touch-friendly buttons with responsive padding
  button: {
    primary:
      "bg-accent hover:bg-accent/90 text-accent-foreground px-4 py-2 sm:px-6 sm:py-3 rounded-md transition-colors touch-manipulation min-h-[44px]",
    secondary:
      "bg-secondary hover:bg-secondary/80 text-secondary-foreground px-4 py-2 sm:px-6 sm:py-3 rounded-md transition-colors touch-manipulation min-h-[44px]",
  },

  // Responsive navigation with touch-friendly sizing
  nav: {
    link: "text-muted-foreground hover:text-foreground transition-colors px-3 py-2 sm:px-4 sm:py-3 rounded-md hover:bg-muted touch-manipulation min-h-[44px] flex items-center",
    active: "text-foreground bg-muted",
  },

  // Responsive spacing utilities
  spacing: {
    section: "py-6 sm:py-8 lg:py-12",
    sectionSmall: "py-4 sm:py-6 lg:py-8",
    element: "mb-4 sm:mb-6 lg:mb-8",
    elementSmall: "mb-2 sm:mb-3 lg:mb-4",
  },

  // Mobile-optimized layout utilities
  layout: {
    mainGrid:
      "grid grid-cols-1 lg:grid-cols-[1fr_280px] xl:grid-cols-[1fr_320px] gap-6 lg:gap-8 xl:gap-12",
    sidebarStack: "space-y-4 sm:space-y-6",
    contentStack: "space-y-6 sm:space-y-8 lg:space-y-12",
  },

  // Enhanced animations and interactive states
  animation: {
    fadeIn: "animate-in fade-in-0 duration-500",
    slideUp: "animate-in slide-in-from-bottom-4 duration-500",
    slideInLeft: "animate-in slide-in-from-left-4 duration-500",
    slideInRight: "animate-in slide-in-from-right-4 duration-500",
    scaleIn: "animate-in zoom-in-95 duration-300",
    pulse: "animate-pulse",
  },

  // Interactive states with enhanced dark theme
  interactive: {
    card: "transition-all duration-300 ease-out hover:shadow-lg hover:-translate-y-1 hover:border-accent/50",
    button:
      "transition-all duration-200 ease-out hover:scale-105 active:scale-95",
    link: "transition-colors duration-200 ease-out hover:text-accent",
    image: "transition-transform duration-300 ease-out hover:scale-105",
    glow: "hover:shadow-[0_0_20px_rgba(74,158,255,0.3)] transition-shadow duration-300",
  },

  // Enhanced visual elements
  visual: {
    gradient: "bg-gradient-to-br from-background via-card to-muted",
    border:
      "border border-border/50 hover:border-border transition-colors duration-300",
    shadow: "shadow-sm hover:shadow-md transition-shadow duration-300",
    backdrop:
      "backdrop-blur-sm bg-background/80 supports-[backdrop-filter]:bg-background/60",
  },
};
