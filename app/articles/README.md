# Articles Structure

This directory contains the articles section of the Evolution About website.

## File Structure

```
app/articles/
├── page.tsx          # Main articles listing page (/articles)
├── [slug]/
│   └── page.tsx      # Individual article pages (/articles/[slug])
└── README.md         # This file
```

## URL Structure

- `/articles` → Shows the main articles listing page with grid layout, search, and sidebar
- `/articles/[slug]` → Shows individual article detail pages

## Example URLs

- `/articles/neo-darwinism-evolution-survival`
- `/articles/molecular-messages-intelligent-design`
- `/articles/mycorrhizal-network-natural-internet`
- `/articles/bacterial-flagellum-motor`
- `/articles/cambrian-explosion-mystery`

## Features

### Articles Listing Page (`/articles`)

- Grid layout with article cards
- Search functionality
- Sidebar with:
  - Recommended articles (บทความแนะนำ)
  - Categories filter (หมวดหมู่)
  - Authors filter (ผู้เขียน)
- Pagination
- Responsive design
- Same navigation and background as evolution-homepage

### Individual Article Page (`/articles/[slug]`)

- Full article display with featured image
- Article metadata (author, date, read time)
- Engagement stats (likes, comments)
- Back navigation to articles listing
- Static generation for all articles
- SEO-optimized metadata

## Data Source

Articles are sourced from `data/sample-articles.ts` with proper slug-based URLs.
