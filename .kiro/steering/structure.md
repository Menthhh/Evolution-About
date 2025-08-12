# Project Structure

## Root Level Organization

```
├── app/                    # Next.js App Router pages and layouts
├── components/             # Reusable React components
├── data/                   # Static data and sample content
├── db/                     # Database schemas and client configuration
├── lib/                    # Utility functions and shared logic
├── public/                 # Static assets (images, icons, etc.)
├── supabase/              # Supabase configuration and migrations
├── types/                 # TypeScript type definitions
└── .kiro/                 # Kiro IDE configuration and steering
```

## App Directory (`/app`)

- **App Router structure** with `layout.tsx` and `page.tsx` files
- **Route-based organization** following Next.js 13+ conventions
- **Special files**: `globals.css`, `favicon.ico`, OpenGraph images
- **Feature modules**: `auth/`, `evolution-homepage/` for specific functionality

## Components Directory (`/components`)

- **UI Components**: Reusable interface elements
- **Feature Components**: Domain-specific components (e.g., `evolution-homepage/`)
- **Form Components**: Authentication forms (`login-form.tsx`, `sign-up-form.tsx`)
- **Layout Components**: Navigation, headers, logos
- **shadcn/ui**: Located in `components/ui/` subdirectory

## Data Directory (`/data`)

- **Sample Data**: Mock content for development and testing
- **Naming Convention**: `sample-*.ts` files for different content types
- **Type Safety**: All data files export typed arrays matching interfaces

## Database Directory (`/db`)

- **schemas.ts**: Drizzle ORM table definitions and types
- **client.ts**: Database connection configuration
- **Type Exports**: `Insert*` and `Select*` types for each table

## Library Directory (`/lib`)

- **utils.ts**: Common utility functions (cn, clsx helpers)
- **supabase/**: Supabase client configuration for different contexts
- **Shared Logic**: Reusable functions across the application

## Types Directory (`/types`)

- **Domain Types**: Feature-specific interfaces (e.g., `evolution-homepage.ts`)
- **Component Props**: TypeScript interfaces for component properties
- **Data Models**: Interfaces matching database schemas

## Public Directory (`/public`)

- **assets/**: General static assets
- **images/**: Image files organized by feature
- **logos/**: Brand and logo assets

## Configuration Files

- **components.json**: shadcn/ui configuration
- **tailwind.config.ts**: Tailwind CSS customization with theme colors
- **drizzle.config.ts**: Database migration configuration
- **tsconfig.json**: TypeScript compiler options with path aliases

## Naming Conventions

- **Files**: kebab-case for components (`auth-button.tsx`)
- **Directories**: lowercase with hyphens for multi-word names
- **Types**: PascalCase interfaces and types
- **Database**: snake_case for table and column names
- **Sample Data**: Prefixed with `sample-` for mock content

## Import Patterns

- Use `@/` path alias for all internal imports
- Group imports: external libraries first, then internal modules
- Prefer named exports over default exports for utilities
