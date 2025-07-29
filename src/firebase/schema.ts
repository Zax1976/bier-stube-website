// Firestore Database Schema Design
// This file documents the collection structure and relationships

/**
 * FIRESTORE COLLECTIONS SCHEMA
 * 
 * Root Collections:
 * - users/{userId}
 * - products/{productId}
 * - events/{eventId}
 * - orders/{orderId}
 * - carts/{userId}
 * 
 * Subcollections:
 * - users/{userId}/addresses/{addressId}
 * - products/{productId}/reviews/{reviewId}
 * - events/{eventId}/attendees/{userId}
 * - orders/{orderId}/items/{itemId}
 * 
 * Analytics Collections:
 * - analytics/products/views/{viewId}
 * - analytics/events/attendance/{attendanceId}
 * - analytics/orders/daily/{date}
 */

import { 
  UserProfile, 
  Product, 
  Event, 
  Order, 
  Cart,
  ProductView,
  EventAttendance 
} from './types';

// Collection Names Constants
export const COLLECTIONS = {
  USERS: 'users',
  PRODUCTS: 'products',
  EVENTS: 'events',
  ORDERS: 'orders',
  CARTS: 'carts',
  ANALYTICS: 'analytics',
  PRODUCT_VIEWS: 'productViews',
  EVENT_ATTENDANCE: 'eventAttendance'
} as const;

// Subcollection Names Constants
export const SUBCOLLECTIONS = {
  ADDRESSES: 'addresses',
  REVIEWS: 'reviews',
  ATTENDEES: 'attendees',
  ITEMS: 'items'
} as const;

// Index Requirements for Firestore
export const REQUIRED_INDEXES = [
  // Products
  {
    collection: 'products',
    fields: [
      { field: 'category', order: 'ASCENDING' },
      { field: 'isActive', order: 'ASCENDING' },
      { field: 'createdAt', order: 'DESCENDING' }
    ]
  },
  {
    collection: 'products',
    fields: [
      { field: 'isFeatured', order: 'ASCENDING' },
      { field: 'isActive', order: 'ASCENDING' },
      { field: 'price', order: 'ASCENDING' }
    ]
  },
  {
    collection: 'products',
    fields: [
      { field: 'tags', order: 'ASCENDING' },
      { field: 'isActive', order: 'ASCENDING' },
      { field: 'createdAt', order: 'DESCENDING' }
    ]
  },
  
  // Events
  {
    collection: 'events',
    fields: [
      { field: 'category', order: 'ASCENDING' },
      { field: 'isActive', order: 'ASCENDING' },
      { field: 'startDate', order: 'ASCENDING' }
    ]
  },
  {
    collection: 'events',
    fields: [
      { field: 'isFeatured', order: 'ASCENDING' },
      { field: 'isActive', order: 'ASCENDING' },
      { field: 'startDate', order: 'ASCENDING' }
    ]
  },
  
  // Orders
  {
    collection: 'orders',
    fields: [
      { field: 'userId', order: 'ASCENDING' },
      { field: 'createdAt', order: 'DESCENDING' }
    ]
  },
  {
    collection: 'orders',
    fields: [
      { field: 'status', order: 'ASCENDING' },
      { field: 'createdAt', order: 'DESCENDING' }
    ]
  },
  
  // Users
  {
    collection: 'users',
    fields: [
      { field: 'isAdmin', order: 'ASCENDING' },
      { field: 'createdAt', order: 'DESCENDING' }
    ]
  }
];

// Data Validation Rules
export const VALIDATION_RULES = {
  USER: {
    email: {
      required: true,
      format: 'email'
    },
    displayName: {
      maxLength: 100
    },
    phone: {
      format: 'phone',
      optional: true
    }
  },
  
  PRODUCT: {
    name: {
      required: true,
      maxLength: 200
    },
    description: {
      required: true,
      maxLength: 2000
    },
    price: {
      required: true,
      min: 0,
      type: 'number'
    },
    stock: {
      required: true,
      min: 0,
      type: 'integer'
    },
    category: {
      required: true,
      enum: ['apparel', 'drinkware', 'accessories', 'collectibles', 'gift-cards']
    }
  },
  
  EVENT: {
    title: {
      required: true,
      maxLength: 200
    },
    description: {
      required: true,
      maxLength: 2000
    },
    startDate: {
      required: true,
      type: 'timestamp'
    },
    category: {
      required: true,
      enum: ['live_music', 'holiday', 'special', 'game_day', 'private']
    }
  },
  
  ORDER: {
    userId: {
      required: true,
      type: 'string'
    },
    total: {
      required: true,
      min: 0,
      type: 'number'
    },
    status: {
      required: true,
      enum: ['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled', 'refunded']
    }
  }
};

// Security Rule Helpers
export const SECURITY_RULES_HELPERS = {
  // Check if user is authenticated
  isAuthenticated: 'request.auth != null',
  
  // Check if user owns the document
  isOwner: 'request.auth.uid == resource.data.userId',
  
  // Check if user is admin
  isAdmin: 'request.auth.token.admin == true',
  
  // Check if document is being created (not updated)
  isCreating: 'resource == null',
  
  // Check if document exists
  exists: 'resource != null',
  
  // Validate required fields
  hasRequiredFields: (fields: string[]) => 
    fields.map(field => `'${field}' in request.resource.data`).join(' && '),
  
  // Validate data types
  isValidType: (field: string, type: string) => 
    `request.resource.data.${field} is ${type}`,
  
  // Validate enum values
  isValidEnum: (field: string, values: string[]) => 
    `request.resource.data.${field} in [${values.map(v => `'${v}'`).join(', ')}]`
};

// Collection Size Limits (for query optimization)
export const COLLECTION_LIMITS = {
  PRODUCTS_PER_PAGE: 20,
  EVENTS_PER_PAGE: 10,
  ORDERS_PER_PAGE: 25,
  MAX_CART_ITEMS: 50,
  MAX_PRODUCT_IMAGES: 10,
  MAX_ORDER_ITEMS: 100
};

// Cache TTL Settings (in seconds)
export const CACHE_TTL = {
  PRODUCTS: 300, // 5 minutes
  EVENTS: 600,   // 10 minutes
  USER_PROFILE: 1800, // 30 minutes
  ORDERS: 0,     // No cache for orders
  CART: 0        // No cache for cart
};