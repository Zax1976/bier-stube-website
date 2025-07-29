// Bier Stube Website Pages - Main Export File
// Complete page components ready for production use with Firebase integration

export { default as Homepage } from './Homepage';
export { default as OurStory } from './OurStory';
export { default as MerchStore } from './MerchStore';
export { default as Events } from './Events';
export { default as Contact } from './Contact';

// Page route configuration for React Router or Next.js
export const ROUTES = {
  HOME: '/',
  STORY: '/story',
  MERCH: '/merch',
  EVENTS: '/events',
  CONTACT: '/contact'
} as const;

// Page metadata for SEO and social sharing
export const PAGE_METADATA = {
  HOME: {
    title: 'Bier Stube Columbus - Authentic German Beer Hall',
    description: 'Welcome back to Columbus\'s authentic German beer hall. Experience traditional German cuisine, craft beers, and OSU game day celebrations at our new King Avenue location.',
    keywords: ['German beer hall', 'Columbus restaurant', 'OSU game day', 'craft beer', 'German food', 'King Avenue']
  },
  STORY: {
    title: 'Our Story - Bier Stube Columbus',
    description: 'Discover the rich history of Bier Stube, Columbus\'s beloved German beer hall since 1965. From humble beginnings to our exciting new chapter on King Avenue.',
    keywords: ['Bier Stube history', 'German heritage', 'Columbus tradition', 'family restaurant', 'Ohio State']
  },
  MERCH: {
    title: 'Merchandise Store - Bier Stube Columbus',
    description: 'Show your Buckeye pride with authentic Bier Stube merchandise. From vintage-inspired apparel to collectible drinkware and OSU gear.',
    keywords: ['Bier Stube merchandise', 'OSU apparel', 'German beer hall gifts', 'Columbus souvenirs', 'Buckeye gear']
  },
  EVENTS: {
    title: 'Events & Game Day - Bier Stube Columbus',
    description: 'Join us for live music, OSU game day celebrations, and special events. Experience the authentic German beer hall atmosphere with fellow Buckeyes.',
    keywords: ['OSU game day', 'live music', 'German events', 'Columbus entertainment', 'beer hall events']
  },
  CONTACT: {
    title: 'Visit Us - Bier Stube Columbus',
    description: 'Find us at our new King Avenue location. Hours, directions, and contact information for Columbus\'s authentic German beer hall.',
    keywords: ['Bier Stube location', 'King Avenue Columbus', 'German restaurant hours', 'contact information', 'directions']
  }
} as const;

// Navigation structure for consistent header/footer links
export const NAVIGATION = [
  {
    name: 'Home',
    href: ROUTES.HOME,
    description: 'Welcome to Bier Stube'
  },
  {
    name: 'Our Story',
    href: ROUTES.STORY,
    description: 'Our heritage and history'
  },
  {
    name: 'Merch Store',
    href: ROUTES.MERCH,
    description: 'Authentic Bier Stube merchandise'
  },
  {
    name: 'Events',
    href: ROUTES.EVENTS,
    description: 'Game day and special events'
  },
  {
    name: 'Contact',
    href: ROUTES.CONTACT,
    description: 'Visit us and get in touch'
  }
] as const;