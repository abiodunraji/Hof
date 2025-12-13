/**
 * Portfolio Data for HOF Interiors and HOF Construction
 * 
 * This file contains all portfolio project data for both brands.
 * Projects can have either a single image or a gallery of images.
 * 
 * To add your own images:
 * 1. Place images in public/portfolio/interiors/ or public/portfolio/construction/
 * 2. Update the image paths to use /portfolio/interiors/your-image.jpg
 * 3. For galleries, add multiple image paths in the gallery array
 */

// ==================== Type Definitions ====================

export interface BaseProject {
  id: number;
  title: string;
  category: string;
  description: string;
  tags: string[];
  location: string;
  year: string;
  budget: string;
  duration: string;
  size: string;
  fullDescription?: string;
  highlights: string[];
  
  // Image handling - either single image OR gallery (gallery takes precedence if present)
  image: string; // Main/hero image (required)
  gallery?: string[]; // Optional array of images for gallery view
}

export interface InteriorsProject extends BaseProject {
  category: 'Living Rooms' | 'Bedrooms' | 'Kitchens' | 'Bathrooms' | 'Commercial' | string;
}

export interface ConstructionProject extends BaseProject {
  category: 'Commercial' | 'Residential' | 'Renovation' | string;
}

// ==================== HOF INTERIORS PORTFOLIO ====================

export const interiorsCategories = ['All', 'Living Rooms', 'Bedrooms', 'Kitchens', 'Bathrooms', 'Commercial'];

export const interiorsProjects: InteriorsProject[] = [
  {
    id: 1,
    title: 'Contemporary Residence',
    category: 'Living Rooms',
    description: 'A stunning contemporary home featuring curated African art, natural stone accents, and sophisticated modern furnishings.',
    image: '/portfolio/interiors/contemporary-lagos-residence/dining-area.png',
    tags: ['Contemporary', 'Art-Centric', 'Sophisticated', 'Modern'],
    location: '',
    year: '2024',
    budget: '',
    duration: '8 weeks',
    size: '1,800 sq ft',
    fullDescription: 'This contemporary residence seamlessly blends modern luxury with African cultural expression. The design celebrates contemporary African art as a central element, with each space thoughtfully curated to showcase striking artworks against a backdrop of natural materials. Textured stone walls, warm wood paneling, and sculptural furniture create an environment that is both sophisticated and inviting. The integrated wine display adds an element of refined living, while the organic curved furniture pieces soften the contemporary aesthetic. This home demonstrates how modern design can honor cultural identity while embracing global sophistication.',
    highlights: [
      'Curated collection of contemporary African art',
      'Natural stone feature walls with integrated lighting',
      'Custom sculptural pendant lighting',
      'Integrated wine storage and display system',
      'Organic curved furniture in premium fabrics',
      'Warm wood paneling with marble accents',
      'Layered ambient and accent lighting design',
      'Statement marble dining table with designer chairs'
    ],
    gallery: [
      '/portfolio/interiors/contemporary-lagos-residence/dining-area.png',
      '/portfolio/interiors/contemporary-lagos-residence/living-room-view.jpg',
      '/portfolio/interiors/contemporary-lagos-residence/bedroom-detail.jpg',
      '/portfolio/interiors/contemporary-lagos-residence/bedroom-mirrors.png',
      '/portfolio/interiors/contemporary-lagos-residence/lifestyle-shot.jpg'
    ]
  },
  {
    id: 2,
    title: 'Glamorous Gold & Crystal Kitchen',
    category: 'Kitchens',
    description: 'An opulent kitchen featuring cascading crystal chandeliers, gold accents, and luxurious marble surfaces that redefine culinary elegance.',
    image: '/portfolio/interiors/luxury-gold-kitchen/kitchen-detail-chandelier.jpg',
    tags: ['Luxury', 'Glamorous', 'Gold Accents', 'Crystal Lighting'],
    location: '',
    year: '2024',
    budget: '',
    duration: '8 weeks',
    size: '650 sq ft',
    fullDescription: 'This glamorous kitchen is a masterpiece of luxury design, where functionality meets high-fashion aesthetics. The space is anchored by a stunning crystal chandelier that cascades over a sculptural marble island, creating a focal point that transforms cooking into a theatrical experience. Textured taupe cabinetry with fluted detailing is elevated by brushed gold accents throughout, from the delicate upper cabinet framing to the island trim. The marble backsplash and countertops in soft beige tones with natural veining provide an elegant canvas, while integrated lighting in glass-front upper cabinets showcases curated dishware like art pieces. White bar stools with gold legs complement the color palette, and the carefully planned layout ensures both beauty and practicality for modern culinary needs.',
    highlights: [
      'Statement crystal chandelier with cascading glass drops',
      'Brushed gold accent trim on island and upper cabinets',
      'Floor-to-ceiling fluted textured cabinetry',
      'Luxurious marble countertops and full-height backsplash',
      'Integrated LED lighting in glass-front display cabinets',
      'Designer white and gold bar seating',
      'Premium built-in appliances with seamless integration',
      'Curated display areas for elegant dinnerware',
      'Sophisticated neutral color palette with metallic accents'
    ],
    gallery: [
      '/portfolio/interiors/luxury-gold-kitchen/kitchen-detail-chandelier.jpg',
      '/portfolio/interiors/luxury-gold-kitchen/island-seating-view.jpg',
      '/portfolio/interiors/luxury-gold-kitchen/dining-chandelier-view.jpg',
      '/portfolio/interiors/luxury-gold-kitchen/kitchen-workspace.jpg',
      '/portfolio/interiors/luxury-gold-kitchen/kitchen-full-view.jpg'
    ]
  },
  {
    id: 3,
    title: 'Urban Sports & Entertainment Lounge',
    category: 'Commercial',
    description: 'A vibrant sports-themed entertainment space featuring bold street art, dynamic basketball court design, and energetic retail displays.',
    image: '/portfolio/interiors/urban-sports-lounge/basketball-mural-wall.jpg',
    tags: ['Sports Theme', 'Urban', 'Bold', 'Entertainment'],
    location: '',
    year: '2024',
    budget: '',
    duration: '6 weeks',
    size: '1,200 sq ft',
    fullDescription: 'This urban sports and entertainment lounge transforms a commercial space into an immersive basketball-inspired experience. The design celebrates youth culture and athletic energy through striking street art murals depicting basketball legends in action. A bold red textured feature wall creates dramatic impact, while playful multi-colored carpet tiles in geometric patterns energize the floor plane. The space seamlessly integrates functional elements like basketball hoops and retail display systems with artistic expression. Linear LED ceiling details and track lighting provide dynamic illumination, while black metal framing elements add industrial edge. Custom signage and branding throughout reinforce the urban sports aesthetic, creating an engaging environment perfect for retail, entertainment, and social interaction.',
    highlights: [
      'Large-scale custom basketball mural artwork',
      'Bold textured red feature wall with dimensional finish',
      'Vibrant geometric carpet tile pattern',
      'Functional basketball court integration with regulation hoop',
      'Industrial black metal grid partitions',
      'Dynamic linear LED ceiling lighting design',
      'Custom branded signage and wayfinding elements',
      'Pegboard retail display system for merchandise',
      'Track lighting for flexible accent illumination',
      'Urban street art aesthetic throughout'
    ],
    gallery: [
      '/portfolio/interiors/urban-sports-lounge/basketball-mural-wall.jpg',
      '/portfolio/interiors/urban-sports-lounge/court-view-with-hoop.jpg',
      '/portfolio/interiors/urban-sports-lounge/brand-wall-portrait.png',
      '/portfolio/interiors/urban-sports-lounge/retail-display-wall.png'
    ]
  },
  {
    id: 4,
    title: 'Modern Athletic Sanctuary',
    category: 'Bedrooms',
    description: 'A contemporary bedroom retreat blending athletic inspiration with refined elegance through textured walls, golden wood accents, and curated artwork.',
    image: '/portfolio/interiors/modern-athletic-bedroom/bedroom-media-wall.jpg',
    tags: ['Contemporary', 'Athletic-Inspired', 'Textured', 'Sophisticated'],
    location: '',
    year: '2024',
    budget: '',
    duration: '6 weeks',
    size: '450 sq ft',
    fullDescription: 'This modern athletic sanctuary transforms a bedroom into a sophisticated retreat that celebrates both rest and inspiration. The design masterfully combines textured cement-finish accent walls with warm golden wood slat panels featuring integrated LED backlighting, creating dramatic depth and ambiance. A curated collection of black-and-white athletic photography and abstract art anchors the space, while geometric grid mirrors add both function and visual interest. The floating media console with distinctive gold chevron pattern provides storage while maintaining the clean, contemporary aesthetic. White and caramel tufted seating offers comfortable lounging areas, complemented by a luxurious gray bedding ensemble. The design palette of white, gray, gold, and natural wood creates a balanced, masculine elegance perfect for the modern professional who values both style and athletic culture.',
    highlights: [
      'Textured cement-finish feature walls',
      'Vertical wood slat wall with integrated LED backlighting',
      'Floating media console with gold chevron pattern detail',
      'Curated black-and-white athletic photography collection',
      'Large-scale geometric grid mirror installation',
      'Custom tufted seating in white and caramel leather',
      'Floating shoe display cabinet with glass doors',
      'Sophisticated gray and white color palette',
      'Contemporary abstract artwork',
      'Ambient lighting design with multiple layers'
    ],
    gallery: [
      '/portfolio/interiors/modern-athletic-bedroom/bedroom-media-wall.jpg',
      '/portfolio/interiors/modern-athletic-bedroom/bedroom-full-view.jpg',
      '/portfolio/interiors/modern-athletic-bedroom/mirror-detail-view.jpg'
    ]
  },
];

// ==================== HOF CONSTRUCTION PORTFOLIO ====================

export const constructionCategories = ['All', 'Commercial', 'Residential', 'Renovation'];

export const constructionProjects: ConstructionProject[] = [
  {
    id: 1,
    title: 'Riverside Corporate Center',
    category: 'Commercial',
    description: 'Modern office complex featuring sustainable design, state-of-the-art facilities, and LEED Gold certification.',
    image: '/portfolio/construction/site-work/site-work-01.jpg',
    tags: ['LEED Certified', 'Sustainable', 'Corporate'],
    location: 'Downtown District',
    year: '2024',
    budget: '₦3,680,000,000', // ~$8.5M
    duration: '18 months',
    size: '75,000 sq ft',
    fullDescription: 'This flagship commercial project showcases our commitment to sustainable construction practices while delivering a modern, efficient workspace for the future.',
    highlights: [
      'LEED Gold Certified',
      'Energy-efficient HVAC system',
      'Rooftop solar installation',
      'Underground parking for 200 vehicles'
    ],
    gallery: [
      '/portfolio/construction/site-work/site-work-01.jpg',
      '/portfolio/construction/site-work/site-work-02.jpg',
      '/portfolio/construction/site-work/site-work-03.jpg',
      '/portfolio/construction/site-work/site-work-04.jpg',
      '/portfolio/construction/site-work/site-work-05.jpg',
      '/portfolio/construction/site-work/site-work-06.jpg',
      '/portfolio/construction/site-work/site-work-07.jpg',
      '/portfolio/construction/site-work/site-work-08.jpg',
      '/portfolio/construction/site-work/site-work-09.jpg',
      '/portfolio/construction/site-work/site-work-10.jpg',
      '/portfolio/construction/site-work/site-work-11.jpg',
      '/portfolio/construction/site-work/site-work-12.jpg',
      '/portfolio/construction/site-work/site-work-13.jpg',
      '/portfolio/construction/site-work/site-work-14.jpg',
      '/portfolio/construction/site-work/site-work-15.jpg',
      '/portfolio/construction/site-work/site-work-16.jpg',
      '/portfolio/construction/site-work/site-work-17.jpg',
      '/portfolio/construction/site-work/site-work-18.jpg'
    ]
  }
];

