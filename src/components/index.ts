// Bier Stube React Components - Main Export File
// All components follow OSU branding (#BB0000 scarlet, #666666 grey) with vintage aesthetic

export { default as Header } from './Header';
export { default as Footer } from './Footer';
export { default as HeroSection } from './HeroSection';
export { default as ProductCard } from './ProductCard';
export { default as EventCard } from './EventCard';
export { default as ContactForm } from './ContactForm';

// Animation system exports
export * from './animations';

// Type exports
export type { 
  NavigationItem,
  ProductItem,
  EventItem,
  ContactFormData,
  FormErrors,
  HeroContent,
  BrandColors,
  AnimationProps 
} from './types';

// Constants for consistent branding
export const BRAND_COLORS = {
  scarlet: '#BB0000',
  grey: '#666666',
  white: '#FFFFFF',
  black: '#000000',
  lightGrey: '#F5F5F5'
} as const;

export const BRAND_FONTS = {
  serif: 'Playfair Display, serif',
  sansSerif: 'Montserrat, sans-serif'
} as const;