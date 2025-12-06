# Indian E-Papers Aggregator

## Overview

This is a mobile-first web application that aggregates Indian newspapers' e-papers into a single platform. Users can browse newspapers organized by language (English, Hindi, Marathi, Tamil, Telugu, Bengali, and others), view e-papers in an embedded viewer, and manage favorites. The app features a Google News-style interface optimized for mobile devices with Material Design principles, offering access to 30+ Indian newspapers across multiple languages and regions.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Build Tools**
- React 18 with TypeScript as the primary UI framework
- Vite for development server and production builds
- Wouter for lightweight client-side routing (no React Router dependency)

**Routing Structure**
- `/` - Home page with newspaper grid and language filtering
- `/read/:id` - E-paper viewer with embedded iframe
- `/favorites` - User's saved newspapers
- `/languages` - Browse newspapers grouped by language
- `/profile` - User settings including theme toggle

**State Management**
- TanStack Query (React Query) for server state, API caching, and data fetching
- React Context API for global theme management (light/dark mode)
- React Context API for favorites management with localStorage persistence
- Local component state using React hooks for UI interactions

**UI Component System**
- Shadcn/ui component library (New York style variant) for pre-built accessible components
- Radix UI primitives as the foundation for all interactive components (dialogs, dropdowns, menus, etc.)
- Tailwind CSS for utility-first styling with custom design tokens
- Class Variance Authority (CVA) for managing component style variants

**Design System**
- Mobile-first responsive design with Material Design principles
- Breakpoints: mobile (default), md: 768px (tablet), lg: 1024px (desktop)
- Grid layouts: 2 columns (mobile), 3 columns (tablet), 4 columns (desktop)
- Consistent spacing units: 2, 4, 6, 8 (Tailwind scale)
- Typography: Roboto for Latin text, Noto Sans Devanagari for Indic languages
- Sticky header with bottom navigation on mobile for thumb-friendly access
- Theme system with CSS custom properties supporting light and dark modes

**Data Storage (Client)**
- LocalStorage for persisting user favorites
- LocalStorage for theme preference
- No authentication or user accounts (guest mode only)

### Backend Architecture

**Server Framework**
- Express.js with TypeScript running on Node.js
- HTTP server using Node's built-in `http` module

**API Design**
- RESTful JSON API with the following endpoints:
  - `GET /api/newspapers` - Retrieve all newspapers
  - `GET /api/newspapers/:id` - Retrieve specific newspaper by ID
  - `GET /api/newspapers/language/:language` - Filter newspapers by language

**Data Storage (Server)**
- In-memory storage using a custom `MemStorage` class
- Newspaper data is hardcoded in `shared/schema.ts` as a static array
- No database connection (Drizzle configuration exists but is not actively used)
- Storage interface (`IStorage`) allows future database integration without API changes

**Shared Schema**
- TypeScript types and Zod schemas defined in `shared/schema.ts`
- Newspaper schema: id, name, logo URL, epaper URL, language, region, featured flag
- Language schema: code, name, nativeName
- Static data arrays for newspapers and supported languages

**Development Features**
- Vite HMR integration for hot module replacement during development
- Request logging middleware with timing information
- Development-only Replit plugins (cartographer, dev banner, runtime error overlay)

### Build & Deployment

**Build Process**
- Client: Vite builds React app to `dist/public`
- Server: esbuild bundles server code to `dist/index.cjs` as single file
- Selected dependencies are bundled (allowlist) to reduce syscalls and improve cold start performance
- Production mode uses NODE_ENV=production

**Static File Serving**
- Express serves built client files from `dist/public`
- Fallback to `index.html` for client-side routing (SPA)

## External Dependencies

**UI Component Libraries**
- @radix-ui/* - Accessible component primitives (accordion, dialog, dropdown, popover, etc.)
- shadcn/ui - Pre-styled component collection built on Radix UI
- cmdk - Command menu component
- embla-carousel-react - Carousel/slider functionality
- lucide-react - Icon library

**State & Data Management**
- @tanstack/react-query - Server state management and caching
- react-hook-form - Form handling (included but not actively used)
- @hookform/resolvers - Form validation resolvers
- zod - Runtime type validation and schema definition
- drizzle-zod - Zod integration for Drizzle (included but not actively used)

**Database & ORM** (Configured but not actively used)
- drizzle-orm - TypeScript ORM
- drizzle-kit - Schema management and migrations
- PostgreSQL expected (based on drizzle.config.ts) but not connected
- The app currently uses in-memory storage instead of a database

**Styling**
- tailwindcss - Utility-first CSS framework
- tailwind-merge - Merge Tailwind classes
- clsx - Conditional class name utility
- class-variance-authority - Component variant management
- autoprefixer - CSS vendor prefixing

**Utilities**
- date-fns - Date manipulation and formatting
- nanoid - Unique ID generation
- wouter - Lightweight routing library

**Development Tools**
- TypeScript - Type safety
- Vite - Build tool and dev server
- tsx - TypeScript execution for Node.js scripts
- esbuild - Fast JavaScript bundler for server code
- @replit/* plugins - Development environment enhancements

**Fonts**
- Google Fonts: Roboto (primary), Noto Sans Devanagari (regional languages)
- Loaded via CDN in index.html