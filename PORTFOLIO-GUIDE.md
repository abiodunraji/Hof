# Portfolio System - Quick Reference Guide

## 📁 File Structure

```
Hof/
├── public/
│   └── portfolio/              ← Your images go here
│       ├── interiors/          ← HOF Interiors images
│       │   ├── project-1/
│       │   ├── project-2/
│       │   └── ...
│       ├── construction/       ← HOF Construction images
│       │   ├── project-1/
│       │   ├── project-2/
│       │   └── ...
│       └── README.md           ← Detailed instructions
│
├── src/
│   ├── data/
│   │   └── portfolioData.ts    ← Edit this to add projects
│   └── pages/
│       ├── PortfolioPage.tsx   ← HOF Interiors (uses portfolioData.ts)
│       └── construction/
│           └── ConstructionPortfolioPage.tsx ← HOF Construction
```

## 🚀 Quick Add New Project (3 Steps)

### Step 1: Add Your Image
```
📸 Place image in:
   public/portfolio/interiors/my-project/hero.jpg
```

### Step 2: Edit portfolioData.ts
```typescript
// Add to interiorsProjects array:
{
  id: 10, // Next available number
  title: 'My Amazing Project',
  category: 'Living Rooms',
  description: 'Beautiful modern living space',
  image: '/portfolio/interiors/my-project/hero.jpg',
  tags: ['Modern', 'Luxury'],
  location: 'Lagos',
  year: '2024',
  budget: '₦25,000,000',
  duration: '3 months',
  size: '500 sq ft',
  fullDescription: 'Detailed project description...',
  highlights: [
    'Custom furniture',
    'Premium finishes',
    'Smart lighting'
  ],
  gallery: [
    '/portfolio/interiors/my-project/hero.jpg',
    '/portfolio/interiors/my-project/view-1.jpg',
    '/portfolio/interiors/my-project/view-2.jpg'
  ]
}
```

### Step 3: Save & Preview
Save the file and refresh your browser. Done! ✅

## 🎨 Single Image vs Gallery

### Single Image Project
```typescript
gallery: [
  '/portfolio/interiors/project/main.jpg'  // Just one image
]
```
→ Shows project without navigation arrows

### Gallery Project (Multiple Images)
```typescript
gallery: [
  '/portfolio/interiors/project/view-1.jpg',
  '/portfolio/interiors/project/view-2.jpg',
  '/portfolio/interiors/project/view-3.jpg',
  '/portfolio/interiors/project/view-4.jpg'
]
```
→ Shows navigation arrows and image counter (1/4, 2/4, etc.)

## 📋 Available Categories

### HOF Interiors
- `'Living Rooms'`
- `'Bedrooms'`
- `'Kitchens'`
- `'Bathrooms'`
- `'Commercial'`

### HOF Construction
- `'Commercial'`
- `'Residential'`
- `'Renovation'`

## 💰 Budget Examples

```typescript
budget: '₦19,500,000'
budget: '₦28,000,000'
budget: '₦36,800,000'
budget: '₦1,385,600,000' // Construction
```

Budgets are written in naira only, exactly as agreed with the client. Never add a foreign-currency figure.

## 🖼️ Image Requirements

| Property | Recommendation |
|----------|----------------|
| Format | JPG or WebP |
| Dimensions | 1920x1280px (3:2 ratio) |
| File Size | Under 500KB |
| Quality | 80-85% compression |

## 🔍 Where to Edit

**Add/Edit Interiors Projects:**
```typescript
// File: src/data/portfolioData.ts
export const interiorsProjects: InteriorsProject[] = [
  // Add your projects here
];
```

**Add/Edit Construction Projects:**
```typescript
// File: src/data/portfolioData.ts
export const constructionProjects: ConstructionProject[] = [
  // Add your projects here
];
```

## ⚡ Pro Tips

1. **Organize by project:** Create subfolders for each project
   ```
   public/portfolio/interiors/
   ├── serene-living-space/
   │   ├── hero.jpg
   │   ├── detail-1.jpg
   │   └── detail-2.jpg
   ```

2. **Use descriptive names:** `modern-kitchen-island.jpg` not `IMG_1234.jpg`

3. **Compress images:** Use [TinyPNG](https://tinypng.com/) before uploading

4. **Test locally:** Images should show in dev server immediately

5. **Gallery order matters:** First image in gallery is the hero image

## 🐛 Troubleshooting

**Image not showing?**
- ✅ Check path starts with `/portfolio/` not `portfolio/`
- ✅ Verify image exists in `public/portfolio/` folder
- ✅ Check filename spelling matches exactly (case-sensitive)
- ✅ Clear browser cache and refresh

**Project not appearing?**
- ✅ Check you saved `portfolioData.ts`
- ✅ Verify category matches exactly (case-sensitive)
- ✅ Ensure proper TypeScript syntax (commas, brackets)
- ✅ Check browser console for errors (F12)

**Gallery navigation not showing?**
- ✅ Needs 2+ images in gallery array
- ✅ Single image projects automatically hide arrows

## 📚 Full Documentation

For complete details, see: `public/portfolio/README.md`
