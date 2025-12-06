# Indian E-Papers Aggregator

## Overview

This is a mobile-first web application that aggregates Indian newspapers' e-papers into a single platform. Users can browse newspapers by language, view e-papers in an embedded viewer, and access 30+ newspapers across multiple Indian languages including English, Hindi, Marathi, Gujarati, Tamil, Telugu, Bengali, Kannada, Malayalam, and Punjabi.

The app provides a Google News-style interface optimized for mobile devices with Material Design principles, featuring newspaper logo cards, language filtering, and an integrated e-paper viewer.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework**: React 18 with TypeScript using Vite as the build tool

**Routing**: Wouter for client-side routing with the following pages:
- Home (`/`) - Main newspaper grid with language filtering
- Viewer (`/read/:id`) - Embedded e-paper viewer
- Favorites (`/favorites`) - Saved newspapers (placeholder for future implementation)
- Languages (`/languages`) - Browse newspapers by language
- Profile (`/profile`) - User settings and theme toggle

**State Management**: 
- TanStack Query (React Query) for server state and API data fetching
- React Context for theme management (light/dark mode)
- Local component state with React hooks

**UI Component System**:
- Shadcn/ui component library (New York style variant)
- Radix UI primitives for accessible components
- Tailwind CSS for styling with custom design tokens
- Class Variance Authority (CVA) for component variants

**Design System**:
- Mobile-first responsive design with breakpoints (md: 768px, lg: 1024px)
- Material Design principles with Android-native feel
- Custom spacing units (2, 4, 6, 8) for consistent rhythm
- Roboto font for primary text, Noto Sans Devanagari for regional languages
- Sticky header with bottom navigation on mobile
- Grid layouts: 2 columns (mobile), 3 columns (tablet), 4 columns (desktop)

### Backend Architecture

**Server Framework**: Express.js with TypeScript running on Node.js

**API Design**: RESTful endpoints serving JSON:
- `GET /api/newspapers` - Retrieve all newspapers
- `GET /api/newspapers/:id` - Get specific newspaper by ID
- `GET /api/newspapers/language/:language` - Filter newspapers by language

**Data Layer**: 
- Currently using in-memory storage (`MemStorage` class)
- Implements `IStorage` interface for future database integration
- Newspaper data defined in shared schema with Zod validation

**Development Setup**:
- Hot Module Replacement (HMR) via Vite middleware in development
- Separate build process for client (Vite) and server (esbuild)
- Static file serving in production from `dist/public`

### Data Schema

**Newspaper Schema** (Zod):
```typescript
{
  id: string
  name: string
  logo: string (URL)
  epaperUrl: string (external e-paper URL)
  language: string
  region: string
  featured?: boolean
}
```

**Language Schema**:
```typescript
{
  code: string
  name: string
  nativeName: string
}
```

**Storage Pattern**: Data is currently hardcoded in `shared/schema.ts` but structured to support database migration through the `IStorage` interface abstraction.

### Configuration & Build

**TypeScript Configuration**:
- ESNext modules with bundler resolution
- Path aliases: `@/` for client, `@shared/` for shared code
- Strict mode enabled

**Build Process**:
- Client: Vite builds React app to `dist/public`
- Server: esbuild bundles server code to `dist/index.cjs`
- Allowlist of dependencies bundled into server for faster cold starts
- Production uses Node.js to serve bundled output

**Environment**:
- Development: `tsx` for TypeScript execution with watch mode
- Vite dev server with HMR on development
- Production: Pre-built static assets served by Express

## External Dependencies

### UI & Styling
- **Tailwind CSS**: Utility-first CSS framework with custom configuration
- **Shadcn/ui**: Pre-built accessible component library
- **Radix UI**: Headless UI primitives (dialogs, dropdowns, tooltips, etc.)
- **Lucide React**: Icon library for consistent iconography
- **Embla Carousel**: Carousel component (installed but not actively used)

### Data Fetching & State
- **TanStack Query (React Query)**: Server state management and caching
- **Wouter**: Lightweight client-side routing
- **Zod**: Schema validation for type-safe data structures

### Database & Session (Configured but Not Active)
- **Drizzle ORM**: SQL query builder configured for PostgreSQL
- **PostgreSQL**: Database dialect configured in `drizzle.config.ts`
- **Connect-pg-simple**: PostgreSQL session store (installed but sessions not implemented)

### Development Tools
- **Vite**: Build tool and dev server with React plugin
- **esbuild**: Server bundler for production
- **tsx**: TypeScript execution for development
- **TypeScript**: Type system and compiler

### Form & Validation
- **React Hook Form**: Form state management with `@hookform/resolvers`
- **Zod Validation**: Runtime validation connected to forms

### Fonts
- **Google Fonts**: Roboto (primary) and Noto Sans Devanagari (regional languages)

### Third-Party Services
- **External E-Paper Links**: App embeds newspaper e-papers via iframes from external sources (e.g., Times of India, The Hindu, etc.)
- No authentication or payment services currently integrated

### Note on Database
The application is configured for PostgreSQL via Drizzle ORM but currently uses in-memory storage. The database schema and connection are set up but not actively used. Future implementation would involve migrating the `MemStorage` class to a Drizzle-based storage implementation.