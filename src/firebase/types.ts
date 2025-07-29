// TypeScript Interfaces for Firestore Collections

import { Timestamp } from 'firebase/firestore';

// Base interface for all documents
export interface BaseDocument {
  id: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

// User Profile Interface
export interface UserProfile extends BaseDocument {
  uid: string;
  email: string;
  displayName?: string;
  photoURL?: string;
  isAdmin: boolean;
  firstName?: string;
  lastName?: string;
  phone?: string;
  addresses?: UserAddress[];
  preferences?: UserPreferences;
}

export interface UserAddress {
  id: string;
  type: 'shipping' | 'billing';
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  isDefault: boolean;
}

export interface UserPreferences {
  emailNotifications: boolean;
  smsNotifications: boolean;
  marketingEmails: boolean;
}

// Product Interface
export interface Product extends BaseDocument {
  name: string;
  description: string;
  category: ProductCategory;
  price: number;
  compareAtPrice?: number; // For sale pricing
  images: ProductImage[];
  variants?: ProductVariant[];
  stock: number;
  sku: string;
  isActive: boolean;
  isFeatured: boolean;
  tags: string[];
  seoTitle?: string;
  seoDescription?: string;
  weight?: number; // for shipping calculations
}

export type ProductCategory = 'apparel' | 'drinkware' | 'accessories' | 'collectibles' | 'gift-cards';

export interface ProductImage {
  id: string;
  url: string;
  alt: string;
  order: number;
  isMain: boolean;
}

export interface ProductVariant {
  id: string;
  name: string; // e.g., "Size", "Color"
  value: string; // e.g., "Large", "Red"
  price?: number; // Override base price if different
  stock: number;
  sku: string;
}

// Event Interface
export interface Event extends BaseDocument {
  title: string;
  description: string;
  category: EventCategory;
  startDate: Timestamp;
  endDate?: Timestamp;
  startTime: string; // "7:00 PM"
  endTime?: string; // "10:00 PM"
  location: EventLocation;
  images: string[];
  isRecurring: boolean;
  recurringPattern?: RecurringPattern;
  capacity?: number;
  currentAttendees: number;
  ticketPrice?: number;
  isActive: boolean;
  isFeatured: boolean;
  tags: string[];
  specialOffers?: EventSpecialOffer[];
}

export type EventCategory = 'live_music' | 'holiday' | 'special' | 'game_day' | 'private';

export interface EventLocation {
  name: string;
  address?: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

export interface RecurringPattern {
  frequency: 'daily' | 'weekly' | 'monthly';
  interval: number; // every X days/weeks/months
  daysOfWeek?: number[]; // 0 = Sunday, 1 = Monday, etc.
  endDate?: Timestamp;
}

export interface EventSpecialOffer {
  id: string;
  title: string;
  description: string;
  discountType: 'percentage' | 'fixed' | 'bogo';
  discountValue: number;
  applicableProducts?: string[]; // product IDs
}

// Order Interface
export interface Order extends BaseDocument {
  orderNumber: string;
  userId: string;
  customerInfo: CustomerInfo;
  items: OrderItem[];
  subtotal: number;
  tax: number;
  shipping: number;
  discount: number;
  total: number;
  currency: string;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  paymentMethod: PaymentMethod;
  shippingAddress: UserAddress;
  billingAddress: UserAddress;
  shippingMethod: ShippingMethod;
  trackingNumber?: string;
  notes?: string;
  refunds?: OrderRefund[];
}

export interface CustomerInfo {
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
}

export interface OrderItem {
  productId: string;
  productName: string;
  productImage: string;
  variantId?: string;
  variantName?: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  sku: string;
}

export type OrderStatus = 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'refunded';
export type PaymentStatus = 'pending' | 'paid' | 'failed' | 'refunded' | 'partially_refunded';

export interface PaymentMethod {
  type: 'card' | 'paypal' | 'apple_pay' | 'google_pay' | 'bank_transfer';
  last4?: string; // last 4 digits for cards
  brand?: string; // visa, mastercard, etc.
}

export interface ShippingMethod {
  id: string;
  name: string;
  description: string;
  price: number;
  estimatedDays: number;
}

export interface OrderRefund {
  id: string;
  amount: number;
  reason: string;
  status: 'pending' | 'completed' | 'failed';
  processedAt?: Timestamp;
  refundId?: string; // payment processor refund ID
}

// Cart Interface (for temporary storage)
export interface CartItem {
  productId: string;
  variantId?: string;
  quantity: number;
  selectedAt: Timestamp;
}

export interface Cart {
  userId: string;
  items: CartItem[];
  updatedAt: Timestamp;
}

// Analytics and Tracking Interfaces
export interface ProductView {
  productId: string;
  userId?: string;
  sessionId: string;
  timestamp: Timestamp;
  referrer?: string;
}

export interface EventAttendance {
  eventId: string;
  userId: string;
  status: 'interested' | 'attending' | 'attended' | 'cancelled';
  registeredAt: Timestamp;
  updatedAt: Timestamp;
}

// Firebase Admin Custom Claims Interface
export interface CustomClaims {
  admin?: boolean;
  moderator?: boolean;
  verified?: boolean;
}

// Search and Filter Types
export interface ProductFilters {
  category?: ProductCategory;
  minPrice?: number;
  maxPrice?: number;
  inStock?: boolean;
  tags?: string[];
  featured?: boolean;
}

export interface EventFilters {
  category?: EventCategory;
  startDate?: Date;
  endDate?: Date;
  featured?: boolean;
  hasTickets?: boolean;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}