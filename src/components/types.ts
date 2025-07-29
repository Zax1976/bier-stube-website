// TypeScript interfaces for Bier Stube components

export interface NavigationItem {
  name: string;
  href: string;
  icon?: string;
}

export interface ProductItem {
  id: string;
  category: string;
  name: string;
  description: string;
  price: number;
  stock?: number;
  available: boolean;
  sizes?: string[];
  image?: string;
}

export interface EventItem {
  id: string;
  name: string;
  date: string;
  time: string;
  category: 'live_music' | 'holiday' | 'special' | 'game_day';
  description: string;
  image?: string;
  ticketPrice?: number;
  location?: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  eventInquiry?: boolean;
}

export interface FormErrors {
  [key: string]: string;
}

export interface HeroContent {
  title: string;
  subtitle: string;
  ctaText: string;
  ctaLink: string;
  backgroundImage?: string;
}

export interface BrandColors {
  scarlet: string;
  grey: string;
  white: string;
  black: string;
  lightGrey: string;
}

export interface AnimationProps {
  initial?: object;
  animate?: object;
  transition?: object;
  whileHover?: object;
  whileInView?: object;
}