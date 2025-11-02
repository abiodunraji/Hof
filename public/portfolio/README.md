# Portfolio Images Directory

This directory contains all portfolio images for both HOF Interiors and HOF Construction brands.

## Directory Structure

```
public/portfolio/
├── interiors/          # HOF Interiors project images
│   ├── project-1/      # Example: organized by project
│   ├── project-2/
│   └── ...
├── construction/       # HOF Construction project images
│   ├── project-1/
│   ├── project-2/
│   └── ...
└── README.md          # This file
```

## How to Add Your Own Portfolio Images

### Step 1: Organize Your Images

1. **For Interiors Projects:**
   - Place images in `public/portfolio/interiors/`
   - Recommended: Create a subfolder for each project (e.g., `serene-living-space/`)
   - Use descriptive filenames (e.g., `living-room-1.jpg`, `detail-view.jpg`)

2. **For Construction Projects:**
   - Place images in `public/portfolio/construction/`
   - Follow the same organization pattern

### Step 2: Update Portfolio Data

Edit the file: `src/data/portfolioData.ts`

#### For Single Image Projects

```typescript
{
  id: 10, // Use next available ID
  title: 'Your Project Title',
  category: 'Living Rooms', // Must match existing categories
  description: 'Short description for the card view',
  image: '/portfolio/interiors/your-project/main-image.jpg', // Main image
  tags: ['Tag1', 'Tag2', 'Tag3'],
  location: 'Project Location',
  year: '2024',
  budget: '₦25,000,000',
  duration: '3 months',
  size: '500 sq ft',
  fullDescription: 'Detailed description for the modal view...',
  highlights: [
    'First highlight',
    'Second highlight',
    'Third highlight'
  ],
  // Single image project - no gallery needed
  gallery: ['/portfolio/interiors/your-project/main-image.jpg']
}
```

#### For Gallery Projects (Multiple Images)

```typescript
{
  id: 11,
  title: 'Gallery Project Title',
  category: 'Kitchens',
  description: 'Short description',
  image: '/portfolio/interiors/gallery-project/hero-image.jpg', // Main/hero image
  tags: ['Modern', 'Luxury'],
  location: 'Location',
  year: '2024',
  budget: '₦35,000,000',
  duration: '4 months',
  size: '600 sq ft',
  fullDescription: 'Detailed description...',
  highlights: [
    'Feature 1',
    'Feature 2',
    'Feature 3'
  ],
  // Gallery with multiple images
  gallery: [
    '/portfolio/interiors/gallery-project/image-1.jpg',
    '/portfolio/interiors/gallery-project/image-2.jpg',
    '/portfolio/interiors/gallery-project/image-3.jpg',
    '/portfolio/interiors/gallery-project/image-4.jpg'
  ]
}
```

### Step 3: Image Specifications

**Recommended Image Specs:**
- **Format:** JPG or WebP (for smaller file sizes)
- **Dimensions:** 
  - Main/Hero images: 1920x1280px (3:2 aspect ratio)
  - Gallery images: 1920x1280px or 1920x1440px
- **File size:** Under 500KB per image (compress with TinyPNG or similar)
- **Quality:** 80-85% compression for optimal balance

**Image Optimization Tools:**
- [TinyPNG](https://tinypng.com/) - Free online compression
- [Squoosh](https://squoosh.app/) - Advanced compression options
- [ImageOptim](https://imageoptim.com/) - Mac desktop app

## Portfolio Categories

### HOF Interiors Categories
- Living Rooms
- Bedrooms
- Kitchens
- Bathrooms
- Commercial

### HOF Construction Categories
- Commercial
- Residential
- Renovation

**Note:** If you need to add a new category, update both the `categories` array and add it to the type definitions in `portfolioData.ts`.

## Budget Format

All budgets are displayed in Nigerian Naira (₦). Common conversions:
- $65,000 ≈ ₦28,000,000
- $45,000 ≈ ₦19,500,000
- $85,000 ≈ ₦36,800,000

Use approximately 433 as the conversion rate (or current market rate).

## Gallery Navigation

- Projects with a `gallery` array show navigation arrows in the modal
- Single-image projects (gallery with 1 image) hide navigation arrows
- Image counter shows "X / Y" format (e.g., "3 / 5")
- Users can navigate with arrow buttons or keyboard arrows

## Fallback Images

The `ImageWithFallback` component automatically handles:
- Failed image loads
- Missing images
- Shows elegant SVG placeholder instead

## File Naming Best Practices

```
✅ Good:
- modern-kitchen-island.jpg
- bedroom-main-view.jpg
- bathroom-detail-1.jpg

❌ Avoid:
- IMG_1234.jpg
- photo.jpg
- untitled.jpg
```

## Quick Start Example

1. Add your image:
   ```
   public/portfolio/interiors/luxury-apartment/main-view.jpg
   ```

2. Open `src/data/portfolioData.ts`

3. Add to `interiorsProjects` array:
   ```typescript
   {
     id: 10,
     title: 'Luxury Apartment',
     category: 'Living Rooms',
     description: 'A sophisticated living space',
     image: '/portfolio/interiors/luxury-apartment/main-view.jpg',
     tags: ['Luxury', 'Modern'],
     location: 'Downtown Lagos',
     year: '2024',
     budget: '₦30,000,000',
     duration: '3 months',
     size: '450 sq ft',
     fullDescription: 'This luxury apartment combines...',
     highlights: [
       'Custom furniture',
       'Premium finishes',
       'Smart lighting'
     ],
     gallery: ['/portfolio/interiors/luxury-apartment/main-view.jpg']
   }
   ```

4. Save and refresh the website - your project appears!

## Support

For issues or questions about the portfolio system, refer to the main project documentation or the Copilot instructions in `.github/copilot-instructions.md`.
