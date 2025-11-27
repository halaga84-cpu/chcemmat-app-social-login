# ChcemMať Mobile Redesign - Complete Strategy

## 🎯 Project Overview

**Timeline:** 6 weeks
**Target Platforms:** iOS and Android (React Web/PWA)
**Devices:** Small phones (320px-375px), Large phones (376px-428px), Portrait & Landscape
**Acceptance Criteria:**
- Lighthouse mobile score ≥ 90
- Minimum touch targets: 48px × 48px
- Load time < 3s on 3G simulated
- WCAG 2.1 AA compliance

**Constraints:**
- No backend changes
- Work within existing Next.js/Supabase architecture
- Progressive enhancement approach

---

## 📊 Phase 1: UX Issues Analysis (Week 1)

### Critical Priority (P0) - Blocks core functionality

#### 1. **Touch Target Sizing**
- **Issue:** Many buttons and interactive elements < 48px
- **Impact:** Difficult to tap accurately on mobile devices
- **Locations:** 
  - Dashboard action buttons (Edit, Delete, Share)
  - Item cards in wishlist view
  - Navigation menu items
  - Form input fields
- **Solution:** Minimum 48px × 48px for all interactive elements
- **Effort:** 3 days

#### 2. **Navigation Challenges**
- **Issue:** Desktop-oriented navigation doesn't adapt well to mobile
- **Impact:** Users struggle to navigate between wishlists and items
- **Current Problems:**
  - No mobile-optimized menu
  - Back navigation unclear
  - Deep nesting difficult to navigate
- **Solution:** Bottom navigation bar + hamburger menu for secondary actions
- **Effort:** 4 days

#### 3. **Form Usability**
- **Issue:** Forms not optimized for mobile input
- **Impact:** High abandonment rate for wishlist/item creation
- **Problems:**
  - Input fields too small
  - No proper keyboard types (numeric, email, url)
  - Submit buttons at top (hard to reach)
  - No autofill support
- **Solution:** Mobile-first form redesign with proper input types
- **Effort:** 3 days

### High Priority (P1) - Impacts user experience

#### 4. **Image Upload Flow**
- **Issue:** Image upload interface not touch-friendly
- **Impact:** Users struggle to add product images
- **Problems:**
  - Small upload button
  - No drag-and-drop alternative for mobile
  - No image preview optimization
- **Solution:** Large touch-friendly upload area + camera integration
- **Effort:** 2 days

#### 5. **Readability Issues**
- **Issue:** Text too small, insufficient contrast
- **Impact:** Difficult to read on small screens
- **Problems:**
  - Body text < 16px
  - Low contrast ratios (fails WCAG AA)
  - Line height too tight
- **Solution:** Minimum 16px body text, improved contrast, generous line-height
- **Effort:** 2 days

#### 6. **Loading States**
- **Issue:** No loading indicators for network requests
- **Impact:** Users unsure if action succeeded
- **Solution:** Skeleton screens + loading spinners
- **Effort:** 2 days

### Medium Priority (P2) - Quality of life improvements

#### 7. **Offline Behavior**
- **Issue:** No offline support
- **Impact:** App breaks completely without connection
- **Solution:** Service Worker with offline caching strategy
- **Effort:** 3 days

#### 8. **Performance**
- **Issue:** Large images, unoptimized assets
- **Impact:** Slow load times on 3G
- **Problems:**
  - No image optimization
  - Large JavaScript bundles
  - No code splitting
- **Solution:** Next.js Image optimization + lazy loading + code splitting
- **Effort:** 3 days

#### 9. **Landscape Orientation**
- **Issue:** Layout breaks in landscape mode
- **Impact:** Poor experience for users who prefer landscape
- **Solution:** Responsive layouts that work in both orientations
- **Effort:** 2 days

---

## 🎨 Phase 2: Design System (Week 2)

### Spacing System (8px grid)

```css
--space-1: 4px;   /* Micro spacing */
--space-2: 8px;   /* Small spacing */
--space-3: 12px;  /* Default spacing */
--space-4: 16px;  /* Medium spacing */
--space-5: 24px;  /* Large spacing */
--space-6: 32px;  /* XL spacing */
--space-7: 48px;  /* XXL spacing */
--space-8: 64px;  /* Section spacing */
```

**Usage:**
- Card padding: `var(--space-4)` (16px)
- Section gaps: `var(--space-5)` (24px)
- Page margins: `var(--space-4)` mobile, `var(--space-6)` desktop
- Button padding: `var(--space-3) var(--space-5)` (12px 24px)

### Typography Scale (Modular scale 1.25)

```css
/* Base font size: 16px (minimum for mobile readability) */
--text-xs: 0.75rem;   /* 12px - Labels, captions */
--text-sm: 0.875rem;  /* 14px - Secondary text */
--text-base: 1rem;    /* 16px - Body text (DEFAULT) */
--text-lg: 1.125rem;  /* 18px - Emphasized text */
--text-xl: 1.25rem;   /* 20px - Subheadings */
--text-2xl: 1.5rem;   /* 24px - Card titles */
--text-3xl: 1.875rem; /* 30px - Page headings */
--text-4xl: 2.25rem;  /* 36px - Hero text */

/* Line heights for readability */
--leading-tight: 1.25;
--leading-normal: 1.5;  /* DEFAULT for body text */
--leading-relaxed: 1.75;
```

**Mobile Typography Rules:**
- Body text: 16px minimum (WCAG requirement)
- Line height: 1.5 minimum for readability
- Max line length: 65 characters for comfortable reading
- Letter spacing: 0.01em for better legibility on small screens

### Color System (Enhanced contrast for WCAG 2.1 AA)

```css
/* Primary Brand Colors */
--primary: #3B82F6;        /* Blue - Main brand color */
--primary-dark: #2563EB;   /* Darker blue for hover states */
--primary-light: #60A5FA;  /* Lighter blue for backgrounds */

/* Semantic Colors */
--success: #10B981;        /* Green - Success states */
--warning: #F59E0B;        /* Amber - Warning states */
--error: #EF4444;          /* Red - Error states */
--info: #3B82F6;           /* Blue - Info states */

/* Neutral Palette (High contrast) */
--gray-50: #F9FAFB;
--gray-100: #F3F4F6;
--gray-200: #E5E7EB;
--gray-300: #D1D5DB;
--gray-400: #9CA3AF;
--gray-500: #6B7280;
--gray-600: #4B5563;  /* Min for text on white */
--gray-700: #374151;
--gray-800: #1F2937;
--gray-900: #111827;

/* Text Colors (WCAG AA compliant) */
--text-primary: #111827;      /* Contrast ratio: 16:1 */
--text-secondary: #4B5563;    /* Contrast ratio: 7:1 */
--text-tertiary: #6B7280;     /* Contrast ratio: 4.5:1 */
--text-inverse: #FFFFFF;

/* Background Colors */
--bg-primary: #FFFFFF;
--bg-secondary: #F9FAFB;
--bg-tertiary: #F3F4F6;
```

**Contrast Requirements:**
- Normal text (< 24px): 4.5:1 minimum
- Large text (≥ 24px): 3:1 minimum
- Interactive elements: 3:1 minimum
- All current combinations meet WCAG AA

### Touch Targets & Interactive Elements

**Minimum Sizes:**
```css
/* Touch target minimum (WCAG 2.5.5) */
--touch-target-min: 48px;

/* Button sizing */
--button-sm: 40px;   /* Small buttons (use sparingly) */
--button-md: 48px;   /* Standard buttons (DEFAULT) */
--button-lg: 56px;   /* Large/primary CTAs */

/* Icon sizes */
--icon-sm: 20px;
--icon-md: 24px;
--icon-lg: 32px;
```

**Touch Target Rules:**
- All buttons: 48px × 48px minimum
- Links in text: 44px × 44px tap area
- Form inputs: 48px minimum height
- Spacing between targets: 8px minimum
- Icon-only buttons: Include 48px padding
- Swipe areas: Full width, 56px minimum height

### Icons (Lucide React)

**Icon Library:** lucide-react
**Stroke width:** 2px (standard)
**Sizes:**
- Small: 20px (labels, inline text)
- Medium: 24px (buttons, navigation) - DEFAULT
- Large: 32px (feature highlights, empty states)

**Usage Guidelines:**
- Always include descriptive aria-labels
- Use semantic colors (success/error/warning)
- Maintain consistent stroke width
- Icons should enhance, not replace text labels on primary actions

### Component Patterns

#### Cards
```css
border-radius: 12px;
padding: 16px;
box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
min-height: 48px; /* Ensure touch target size */
```

#### Buttons
```css
/* Primary CTA */
height: 48px;
padding: 12px 24px;
border-radius: 8px;
font-weight: 600;
font-size: 16px;

/* Secondary */
Same as primary, with outline style

/* Icon Button */
width: 48px;
height: 48px;
padding: 12px;
```

#### Forms
```css
/* Input fields */
height: 48px;
padding: 12px 16px;
border-radius: 8px;
font-size: 16px; /* Prevents iOS zoom */
border: 2px solid var(--gray-300);

/* Focus state */
border-color: var(--primary);
outline: 2px solid var(--primary-light);
outline-offset: 2px;
```

---

## 📱 Phase 3: Responsive Wireframes (Week 2-3)

### Screen Breakpoints

```css
/* Mobile First Approach */
--mobile-sm: 320px;   /* Small phones (iPhone SE) */
--mobile-md: 375px;   /* Standard phones (iPhone 12/13) */
--mobile-lg: 428px;   /* Large phones (iPhone 14 Pro Max) */
--tablet: 768px;      /* Tablets & landscape */
--desktop: 1024px;    /* Desktop */
```

### Key Screens Wireframes

#### 1. **Home Page (Landing)** - `index.tsx`

**Mobile (320px - 428px):**
```
┌─────────────────────────┐
│ [Logo]         [Login]  │ ← 64px header
├─────────────────────────┤
│                         │
│   🎁 Hero Section       │
│   "Vytvor wishlist"     │ ← 36px heading
│   Brief description     │ ← 16px text
│   [Začni zadarmo]       │ ← 56px CTA button
│                         │
├─────────────────────────┤
│   ✨ Funkcie            │
│   ┌─────────────────┐   │
│   │ Icon + Text     │   │ ← Feature cards
│   └─────────────────┘   │   (full width)
│   ┌─────────────────┐   │
│   │ Icon + Text     │   │
│   └─────────────────┘   │
│   ┌─────────────────┐   │
│   │ Icon + Text     │   │
│   └─────────────────┘   │
├─────────────────────────┤
│   📱 Ako to funguje     │
│   1. Vytvor wishlist    │
│   2. Pridaj položky     │
│   3. Zdieľaj s priateľmi│
├─────────────────────────┤
│   [Začni teraz]         │ ← Secondary CTA
│   Footer                │
└─────────────────────────┘
```

**Tablet/Desktop (768px+):**
- 2-column layout for features
- Hero image alongside text
- Horizontal feature showcase

#### 2. **Dashboard** - `dashboard.tsx`

**Mobile Layout:**
```
┌─────────────────────────┐
│ [☰]  Dashboard  [+]     │ ← 64px sticky header
├─────────────────────────┤
│ 👋 Ahoj, [Name]         │ ← Greeting section
│ Máš X wishlistov        │
├─────────────────────────┤
│ 🔍 [Search wishlists]   │ ← 48px search bar
├─────────────────────────┤
│ ┌─────────────────────┐ │
│ │ 🎁 Wishlist Card    │ │
│ │ Title               │ │
│ │ X items             │ │
│ │ [👁 View] [⚙️ Edit] │ │ ← 48px buttons
│ └─────────────────────┘ │
│ ┌─────────────────────┐ │
│ │ 🎁 Wishlist Card    │ │
│ │ ...                 │ │
│ └─────────────────────┘ │
├─────────────────────────┤
│ [🏠] [📋] [➕] [👤]     │ ← 64px bottom nav
└─────────────────────────┘
```

**Key Interactions:**
- Swipe left on card → Quick actions (Edit/Delete/Share)
- Long press → Selection mode
- Pull to refresh
- Infinite scroll for many wishlists

#### 3. **Wishlist Detail** - `wishlist/[slug].tsx`

**Mobile Layout (Public View):**
```
┌─────────────────────────┐
│ [←]  Wishlist Name      │ ← 64px header + back
├─────────────────────────┤
│ 📷 Cover Image          │ ← Optional hero image
│ Description text        │
├─────────────────────────┤
│ Položky (X)             │
│                         │
│ ┌─────────────────────┐ │
│ │ 🖼️ Product Image    │ │ ← Item card
│ │ Product Name        │ │   (full width)
│ │ €XX.XX              │ │
│ │ [Rezervovať]        │ │ ← 48px CTA
│ └─────────────────────┘ │
│ ┌─────────────────────┐ │
│ │ 🖼️ [Reserved]       │ │ ← Reserved item
│ │ Product Name        │ │   (grayed out)
│ │ €XX.XX              │ │
│ │ ✓ Rezervované       │ │
│ └─────────────────────┘ │
├─────────────────────────┤
│ [🏠] [📋] [🔗 Share]    │ ← Bottom actions
└─────────────────────────┘
```

**Owner Edit Mode:**
- Add [✏️ Edit] and [🗑️ Delete] buttons per item
- Floating [+ Add Item] button (bottom right)
- Reorder mode with drag handles

#### 4. **Add/Edit Item Form**

**Mobile Layout:**
```
┌─────────────────────────┐
│ [←]  Pridať položku     │
├─────────────────────────┤
│ ┌─────────────────────┐ │
│ │ 📷 Upload Image     │ │ ← Large upload area
│ │ Tap to upload       │ │   (120px height)
│ └─────────────────────┘ │
│                         │
│ Názov produktu *        │
│ ┌─────────────────────┐ │
│ │ [Input field]       │ │ ← 48px inputs
│ └─────────────────────┘ │
│                         │
│ Popis                   │
│ ┌─────────────────────┐ │
│ │ [Textarea]          │ │ ← 96px textarea
│ │                     │ │
│ └─────────────────────┘ │
│                         │
│ Cena                    │
│ ┌─────────────────────┐ │
│ │ [Numeric input] €   │ │ ← Number keyboard
│ └─────────────────────┘ │
│                         │
│ Link na produkt         │
│ ┌─────────────────────┐ │
│ │ [URL input]         │ │ ← URL keyboard
│ └─────────────────────┘ │
│                         │
│ [Uložiť]                │ ← 56px CTA button
│                         │   (bottom, sticky)
└─────────────────────────┘
```

**Input Types (Critical for mobile UX):**
- Name: `type="text"`
- Price: `type="number"` `inputmode="decimal"`
- URL: `type="url"` `inputmode="url"`
- Email: `type="email"` `inputmode="email"`

#### 5. **Profile/Settings** - `profile.tsx`

**Mobile Layout:**
```
┌─────────────────────────┐
│ [←]  Profil             │
├─────────────────────────┤
│      👤                 │
│   [Profile Photo]       │ ← Avatar 80px
│   [Change Photo]        │
├─────────────────────────┤
│ Základné informácie     │
│                         │
│ Meno                    │
│ ┌─────────────────────┐ │
│ │ [Input]             │ │
│ └─────────────────────┘ │
│                         │
│ Email                   │
│ ┌─────────────────────┐ │
│ │ [Input]             │ │
│ └─────────────────────┘ │
├─────────────────────────┤
│ Nastavenia              │
│                         │
│ Jazyk                   │
│ ┌─────────────────────┐ │
│ │ 🇸🇰 SK      [▼]    │ │ ← Select dropdown
│ └─────────────────────┘ │
├─────────────────────────┤
│ [Uložiť zmeny]          │
│ [Odhlásiť sa]           │
└─────────────────────────┘
```

#### 6. **Onboarding Flow** (New user experience)

**Screen 1: Welcome**
```
┌─────────────────────────┐
│                         │
│   🎁                    │
│   ChcemMať              │
│                         │
│   "Zdieľaj svoje        │
│   priania s priateľmi"  │
│                         │
│   • • • •              │ ← Progress dots
│                         │
│   [Ďalej]               │
│   [Preskočiť]           │
└─────────────────────────┘
```

**Screen 2: Create Wishlist**
```
┌─────────────────────────┐
│                         │
│   📝                    │
│   "Vytvor si svoj       │
│   prvý wishlist"        │
│                         │
│   • • • •              │
│                         │
│   [Ďalej]               │
│   [Späť]                │
└─────────────────────────┘
```

**Screen 3: Add Items**
```
┌─────────────────────────┐
│                         │
│   🛍️                   │
│   "Pridaj produkty,     │
│   ktoré chceš"          │
│                         │
│   • • • •              │
│                         │
│   [Ďalej]               │
│   [Späť]                │
└─────────────────────────┘
```

**Screen 4: Share**
```
┌─────────────────────────┐
│                         │
│   🔗                    │
│   "Zdieľaj link         │
│   s priateľmi"          │
│                         │
│   • • • •              │
│                         │
│   [Začať]               │
│   [Späť]                │
└─────────────────────────┘
```

### Landscape Orientation Adaptations

**Key Changes for Landscape:**
- Use horizontal space efficiently
- Two-column layouts where appropriate
- Reduce vertical scrolling
- Keep navigation accessible
- Maintain touch target sizes

```
Landscape Layout Example (Dashboard):
┌────────────────────────────────────────┐
│ [☰] Dashboard           [Search] [+]   │
├──────────────────┬─────────────────────┤
│ 🎁 Wishlist 1    │ 🎁 Wishlist 2       │
│ X items          │ X items             │
│ [View] [Edit]    │ [View] [Edit]       │
├──────────────────┼─────────────────────┤
│ 🎁 Wishlist 3    │ 🎁 Wishlist 4       │
│ ...              │ ...                 │
└──────────────────┴─────────────────────┘
```

---

## ♿ Phase 4: Accessibility Checklist (WCAG 2.1 AA) (Week 3)

### Perceivable

#### Text Alternatives (1.1.1 - Level A)
- [ ] All images have descriptive `alt` text
- [ ] Decorative images use `alt=""` or `aria-hidden="true"`
- [ ] Icons have `aria-label` or accompanying text
- [ ] Logo has appropriate alt text

#### Color Contrast (1.4.3 - Level AA)
- [ ] Normal text: 4.5:1 minimum contrast ratio
- [ ] Large text (24px+): 3:1 minimum contrast ratio
- [ ] UI components: 3:1 minimum contrast ratio
- [ ] Test all color combinations with WebAIM contrast checker
- [ ] Avoid color as only means of conveying information

#### Resize Text (1.4.4 - Level AA)
- [ ] Text can be resized up to 200% without loss of content
- [ ] Use relative units (rem, em) instead of px for font sizes
- [ ] Test zoom functionality in browsers

#### Text Spacing (1.4.12 - Level AA)
- [ ] Line height at least 1.5x font size
- [ ] Paragraph spacing at least 2x font size
- [ ] Letter spacing at least 0.12x font size
- [ ] Word spacing at least 0.16x font size

### Operable

#### Keyboard Navigation (2.1.1 - Level A)
- [ ] All interactive elements accessible via keyboard
- [ ] Tab order follows logical reading order
- [ ] No keyboard traps
- [ ] Skip navigation link for main content
- [ ] Test full user flows with keyboard only

#### Focus Visible (2.4.7 - Level AA)
- [ ] Clear focus indicators on all interactive elements
- [ ] Focus outline: 2px solid, high contrast color
- [ ] Focus indicators never hidden with `outline: none` without alternative
- [ ] Maintain focus visibility during navigation

#### Touch Target Size (2.5.5 - Level AAA, but recommended)
- [ ] All touch targets minimum 48px × 48px
- [ ] Spacing between targets minimum 8px
- [ ] Exceptions: inline links with sufficient line height
- [ ] Test on actual mobile devices

#### Label in Name (2.5.3 - Level A)
- [ ] Visual labels match accessible names
- [ ] Button text matches aria-label (if present)
- [ ] Consistency between visual and programmatic labels

### Understandable

#### Language of Page (3.1.1 - Level A)
- [ ] `<html lang="sk">` or `<html lang="en">` set correctly
- [ ] Language changes marked with `lang` attribute
- [ ] Support for Slovak and English throughout

#### Error Identification (3.1.1 - Level A)
- [ ] Form errors clearly identified
- [ ] Error messages describe the problem
- [ ] Suggestions provided for correction
- [ ] Required fields marked with asterisk + "required" text

#### Error Prevention (3.3.4 - Level AA)
- [ ] Confirmation dialogs for destructive actions (delete wishlist/item)
- [ ] Ability to review data before final submission
- [ ] Undo/revert functionality where possible
- [ ] Validate inputs before submission

### Robust

#### Parsing (4.1.1 - Level A)
- [ ] Valid HTML markup
- [ ] No duplicate IDs
- [ ] Properly nested elements
- [ ] Opening and closing tags match

#### Name, Role, Value (4.1.2 - Level A)
- [ ] All form controls have labels
- [ ] ARIA roles used correctly
- [ ] States (expanded, selected, checked) communicated
- [ ] Custom components follow ARIA patterns

### Screen Reader Testing

**Test with:**
- [ ] VoiceOver (iOS Safari)
- [ ] TalkBack (Android Chrome)
- [ ] NVDA (Desktop)

**Test scenarios:**
- [ ] Navigate homepage and understand purpose
- [ ] Create new wishlist
- [ ] Add item to wishlist
- [ ] Reserve item (public view)
- [ ] Navigate profile settings
- [ ] Complete onboarding flow

### Semantic HTML

```html
<!-- Use semantic elements -->
<header>
<nav>
<main>
<article>
<section>
<aside>
<footer>

<!-- Not just divs everywhere -->
<div class="header"> ❌
```

### ARIA Best Practices

```html
<!-- Button with icon -->
<button aria-label="Pridať wishlist">
  <PlusIcon aria-hidden="true" />
</button>

<!-- Form with error -->
<div>
  <label for="wishlist-title">Názov wishlistu *</label>
  <input 
    id="wishlist-title"
    type="text"
    required
    aria-required="true"
    aria-invalid="true"
    aria-describedby="title-error"
  />
  <span id="title-error" role="alert">
    Názov je povinný
  </span>
</div>

<!-- Modal dialog -->
<div 
  role="dialog" 
  aria-modal="true" 
  aria-labelledby="dialog-title"
>
  <h2 id="dialog-title">Zmazať wishlist?</h2>
  ...
</div>
```

---

## ⚡ Phase 5: Performance Recommendations (Week 4)

### Target Metrics

**Lighthouse Score: ≥ 90**
- Performance: ≥ 90
- Accessibility: ≥ 90
- Best Practices: ≥ 90
- SEO: ≥ 90

**Core Web Vitals:**
- LCP (Largest Contentful Paint): < 2.5s
- FID (First Input Delay): < 100ms
- CLS (Cumulative Layout Shift): < 0.1

**Network Performance:**
- Load time on 3G: < 3s
- Time to Interactive: < 3.8s
- First Contentful Paint: < 1.8s

### Image Optimization

#### 1. **Next.js Image Component**
```tsx
// Replace all <img> with Next.js Image
import Image from "next/image";

// Before
<img src="/wishlist-cover.jpg" alt="Wishlist cover" />

// After
<Image
  src="/wishlist-cover.jpg"
  alt="Wishlist cover"
  width={800}
  height={400}
  placeholder="blur"
  blurDataURL="data:image/jpeg;base64,..."
  loading="lazy"
  quality={80}
/>
```

#### 2. **Image Formats**
- Serve WebP with JPEG fallback
- Use AVIF for even better compression (where supported)
- Compress images before upload (max 1MB per image)

#### 3. **Responsive Images**
```tsx
<Image
  src="/wishlist-cover.jpg"
  alt="Wishlist cover"
  sizes="(max-width: 768px) 100vw, 800px"
  width={800}
  height={400}
  priority={false} // Only true for above-the-fold images
/>
```

#### 4. **Lazy Loading**
- Lazy load all images below the fold
- Use `loading="lazy"` attribute
- Implement intersection observer for custom lazy loading

### Code Splitting & Bundle Optimization

#### 1. **Dynamic Imports**
```tsx
// Before: Import everything upfront
import { WishlistEditor } from "@/components/WishlistEditor";

// After: Load on demand
import dynamic from "next/dynamic";

const WishlistEditor = dynamic(
  () => import("@/components/WishlistEditor"),
  { 
    loading: () => <Skeleton />,
    ssr: false // If component only works client-side
  }
);
```

#### 2. **Route-based Code Splitting**
Next.js automatically splits by route. Ensure:
- Each page imports only what it needs
- Shared components in separate chunks
- Heavy libraries loaded conditionally

#### 3. **Tree Shaking**
```tsx
// Before: Import entire library
import _ from "lodash";

// After: Import only what you need
import debounce from "lodash/debounce";

// Better: Use native methods when possible
const debounce = (fn, delay) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => fn(...args), delay);
  };
};
```

### Caching Strategy

#### 1. **Service Worker Setup**
```typescript
// public/service-worker.js
const CACHE_NAME = "chcemmat-v1";
const urlsToCache = [
  "/",
  "/dashboard",
  "/styles/globals.css",
  "/manifest.json",
  // Add critical resources
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // Cache first, then network
      return response || fetch(event.request);
    })
  );
});
```

#### 2. **API Response Caching**
```tsx
// Use SWR for client-side caching
import useSWR from "swr";

function Dashboard() {
  const { data, error } = useSWR(
    "/api/wishlists",
    fetcher,
    {
      revalidateOnFocus: false,
      dedupingInterval: 60000, // 1 minute
    }
  );
}
```

#### 3. **Static Generation**
```tsx
// Pre-render public wishlists at build time
export async function getStaticPaths() {
  const wishlists = await getPublicWishlists();
  return {
    paths: wishlists.map((w) => ({
      params: { slug: w.share_slug },
    })),
    fallback: "blocking", // Generate on demand
  };
}

export async function getStaticProps({ params }) {
  const wishlist = await getWishlistBySlug(params.slug);
  return {
    props: { wishlist },
    revalidate: 3600, // Regenerate every hour
  };
}
```

### Database Optimization

#### 1. **Query Optimization**
```typescript
// Before: Multiple queries
const wishlists = await getWishlists(userId);
for (const wishlist of wishlists) {
  wishlist.items = await getItems(wishlist.id);
}

// After: Single query with join
const wishlists = await supabase
  .from("wishlists")
  .select(`
    *,
    items:items(*)
  `)
  .eq("user_id", userId);
```

#### 2. **Pagination**
```typescript
// Implement cursor-based pagination
const { data, error } = await supabase
  .from("wishlists")
  .select("*")
  .range(0, 9) // First 10 items
  .order("created_at", { ascending: false });
```

#### 3. **Indexes**
Ensure database indexes on:
- `wishlists.user_id`
- `wishlists.share_slug`
- `items.wishlist_id`
- `reservations.item_id`

### Network Optimization

#### 1. **Reduce Network Requests**
- Combine API calls where possible
- Use GraphQL for flexible data fetching
- Implement request batching

#### 2. **Compression**
Ensure server compression enabled:
- Gzip/Brotli for text assets
- Already handled by Vercel/Next.js

#### 3. **CDN Usage**
- Static assets served from Vercel CDN
- Images served from Supabase CDN
- Enable edge caching for public routes

### Font Optimization

```tsx
// _app.tsx - Preload fonts
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  display: "swap", // Prevent FOIT (Flash of Invisible Text)
  preload: true,
});

export default function App({ Component, pageProps }) {
  return (
    <main className={inter.className}>
      <Component {...pageProps} />
    </main>
  );
}
```

### JavaScript Optimization

#### 1. **Remove Unused Code**
```bash
# Analyze bundle size
npx next build --analyze

# Identify large dependencies
npm install -g webpack-bundle-analyzer
```

#### 2. **Debounce/Throttle Events**
```tsx
// Search input with debounce
const [searchTerm, setSearchTerm] = useState("");

const debouncedSearch = useMemo(
  () =>
    debounce((value: string) => {
      // Perform search
    }, 300),
  []
);

const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
  setSearchTerm(e.target.value);
  debouncedSearch(e.target.value);
};
```

#### 3. **Avoid Heavy Re-renders**
```tsx
// Use React.memo for expensive components
const WishlistCard = React.memo(({ wishlist }) => {
  return (
    // Card content
  );
}, (prevProps, nextProps) => {
  return prevProps.wishlist.id === nextProps.wishlist.id;
});

// Use useCallback for functions passed as props
const handleDelete = useCallback((id: string) => {
  deleteWishlist(id);
}, []);
```

### CSS Optimization

#### 1. **Critical CSS**
```tsx
// _document.tsx - Inline critical CSS
import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <style dangerouslySetInnerHTML={{ __html: criticalCSS }} />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
```

#### 2. **Reduce CSS Size**
- Use Tailwind's purge feature (already enabled)
- Avoid unnecessary custom CSS
- Use CSS modules for component styles

### Monitoring & Analytics

#### 1. **Real User Monitoring (RUM)**
```tsx
// _app.tsx - Track Core Web Vitals
import { useReportWebVitals } from "next/web-vitals";

export default function App({ Component, pageProps }) {
  useReportWebVitals((metric) => {
    // Send to analytics
    console.log(metric);
  });

  return <Component {...pageProps} />;
}
```

#### 2. **Error Tracking**
- Implement Sentry or similar
- Track failed API requests
- Monitor performance regressions

---

## 📲 Phase 6: Offline Behavior (Week 4)

### Service Worker Implementation

#### 1. **Install Service Worker**
```typescript
// public/service-worker.js
const CACHE_NAME = "chcemmat-v1";
const API_CACHE = "chcemmat-api-v1";

// Static assets to cache immediately
const STATIC_CACHE = [
  "/",
  "/dashboard",
  "/manifest.json",
  "/offline.html",
  "/_next/static/css/...", // Add critical CSS
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_CACHE);
    })
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME && name !== API_CACHE)
          .map((name) => caches.delete(name))
      );
    })
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // API requests - Network first, cache fallback
  if (url.pathname.startsWith("/api/")) {
    event.respondWith(
      fetch(request)
        .then((response) => {
          const clonedResponse = response.clone();
          caches.open(API_CACHE).then((cache) => {
            cache.put(request, clonedResponse);
          });
          return response;
        })
        .catch(() => {
          return caches.match(request);
        })
    );
    return;
  }

  // Static assets - Cache first, network fallback
  event.respondWith(
    caches.match(request).then((cachedResponse) => {
      return (
        cachedResponse ||
        fetch(request).catch(() => {
          // Offline fallback page
          if (request.mode === "navigate") {
            return caches.match("/offline.html");
          }
        })
      );
    })
  );
});
```

#### 2. **Register Service Worker**
```tsx
// _app.tsx
useEffect(() => {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker
      .register("/service-worker.js")
      .then((registration) => {
        console.log("Service Worker registered:", registration);
      })
      .catch((error) => {
        console.error("Service Worker registration failed:", error);
      });
  }
}, []);
```

### Offline UI Feedback

#### 1. **Connection Status**
```tsx
// components/ConnectionStatus.tsx
export function ConnectionStatus() {
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  if (isOnline) return null;

  return (
    <div className="fixed top-0 left-0 right-0 bg-yellow-500 text-white px-4 py-2 text-center z-50">
      ⚠️ Offline režim - Niektoré funkcie nie sú dostupné
    </div>
  );
}
```

#### 2. **Offline Page**
```html
<!-- public/offline.html -->
<!DOCTYPE html>
<html lang="sk">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Offline - ChcemMať</title>
  <style>
    body {
      font-family: system-ui, -apple-system, sans-serif;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      margin: 0;
      padding: 20px;
      text-align: center;
    }
    h1 { font-size: 24px; margin-bottom: 16px; }
    p { color: #666; margin-bottom: 24px; }
    button {
      background: #3B82F6;
      color: white;
      border: none;
      padding: 12px 24px;
      border-radius: 8px;
      font-size: 16px;
      cursor: pointer;
    }
  </style>
</head>
<body>
  <h1>📵 Nie ste pripojený na internet</h1>
  <p>Skontrolujte svoje pripojenie a skúste to znova.</p>
  <button onclick="location.reload()">Obnoviť stránku</button>
</body>
</html>
```

### Background Sync

#### 1. **Queue Failed Requests**
```typescript
// lib/syncQueue.ts
interface QueuedRequest {
  url: string;
  method: string;
  body: any;
  timestamp: number;
}

export class SyncQueue {
  private queue: QueuedRequest[] = [];

  async add(request: QueuedRequest) {
    this.queue.push(request);
    localStorage.setItem("sync-queue", JSON.stringify(this.queue));
  }

  async process() {
    const queue = JSON.parse(localStorage.getItem("sync-queue") || "[]");
    
    for (const request of queue) {
      try {
        await fetch(request.url, {
          method: request.method,
          body: JSON.stringify(request.body),
          headers: { "Content-Type": "application/json" },
        });
        
        // Remove from queue on success
        this.queue = this.queue.filter((r) => r.timestamp !== request.timestamp);
      } catch (error) {
        console.error("Failed to sync:", error);
      }
    }
    
    localStorage.setItem("sync-queue", JSON.stringify(this.queue));
  }
}
```

#### 2. **Sync on Reconnection**
```tsx
// hooks/useSync.ts
export function useSync() {
  const syncQueue = new SyncQueue();

  useEffect(() => {
    const handleOnline = async () => {
      await syncQueue.process();
    };

    window.addEventListener("online", handleOnline);
    return () => window.removeEventListener("online", handleOnline);
  }, []);
}
```

---

## 🎯 Phase 7: Implementation Roadmap (Week 5-6)

### Week 1: Foundation & Critical UX Fixes
**Days 1-2: Setup & Audit**
- [ ] Audit current mobile experience
- [ ] Set up performance monitoring
- [ ] Create feature flags for gradual rollout
- [ ] Document baseline metrics

**Days 3-5: Touch Targets & Navigation**
- [ ] Implement 48px minimum touch targets across all buttons
- [ ] Update button components with proper sizing
- [ ] Create bottom navigation component
- [ ] Implement hamburger menu for secondary actions
- [ ] Test navigation flow on real devices

### Week 2: Design System & Responsive Layouts
**Days 1-3: Design System Implementation**
- [ ] Create CSS variable system for spacing/typography
- [ ] Update color palette with WCAG AA compliant colors
- [ ] Implement responsive typography scale
- [ ] Create mobile-first component library
- [ ] Document design tokens

**Days 4-5: Responsive Wireframes**
- [ ] Refactor homepage for mobile-first design
- [ ] Redesign dashboard with card-based layout
- [ ] Optimize wishlist detail view for mobile
- [ ] Create mobile-optimized forms
- [ ] Implement landscape orientation support

### Week 3: Accessibility & Forms
**Days 1-3: Accessibility Implementation**
- [ ] Add ARIA labels to all interactive elements
- [ ] Implement keyboard navigation
- [ ] Create focus indicators
- [ ] Add skip navigation links
- [ ] Test with screen readers (VoiceOver, TalkBack)

**Days 4-5: Form Optimization**
- [ ] Update input types for mobile keyboards
- [ ] Implement autofill attributes
- [ ] Add real-time validation
- [ ] Create error messaging system
- [ ] Optimize file upload for mobile

### Week 4: Performance & Offline
**Days 1-3: Performance Optimization**
- [ ] Implement Next.js Image optimization
- [ ] Add lazy loading for images
- [ ] Implement code splitting with dynamic imports
- [ ] Set up service worker caching
- [ ] Optimize database queries

**Days 4-5: Offline Support**
- [ ] Implement service worker with offline caching
- [ ] Create offline UI feedback
- [ ] Add background sync for failed requests
- [ ] Create offline fallback pages
- [ ] Test offline functionality

### Week 5: Onboarding & User Testing
**Days 1-2: Onboarding Flow**
- [ ] Create 4-screen onboarding flow
- [ ] Implement progress indicators
- [ ] Add skip/back navigation
- [ ] Test first-time user experience

**Days 3-5: User Testing Round 1**
- [ ] Conduct usability testing with 5-10 users
- [ ] Test on iOS devices (iPhone SE, 12, 14 Pro Max)
- [ ] Test on Android devices (various sizes)
- [ ] Gather feedback on navigation and usability
- [ ] Document issues and prioritize fixes

### Week 6: Polish & Launch
**Days 1-3: Refinement**
- [ ] Fix critical issues from user testing
- [ ] Optimize animations and transitions
- [ ] Improve loading states and skeletons
- [ ] Final accessibility audit
- [ ] Final performance audit

**Days 4-5: Launch Preparation**
- [ ] Achieve Lighthouse mobile score ≥ 90
- [ ] Verify all touch targets ≥ 48px
- [ ] Confirm load time < 3s on 3G
- [ ] Complete WCAG 2.1 AA checklist
- [ ] Prepare rollout plan
- [ ] Deploy to production

---

## 🎭 User Personas

### Persona 1: First-Time User (Mária, 28)
**Background:** Marketing specialist, tech-savvy but not developer
**Device:** iPhone 13, mostly portrait mode
**Context:** Creating wishlist for upcoming birthday
**Goals:**
- Quick registration
- Easy wishlist creation
- Simple item adding
- Share with friends immediately

**Pain Points:**
- Confused by complex interfaces
- Frustrated by small touch targets
- Gives up if onboarding takes too long
- Needs clear CTAs and guidance

**Design Priorities:**
1. Clear onboarding flow
2. Large, obvious CTAs
3. Minimal steps to first success
4. Visual feedback for all actions

### Persona 2: Returning Power User (Peter, 35)
**Background:** Software engineer, creates many wishlists
**Device:** Android Pixel, often landscape mode
**Context:** Manages 20+ wishlists for various occasions
**Goals:**
- Quick access to wishlists
- Efficient item management
- Bulk operations
- Advanced features (sorting, filtering)

**Pain Points:**
- Slow navigation between wishlists
- Too many clicks for common actions
- Limited keyboard shortcuts
- Inefficient for power users

**Design Priorities:**
1. Fast navigation and search
2. Keyboard shortcuts
3. Batch operations
4. Advanced filters and sorting

### Persona 3: Low Bandwidth User (Jana, 45)
**Background:** Teacher in rural area, 3G connection
**Device:** Budget Android phone (smaller screen)
**Context:** Unreliable internet, often offline
**Goals:**
- View wishlists offline
- Minimal data usage
- Quick load times
- Reliable experience

**Pain Points:**
- Images don't load
- Long wait times
- App breaks offline
- High data consumption

**Design Priorities:**
1. Aggressive image optimization
2. Offline-first approach
3. Progressive enhancement
4. Minimal dependencies

---

## 📊 Success Metrics

### Quantitative Metrics

**Performance:**
- [ ] Lighthouse mobile score: ≥ 90
- [ ] Load time on 3G: < 3s
- [ ] Time to Interactive: < 3.8s
- [ ] First Contentful Paint: < 1.8s
- [ ] Cumulative Layout Shift: < 0.1

**Accessibility:**
- [ ] WCAG 2.1 AA compliance: 100%
- [ ] Touch targets ≥ 48px: 100%
- [ ] Color contrast ratios: All pass
- [ ] Screen reader compatibility: Fully navigable

**User Engagement:**
- [ ] Mobile bounce rate: < 40%
- [ ] Avg session duration: > 3 minutes
- [ ] Wishlist creation rate: > 60%
- [ ] Item addition rate: > 80%

### Qualitative Metrics

**Usability Testing (5-10 users per persona):**
- [ ] Task completion rate: > 90%
- [ ] User satisfaction score: > 4/5
- [ ] Time to create first wishlist: < 2 minutes
- [ ] Number of errors: < 2 per user

**User Feedback:**
- [ ] "Easy to use on my phone"
- [ ] "Fast and responsive"
- [ ] "Clear what to do next"
- [ ] "Works even without internet"

---

## 🚀 Deployment Strategy

### Gradual Rollout

**Phase 1: Internal Testing (Week 5)**
- Deploy to staging environment
- Test with team members
- Gather internal feedback
- Fix critical bugs

**Phase 2: Beta Testing (Week 6)**
- Release to 10% of users
- Monitor analytics and errors
- Gather user feedback
- Iterate on issues

**Phase 3: Full Rollout (Post Week 6)**
- Gradual rollout to 100% of users
- Monitor performance metrics
- Respond to user feedback
- Continuous improvement

### Feature Flags

```typescript
// lib/featureFlags.ts
export const FEATURE_FLAGS = {
  MOBILE_REDESIGN: process.env.NEXT_PUBLIC_MOBILE_REDESIGN === "true",
  OFFLINE_MODE: process.env.NEXT_PUBLIC_OFFLINE_MODE === "true",
  ONBOARDING_FLOW: process.env.NEXT_PUBLIC_ONBOARDING === "true",
};

// Usage
if (FEATURE_FLAGS.MOBILE_REDESIGN) {
  return <NewMobileLayout />;
}
return <OldLayout />;
```

---

## 📝 Notes & Considerations

### Browser Support
- iOS Safari 14+
- Android Chrome 90+
- Progressive enhancement for older browsers
- Graceful degradation where needed

### Device Testing
**Minimum test devices:**
- iPhone SE (320px width)
- iPhone 12/13 (390px width)
- iPhone 14 Pro Max (428px width)
- Android small (360px width)
- Android large (412px width)

### Internationalization
- Maintain Slovak and English support
- Ensure translations work in small spaces
- Test RTL languages for future expansion

### Future Enhancements
- Dark mode support
- Push notifications
- Advanced filtering/search
- Social sharing optimizations
- Analytics dashboard for wishlist owners

---

## ✅ Final Checklist

Before declaring mobile redesign complete:

**Design:**
- [ ] All wireframes approved
- [ ] Design system documented
- [ ] Style guide created
- [ ] Component library complete

**Development:**
- [ ] All touch targets ≥ 48px
- [ ] Mobile-first responsive layouts
- [ ] Forms optimized for mobile
- [ ] Images optimized
- [ ] Code splitting implemented
- [ ] Service worker active
- [ ] Offline mode functional

**Accessibility:**
- [ ] WCAG 2.1 AA checklist complete
- [ ] Screen reader testing passed
- [ ] Keyboard navigation working
- [ ] Color contrast verified
- [ ] ARIA labels added

**Performance:**
- [ ] Lighthouse score ≥ 90
- [ ] Load time < 3s on 3G
- [ ] Core Web Vitals passing
- [ ] Bundle size optimized

**Testing:**
- [ ] Manual testing on iOS
- [ ] Manual testing on Android
- [ ] Portrait mode tested
- [ ] Landscape mode tested
- [ ] Usability testing complete
- [ ] User feedback incorporated

**Documentation:**
- [ ] Implementation guide complete
- [ ] Style guide published
- [ ] Accessibility checklist shared
- [ ] Performance report documented

---

## 📞 Support & Resources

**Design Tools:**
- Figma: High-fidelity mockups
- WebAIM Contrast Checker: Color accessibility
- Lighthouse: Performance auditing

**Testing Tools:**
- Chrome DevTools: Mobile simulation
- BrowserStack: Real device testing
- axe DevTools: Accessibility testing
- WebPageTest: Performance analysis

**Documentation:**
- WCAG 2.1 Guidelines: https://www.w3.org/WAI/WCAG21/quickref/
- Next.js Performance: https://nextjs.org/docs/advanced-features/measuring-performance
- Mobile Web Best Practices: https://web.dev/mobile/

---

**End of Mobile Redesign Documentation**

This comprehensive guide provides everything needed to transform ChcemMať into a world-class mobile experience. The 6-week timeline is aggressive but achievable with focused execution and clear priorities.

Next steps: Review this document with stakeholders, adjust timeline/scope as needed, and begin Week 1 implementation!
