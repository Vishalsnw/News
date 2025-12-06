# Design Guidelines: Indian E-Papers Aggregator

## Design Approach

**Selected Approach:** Reference-Based with Material Design principles

**Key References:** Google News app, Flipboard, Indian news apps (Inshorts, Daily Hunt) for content presentation patterns combined with Material Design for Android-native feel

**Core Principles:**
- Mobile-first with thumb-friendly navigation
- Visual recognition through newspaper branding
- Fast scanning with clear information hierarchy
- Native Android app aesthetic

## Typography

**Font Stack:** Roboto (primary), Noto Sans Devanagari (regional languages) via Google Fonts

**Hierarchy:**
- App header: 20px, Medium weight
- Section headers: 16px, Medium weight
- Newspaper names: 14px, Regular weight
- Body/metadata: 12px, Regular weight
- All text uses standard Material Design letter spacing

## Layout System

**Spacing Units:** Tailwind units of 2, 4, 6, and 8 for consistent rhythm (p-2, p-4, m-6, gap-8)

**Grid System:**
- Mobile (default): 2-column grid for newspaper logos
- Tablet (md:): 3-column grid
- Desktop (lg:): 4-column grid
- Container: max-w-7xl with px-4 for edge breathing room

**Vertical Rhythm:**
- Header: sticky with py-4 and subtle elevation
- Section spacing: py-6 between language categories
- Card spacing: gap-4 in grids
- Bottom navigation: Fixed height with safe-area padding

## Component Library

### App Header (Sticky)
- Full-width with slight elevation shadow
- Logo/app name on left
- Search icon and menu icon on right
- Height: 56px (standard Android app bar)

### Newspaper Logo Cards
- Square aspect ratio with rounded corners (rounded-lg)
- White background with shadow-md elevation
- Logo centered within card, maintaining aspect ratio
- Newspaper name below logo in small text
- Active state: Subtle scale transform and deeper shadow
- Padding: p-4 around logo

### Language Section Headers
- Left-aligned text with border-b-2 accent line
- Collapsible sections with chevron icon
- Sticky positioning during scroll within section
- mb-4 spacing before grid

### Bottom Navigation (Mobile)
- Fixed position with 4 items: Home, Favorites, Languages, Profile
- Icons with labels below
- Height: 64px with safe-area padding
- Active state indicated by icon color and bottom indicator line

### Viewer Page
- Full-screen iframe container
- Floating back button (top-left) with backdrop blur and rounded-full
- Floating share button (top-right) with same treatment
- Loading skeleton with newspaper branding

### Filter/Category Chips
- Horizontal scrollable row below header
- Pill-shaped with px-4 py-2
- Active state with filled background
- gap-2 spacing between chips

## Information Architecture

**Homepage Structure:**
1. App header with search
2. Filter chips (All, Hindi, English, Marathi, Regional)
3. Featured/Popular section (horizontal scroll, larger cards)
4. Language-grouped sections (collapsible)
   - Each section: Header + 2/3/4 column grid
5. Bottom navigation (mobile only)

**Viewer Page:**
- Minimal chrome (floating buttons only)
- Full-screen newspaper content
- Swipe gestures for navigation

## Interaction Patterns

**Navigation:**
- Tap logo card → Fade transition to viewer
- Back button → Slide-left transition to home
- Swipe right on viewer → Return to home
- Pull-to-refresh on homepage

**Gestures:**
- Horizontal scroll for featured section
- Vertical scroll for main content
- Tap to expand/collapse language sections

**States:**
- Loading: Skeleton screens with newspaper branding
- Empty: Icon + message for no favorites
- Error: Retry button with error message
- Offline: Cached newspapers available indicator

## Images

**Newspaper Logos:**
- High-resolution PNG/SVG logos for all major Indian newspapers
- Maintain original brand colors and styling
- Size: 120x120px display size, 240x240px actual (2x for retina)
- Sources: Official newspaper websites or press kits

**Placeholder for Featured Section:**
- Newspaper front-page thumbnails (landscape orientation)
- Size: 280x180px cards in horizontal scroll
- Shows latest edition preview

**No hero image** - This is a utility app focused on quick access to newspapers through logo recognition.

## Accessibility

- Minimum touch target: 48x48px for all interactive elements
- Logo cards include newspaper name as accessible label
- Language sections use semantic heading hierarchy
- Bottom navigation uses proper ARIA labels
- High contrast maintained for text over backgrounds
- RTL support for regional languages requiring it

## Performance Considerations

- Lazy load newspaper logos below fold
- Prioritize above-fold content
- Compress logo images (WebP with PNG fallback)
- Cache newspaper URLs for offline access
- Skeleton screens while loading iframe content