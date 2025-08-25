# Publications Feature

## Overview

The Publications feature allows users to browse and download books and publications related to evolution and science. This feature follows the same structure as Articles and Videos pages.

## Routes

- `/publications` - Main publications listing page
- `/publications/[id]` - Individual publication detail page with download functionality

## Components Created

1. **PublicationsPage** - Main listing page with search, filtering, and pagination
2. **PublicationDetailPage** - Individual publication page with download button
3. **PublicationCard** - Reused from existing homepage component

## Features

- Search functionality for publications
- Category and author filtering
- Pagination for large lists
- Individual publication pages with:
  - Book cover display
  - Publication details (author, year)
  - Table of contents
  - Download button
  - Related publications

## Navigation

The "หนังสือ" (Books) menu item now correctly links to `/publications` route across all pages.

## Data

Uses existing `samplePublications` data from `data/sample-publications.ts` with book covers from `public/images/publications/`.

## Usage

Users can:

1. Click "หนังสือ" in the navigation to view all publications
2. Search for specific publications
3. Filter by categories or authors
4. Click on any publication to view details
5. Download publications using the download button
