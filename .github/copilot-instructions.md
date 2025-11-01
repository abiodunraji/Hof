# Copilot Instructions for House of Faridah (HOF) Project

## Project Overview
This is a **dual-brand interior design and construction website** built with React + Vite + TypeScript + Tailwind CSS v4. The project features two distinct sub-brands:
- **HOF Interiors** - Luxury interior design with feminine, elegant gold-themed styling
- **HOF Construction** - Professional construction services with wood-toned, masculine styling

Original design source: [Figma Interior Design Template](https://www.figma.com/design/jmvh0xP9NZPW67TGH8uHEt/Interior-Design-Website)

## Architecture & Navigation

### Client-Side Routing Pattern
This is a **SPA with manual state-based routing** (no React Router). Navigation hierarchy:
```
App.tsx (root router)
├── LandingPage ("/") - Brand selection
├── InteriorsApp ("/interiors") - Interior design sub-app
│   ├── Navigation + Footer (shared layout)
│   └── Pages: HomePage, AboutPage, PortfolioPage, ServicesPage, DesignProcessPage, ContactPage
└── ConstructionApp ("/construction") - Construction sub-app
    ├── ConstructionNavigation + ConstructionFooter
    └── Pages: ConstructionHomePage, ConstructionAboutPage, ConstructionPortfolioPage, ConstructionContactPage
```

**Navigation Implementation:**
- Use `onNavigate` prop with string-based page names (`'home'`, `'about'`, etc.)
- Always include `window.scrollTo({ top: 0, behavior: 'smooth' })` on navigation
- Return to main landing via `onNavigateToMain` callback prop
- Mobile menu must set `isOpen` state to false after navigation

## Design System & Styling

### Dual Theme Architecture
The project uses **CSS custom properties** for brand-specific theming in `src/styles/globals.css`:

**HOF Interiors Theme:**
- Primary colors: `--gold` (#d4af87), `--gold-light` (#f0e5d8), `--gold-dark` (#b8935e)
- Accent: `--rose-gold` (#c9a063)
- Background: `--background` (#fdfcfb)
- Typography: Playfair Display (headings), Inter (body)

**HOF Construction Theme:**
- Wood tones: `--wood-primary` (#8b6f47), `--wood-light` (#d4c4a8), `--wood-dark` (#6b5636)
- Maintains professional, grounded aesthetic

### Premium Typography System
```css
.font-display    /* Playfair Display, weight: 600, tracking: -0.02em */
.font-elegant    /* Playfair Display, weight: 500, tracking: -0.01em */
.text-luxury-spacing  /* 0.15em letter-spacing, uppercase, 500 weight */
```

Always use `font-display` for major headings and `font-elegant` for secondary headings.

### Custom Animation Classes
**Safe animations (use frequently):**
- `.animate-fade-in-up` - 0.6s fade + translateY(20px)
- `.hover-lift` - Subtle hover elevation (-3px)
- `.backdrop-elegant` - Premium backdrop blur effect

**Complex animations (use sparingly):**
- `.animate-luxury-glow`, `.animate-prestige-pulse` - For hero sections
- `.gold-shimmer` - Animated gold gradient (3s infinite)
- Stagger with inline styles: `style={{animationDelay: '0.2s'}}`

### 8pt Grid System
All spacing must align to 8pt grid (Tailwind spacing scale: 4, 8, 12, 16, 24, 32, 40, 48...).

## Component Patterns

### Image Loading
**Always use `ImageWithFallback`** instead of native `<img>`:
```tsx
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

<ImageWithFallback
  src="https://images.unsplash.com/..."
  alt="Descriptive alt text"
  className="w-full h-full object-cover"
/>
```
Provides automatic error handling with elegant fallback SVG.

### Consultation Dialog
Use `ConsultationDialog` component for contact forms:
```tsx
const [dialogOpen, setDialogOpen] = useState(false);
<ConsultationDialog 
  open={dialogOpen} 
  onOpenChange={setDialogOpen}
  serviceType="interiors" // or "construction"
/>
```
- Includes Nigerian phone validation (+234 prefix)
- Pre-written service-specific messages
- Budget ranges in Nigerian Naira (₦)

### shadcn/ui Components
All UI components in `src/components/ui/` use Radix primitives. Key components:
- `Button` - Use with `size="lg"` for CTAs
- `Card/CardHeader/CardTitle/CardContent` - Standard card layouts
- `Dialog` - Modal patterns (see ConsultationDialog)
- `Select` - Form dropdowns with proper Radix styling

**Button Variants:**
```tsx
<Button className="bg-primary hover:bg-primary/90">Primary CTA</Button>
<Button variant="outline">Secondary Action</Button>
```

## Page Structure Conventions

### Standard Page Layout
```tsx
export function PageName({ onNavigate }: { onNavigate: (page: string) => void }) {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-24 sm:py-28 lg:py-32 px-4 bg-gradient-to-br from-primary/5 via-white to-secondary/10">
        {/* Ambient backgrounds */}
        <div className="absolute inset-0 bg-[radial-gradient(...)]" />
        {/* Content */}
      </section>

      {/* Content Sections with consistent vertical rhythm */}
      <section className="py-24 sm:py-32 lg:py-40 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Grid layouts: grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 */}
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 sm:py-32 lg:py-40 px-4 bg-primary text-white">
        {/* Call to action with buttons */}
      </section>
    </div>
  );
}
```

### Responsive Spacing Patterns
- Hero sections: `py-24 sm:py-28 lg:py-32`
- Content sections: `py-24 sm:py-32 lg:py-40`
- Section gaps: `space-y-40 sm:space-y-48` for major content blocks
- Grid gaps: `gap-12 lg:gap-16 xl:gap-24`

## Development Workflow

### Build & Dev Commands
```bash
npm install          # Install dependencies
npm run dev          # Start dev server (http://localhost:3000)
npm run build        # Production build to /build
```

### Vite Configuration
- Port: 3000 (auto-opens browser)
- Path alias: `@/` → `./src/`
- Output: `build/` directory
- SWC for fast React compilation

### File Organization
- Pages: `src/pages/` (Interiors) and `src/pages/construction/` (Construction)
- Shared components: `src/components/`
- UI primitives: `src/components/ui/` (shadcn/ui)
- Styles: `src/styles/globals.css` (custom), `src/index.css` (Tailwind v4 generated)

## Critical Patterns & Gotchas

### Navigation State Management
Never use `href` or `<a>` tags. Always use:
```tsx
<button onClick={() => onNavigate('page-name')}>Navigate</button>
```

### Premium Visual Effects
**Section dividers** (between major content blocks):
```tsx
<div className="flex items-center justify-center gap-4">
  <div className="flex-1 h-px bg-gradient-to-r from-transparent via-primary/10 to-primary/20"></div>
  <div className="w-2 h-2 rounded-full bg-primary/30"></div>
  <div className="flex-1 h-px bg-gradient-to-l from-transparent via-primary/10 to-primary/20"></div>
</div>
```

**Image captions with hover reveal** (500ms transition):
```tsx
<div className="group relative">
  <div className="aspect-video rounded-3xl overflow-hidden">
    <ImageWithFallback src="..." className="transition-transform duration-700 group-hover:scale-105" />
    <div className="absolute bottom-0 left-0 right-0 px-8 py-6 bg-gradient-to-t from-black/80 to-transparent 
                    transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 
                    transition-all duration-500">
      <p className="text-white text-lg">Caption text</p>
    </div>
  </div>
</div>
```

### Brand-Specific Styling
Apply brand colors dynamically:
```tsx
// Interiors
<div className="text-primary bg-gradient-to-br from-gold-light/30 via-primary/10 to-gold/20">

// Construction
<div className="text-wood-dark bg-gradient-to-br from-wood-light/30 via-wood-secondary/10 to-wood-primary/20">
```

### Toast Notifications
Use Sonner for user feedback:
```tsx
import { toast } from 'sonner@2.0.3';
toast.success('Success message', { description: 'Details here' });
```
Toast component already included in both App components.

## Key Files Reference
- **Main router:** `src/App.tsx`
- **Design system:** `src/styles/globals.css`
- **Theme reference:** See `:root` CSS variables
- **Example page:** `src/pages/ServicesPage.tsx` (comprehensive patterns)
- **Sample forms:** `src/components/ConsultationDialog.tsx`

## External Dependencies
- Unsplash images (license: free for commercial use)
- Google Fonts: Playfair Display, Inter, Cormorant Garamond
- shadcn/ui components (MIT license)
