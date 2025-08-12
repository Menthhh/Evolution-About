# Technology Stack

## Core Framework & Runtime

- **Next.js 15** (latest) with App Router
- **React 19** with TypeScript
- **Node.js** runtime environment

## Database & ORM

- **Supabase** - PostgreSQL database with real-time features
- **Drizzle ORM** - Type-safe database operations
- **Drizzle Kit** - Database migrations and schema management

## Authentication

- **Supabase Auth** with cookie-based sessions (@supabase/ssr)
- Session management across Client/Server Components, Route Handlers, and Middleware

## Styling & UI

- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - High-quality React components (New York style)
- **Radix UI** - Accessible component primitives
- **Lucide React** - Icon library
- **next-themes** - Dark/light theme switching
- **tailwindcss-animate** - Animation utilities

## Development Tools

- **TypeScript** - Type safety throughout
- **ESLint** - Code linting with Next.js config
- **Turbopack** - Fast development builds

## Common Commands

### Development

```bash
npm run dev          # Start development server with Turbopack
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

### Database Operations

```bash
npm run db:gen       # Generate Drizzle migrations
npm run db:push      # Push schema changes to Supabase
npm run db:migrate   # Generate and push migrations
```

### Package Management

- Uses **npm** as primary package manager
- **pnpm** lock file present for alternative usage

## Environment Configuration

- `.env.local` for local development
- Required variables: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `DATABASE_URL`
- Drizzle config reads from `.env.local`

## Path Aliases

- `@/*` maps to project root
- `@/components` for UI components
- `@/lib` for utilities
- `@/hooks` for custom hooks
