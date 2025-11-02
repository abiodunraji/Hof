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
    title: 'Contemporary Lagos Residence',
    category: 'Living Rooms',
    description: 'A stunning contemporary home featuring curated African art, natural stone accents, and sophisticated modern furnishings.',
    image: '/Hof/portfolio/interiors/contemporary-lagos-residence/dining-area.png',
    tags: ['Contemporary', 'Art-Centric', 'Sophisticated', 'Modern'],
    location: 'Victoria Island, Lagos',
    year: '2024',
    budget: '₦42,000,000',
    duration: '5 months',
    size: '1,800 sq ft',
    fullDescription: 'This contemporary Lagos residence seamlessly blends modern luxury with African cultural expression. The design celebrates contemporary African art as a central element, with each space thoughtfully curated to showcase striking artworks against a backdrop of natural materials. Textured stone walls, warm wood paneling, and sculptural furniture create an environment that is both sophisticated and inviting. The integrated wine display adds an element of refined living, while the organic curved furniture pieces soften the contemporary aesthetic. This home demonstrates how modern design can honor cultural identity while embracing global sophistication.',
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
      '/Hof/portfolio/interiors/contemporary-lagos-residence/dining-area.png',
      '/Hof/portfolio/interiors/contemporary-lagos-residence/living-room-view.jpg',
      '/Hof/portfolio/interiors/contemporary-lagos-residence/bedroom-detail.jpg',
      '/Hof/portfolio/interiors/contemporary-lagos-residence/bedroom-mirrors.png',
      '/Hof/portfolio/interiors/contemporary-lagos-residence/lifestyle-shot.jpg'
    ]
  },
  {
    id: 2,
    title: 'Glamorous Gold & Crystal Kitchen',
    category: 'Kitchens',
    description: 'An opulent kitchen featuring cascading crystal chandeliers, gold accents, and luxurious marble surfaces that redefine culinary elegance.',
    image: '/Hof/portfolio/interiors/luxury-gold-kitchen/kitchen-detail-chandelier.jpg',
    tags: ['Luxury', 'Glamorous', 'Gold Accents', 'Crystal Lighting'],
    location: 'Lekki Phase 1, Lagos',
    year: '2024',
    budget: '₦52,000,000',
    duration: '6 months',
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
      '/Hof/portfolio/interiors/luxury-gold-kitchen/kitchen-detail-chandelier.jpg',
      '/Hof/portfolio/interiors/luxury-gold-kitchen/island-seating-view.jpg',
      '/Hof/portfolio/interiors/luxury-gold-kitchen/dining-chandelier-view.jpg',
      '/Hof/portfolio/interiors/luxury-gold-kitchen/kitchen-workspace.jpg',
      '/Hof/portfolio/interiors/luxury-gold-kitchen/kitchen-full-view.jpg'
    ]
  },
  {
    id: 3,
    title: 'Urban Sports & Entertainment Lounge',
    category: 'Commercial',
    description: 'A vibrant sports-themed entertainment space featuring bold street art, dynamic basketball court design, and energetic retail displays.',
    image: '/Hof/portfolio/interiors/urban-sports-lounge/basketball-mural-wall.jpg',
    tags: ['Sports Theme', 'Urban', 'Bold', 'Entertainment'],
    location: '4P Xclusive, Victoria Island',
    year: '2024',
    budget: '₦38,000,000',
    duration: '4 months',
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
      '/Hof/portfolio/interiors/urban-sports-lounge/basketball-mural-wall.jpg',
      '/Hof/portfolio/interiors/urban-sports-lounge/court-view-with-hoop.jpg',
      '/Hof/portfolio/interiors/urban-sports-lounge/brand-wall-portrait.png',
      '/Hof/portfolio/interiors/urban-sports-lounge/retail-display-wall.png'
    ]
  },
  {
    id: 4,
    title: 'Modern Athletic Sanctuary',
    category: 'Bedrooms',
    description: 'A contemporary bedroom retreat blending athletic inspiration with refined elegance through textured walls, golden wood accents, and curated artwork.',
    image: '/Hof/portfolio/interiors/modern-athletic-bedroom/bedroom-media-wall.jpg',
    tags: ['Contemporary', 'Athletic-Inspired', 'Textured', 'Sophisticated'],
    location: 'Ikoyi, Lagos',
    year: '2024',
    budget: '₦35,000,000',
    duration: '4 months',
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
      '/Hof/portfolio/interiors/modern-athletic-bedroom/bedroom-media-wall.jpg',
      '/Hof/portfolio/interiors/modern-athletic-bedroom/bedroom-full-view.jpg',
      '/Hof/portfolio/interiors/modern-athletic-bedroom/mirror-detail-view.jpg'
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
    image: 'https://images.unsplash.com/photo-1652379742283-b1db151d4b70?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21tZXJjaWFsJTIwY29uc3RydWN0aW9uJTIwYnVpbGRpbmd8ZW58MXx8fHwxNzYxNTAyNjYzfDA&ixlib=rb-4.1.0&q=80&w=1080',
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
      'https://images.unsplash.com/photo-1652379742283-b1db151d4b70?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21tZXJjaWFsJTIwY29uc3RydWN0aW9uJTIwYnVpbGRpbmd8ZW58MXx8fHwxNzYxNTAyNjYzfDA&ixlib=rb-4.1.0&q=80&w=1080'
    ]
  },
  {
    id: 2,
    title: 'Hillside Luxury Residence',
    category: 'Residential',
    description: 'Custom-built luxury home with panoramic views, featuring high-end finishes and smart home integration.',
    image: 'https://images.unsplash.com/photo-1580063665421-4c9cbe9ec11b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXNpZGVudGlhbCUyMGNvbnN0cnVjdGlvbiUyMGhvdXNlfGVufDF8fHx8MTc2MTM5NDkyMHww&ixlib=rb-4.1.0&q=80&w=1080',
    tags: ['Luxury', 'Custom Build', 'Smart Home'],
    location: 'Hillside Estate',
    year: '2024',
    budget: '₦1,385,600,000', // ~$3.2M
    duration: '14 months',
    size: '6,500 sq ft',
    fullDescription: 'A bespoke luxury residence that combines architectural excellence with cutting-edge technology, offering unparalleled comfort and sophistication.',
    highlights: [
      'Custom architectural design',
      'Smart home automation',
      'Infinity pool with spa',
      'Wine cellar and home theater'
    ],
    gallery: [
      'https://images.unsplash.com/photo-1580063665421-4c9cbe9ec11b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXNpZGVudGlhbCUyMGNvbnN0cnVjdGlvbiUyMGhvdXNlfGVufDF8fHx8MTc2MTM5NDkyMHww&ixlib=rb-4.1.0&q=80&w=1080'
    ]
  },
  {
    id: 3,
    title: 'Heritage Building Restoration',
    category: 'Renovation',
    description: 'Complete restoration of historic 1920s building, preserving original character while modernizing infrastructure.',
    image: 'https://images.unsplash.com/photo-1760331283499-abccea681c46?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidWlsZGluZyUyMHJlbm92YXRpb24lMjBwcm9qZWN0fGVufDF8fHx8MTc2MTUwMjY2M3ww&ixlib=rb-4.1.0&q=80&w=1080',
    tags: ['Historic', 'Preservation', 'Restoration'],
    location: 'Heritage District',
    year: '2023',
    budget: '₦909,600,000', // ~$2.1M
    duration: '12 months',
    size: '15,000 sq ft',
    fullDescription: 'This sensitive restoration project demonstrates our expertise in preserving historical architecture while integrating modern building systems.',
    highlights: [
      'Historic preservation approved',
      'Original facade restoration',
      'Modern electrical and plumbing',
      'Seismic retrofitting'
    ],
    gallery: [
      'https://images.unsplash.com/photo-1760331283499-abccea681c46?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidWlsZGluZyUyMHJlbm92YXRpb24lMjBwcm9qZWN0fGVufDF8fHx8MTc2MTUwMjY2M3ww&ixlib=rb-4.1.0&q=80&w=1080'
    ]
  },
  {
    id: 4,
    title: 'Lakeside Medical Plaza',
    category: 'Commercial',
    description: 'Multi-specialty medical facility with advanced infrastructure for healthcare services.',
    image: 'https://images.unsplash.com/photo-1694702740570-0a31ee1525c7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBvZmZpY2UlMjBidWlsZGluZ3xlbnwxfHx8fDE3NjE0MjU3MTh8MA&ixlib=rb-4.1.0&q=80&w=1080',
    tags: ['Healthcare', 'Medical', 'Specialized'],
    location: 'Lakeside District',
    year: '2023',
    budget: '₦2,468,800,000', // ~$5.7M
    duration: '16 months',
    size: '42,000 sq ft',
    fullDescription: 'A specialized medical facility designed to meet stringent healthcare standards while providing a welcoming environment for patients and staff.',
    highlights: [
      'Healthcare-grade infrastructure',
      'Advanced HVAC filtration',
      'Backup power systems',
      'ADA compliant throughout'
    ],
    gallery: [
      'https://images.unsplash.com/photo-1694702740570-0a31ee1525c7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBvZmZpY2UlMjBidWlsZGluZ3xlbnwxfHx8fDE3NjE0MjU3MTh8MA&ixlib=rb-4.1.0&q=80&w=1080'
    ]
  },
  {
    id: 5,
    title: 'Sunset Townhome Development',
    category: 'Residential',
    description: 'Modern townhome community featuring sustainable design and community amenities.',
    image: 'https://images.unsplash.com/photo-1580063665421-4c9cbe9ec11b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXNpZGVudGlhbCUyMGNvbnN0cnVjdGlvbiUyMGhvdXNlfGVufDF8fHx8MTc2MTM5NDkyMHww&ixlib=rb-4.1.0&q=80&w=1080',
    tags: ['Community', 'Sustainable', 'Modern Living'],
    location: 'Sunset Valley',
    year: '2023',
    budget: '₦2,944,000,000', // ~$6.8M
    duration: '20 months',
    size: '24 units',
    fullDescription: 'A thoughtfully planned townhome community that combines modern living with sustainable practices and community-focused amenities.',
    highlights: [
      '24 luxury townhomes',
      'Community clubhouse',
      'Green building practices',
      'Electric vehicle charging stations'
    ],
    gallery: [
      'https://images.unsplash.com/photo-1580063665421-4c9cbe9ec11b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXNpZGVudGlhbCUyMGNvbnN0cnVjdGlvbiUyMGhvdXNlfGVufDF8fHx8MTc2MTM5NDkyMHww&ixlib=rb-4.1.0&q=80&w=1080'
    ]
  },
  {
    id: 6,
    title: 'Industrial Warehouse Complex',
    category: 'Commercial',
    description: 'Large-scale warehouse facility with advanced logistics infrastructure and office space.',
    image: 'https://images.unsplash.com/photo-1652379742283-b1db151d4b70?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21tZXJjaWFsJTIwY29uc3RydWN0aW9uJTIwYnVpbGRpbmd8ZW58MXx8fHwxNzYxNTAyNjYzfDA&ixlib=rb-4.1.0&q=80&w=1080',
    tags: ['Industrial', 'Logistics', 'Warehouse'],
    location: 'Industrial Park',
    year: '2022',
    budget: '₦1,862,400,000', // ~$4.3M
    duration: '10 months',
    size: '95,000 sq ft',
    fullDescription: 'A modern warehouse complex designed for efficiency and scalability, meeting the demands of contemporary logistics operations.',
    highlights: [
      'Clear-span warehouse design',
      'Multiple loading docks',
      'Office and break room facilities',
      'Advanced security systems'
    ],
    gallery: [
      'https://images.unsplash.com/photo-1652379742283-b1db151d4b70?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21tZXJjaWFsJTIwY29uc3RydWN0aW9uJTIwYnVpbGRpbmd8ZW58MXx8fHwxNzYxNTAyNjYzfDA&ixlib=rb-4.1.0&q=80&w=1080'
    ]
  }
];
