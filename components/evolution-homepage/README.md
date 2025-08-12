# Evolution About Homepage Components

This directory contains all the React components for the Evolution About homepage implementation.

## Project Structure

```
components/evolution-homepage/
├── HomePage/           # Main homepage container
├── Header/            # Site header with navigation
├── Logo/              # Evolution About logo component
├── Navigation/        # Main navigation menu
├── SearchBar/         # Search functionality
├── ArticleCard/       # Individual article display
├── FeaturedArticles/  # Featured articles section
├── VideoCard/         # Individual video display
├── VideoSection/      # Video content section
├── PublicationCard/   # Individual publication display
├── PublicationsGallery/ # Publications section
├── Sidebar/           # Sidebar container
├── SocialLinks/       # Social media links
└── index.ts           # Component exports
```

## Styling

- Uses **Tailwind CSS** for utility-first styling
- **shadcn/ui** components for consistent UI elements
- Dark theme with scientific aesthetic using CSS custom properties
- Responsive design with mobile-first approach
- Utility classes defined in `/lib/utils.ts` for common patterns

## TypeScript Interfaces

All component interfaces and types are defined in `/types/evolution-homepage.ts`

## Usage

```tsx
import { HomePage } from "@/components/evolution-homepage";

export default function Page() {
  return <HomePage />;
}
```

## Styling System

### Tailwind Configuration

- Custom Evolution colors defined in `tailwind.config.ts`
- Extended color palette with Evolution-specific branding
- CSS custom properties for theme consistency

### Utility Classes

Common styling patterns are available in `/lib/utils.ts`:

```tsx
import { evolutionClasses } from "@/lib/utils";

// Layout utilities
evolutionClasses.container; // Max-width container with padding
evolutionClasses.grid.articles; // Article grid layout
evolutionClasses.grid.videos; // Video grid layout

// Typography
evolutionClasses.heading.h1; // Large heading styles
evolutionClasses.heading.h2; // Medium heading styles

// Components
evolutionClasses.card.base; // Base card styling
evolutionClasses.nav.link; // Navigation link styling
```

### shadcn/ui Components

Available components:

- `Card`, `CardContent`, `CardHeader`, `CardTitle`
- `Button`
- `Input`
- `Badge`
- `Checkbox`
- `DropdownMenu`
- `Label`

## Responsive Breakpoints (Tailwind)

- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px
- `2xl`: 1536px

## Icons

Uses **Lucide React** icons for consistent iconography throughout the application.
