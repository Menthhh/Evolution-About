# Articles Page Component

A comprehensive articles listing page for the Evolution About website, featuring a responsive grid layout with sidebar filtering options.

## Features

### Layout

- **Responsive Grid**: 1-4 columns depending on screen size
- **Background**: Uses the same background image as evolution-homepage (`/images/background-cover.jpg`)
- **Navigation**: Reuses the existing navigation component with "Articles" tab active
- **Two-column Layout**: Main content area with sidebar

### Main Content

- **Search Bar**: Centered search functionality with dark theme
- **Articles Grid**: Responsive grid displaying article cards
- **Pagination**: Bottom pagination with previous/next and page numbers

### Sidebar Features

- **Recommended Articles** (`บทความแนะนำ`): Card with 5 article links
- **Categories** (`หมวดหมู่`): Filter chips with categories:
  - วิวัฒนาการ (Evolution)
  - ข่าว (News)
  - งานวิจัย (Research)
  - บทสรุป (Summary)
  - ปรัชญา (Philosophy)
  - บทวิจารณ์ (Review)
- **Authors** (`ผู้เขียน`): Filter chips for authors:
  - arif_dawah
  - menth
  - erum

### Responsive Design

- **Mobile**: Single column layout, stacked sidebar
- **Tablet**: 2-column grid
- **Desktop**: 3-4 column grid with fixed sidebar
- **Touch-friendly**: Proper touch targets for mobile devices

## Data Source

Uses `data/sample-articles.ts` with 12 sample articles in Thai language, including:

- Article titles and excerpts
- Author information
- Publication dates
- Engagement metrics (likes, comments)
- Thumbnails and read time

## Navigation

- Home (`หน้าแรก`) - `/evolution-homepage`
- **Articles (`บทความ`) - `/articles` (active)**
- Books (`หนังสือ`) - `/books`
- Videos (`วิดีโอ`) - `/videos`
- Podcasts (`พอดแคสต์`) - `/podcasts`

## Styling

- Dark theme with glass morphism effects
- Consistent with evolution-homepage design
- Yellow accent color for active states
- Smooth hover animations and transitions
- Thai typography support

## Components Used

- `Navigation` - Header navigation
- `MainLayout` - Two-column responsive layout
- `SearchBar` - Search functionality
- `ArticleCard` - Individual article display
- `Badge` - Category and author filters
- `Button` - Pagination controls
