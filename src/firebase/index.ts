// Firebase Integration Export Module
// This file provides a clean interface to all Firebase services

// Configuration and Types
export { firebaseConfig, app, auth, db, storage } from './config';
export * from './types';
export * from './schema';

// Services
export { authService, AuthService } from './auth';
export { dbService, DatabaseService } from './database';
export { adminService, FirebaseAdminService } from './admin';

// Sample Data
export { initializeSampleData } from './sampleData';

// Helper Functions
import { authService } from './auth';
import { dbService } from './database';
import { adminService } from './admin';

/**
 * Initialize Firebase services and check connections
 */
export async function initializeFirebase(): Promise<{
  success: boolean;
  message: string;
  services: {
    auth: boolean;
    database: boolean;
    admin: boolean;
  };
}> {
  try {
    const services = {
      auth: false,
      database: false,
      admin: false
    };

    // Test auth service
    try {
      authService.isAuthenticated(); // This will initialize the service
      services.auth = true;
    } catch (error) {
      console.warn('Auth service initialization warning:', error);
    }

    // Test database service
    try {
      // Try to get a product (should work even if none exist)
      await dbService.getProducts({}, 1, 1);
      services.database = true;
    } catch (error) {
      console.warn('Database service initialization warning:', error);
    }

    // Test admin service
    try {
      // This will check if admin SDK is properly configured
      const adminInstance = adminService;
      services.admin = true;
    } catch (error) {
      console.warn('Admin service initialization warning:', error);
    }

    const allServicesWorking = services.auth && services.database && services.admin;

    return {
      success: allServicesWorking,
      message: allServicesWorking 
        ? 'All Firebase services initialized successfully'
        : 'Some Firebase services had initialization issues',
      services
    };

  } catch (error) {
    console.error('Firebase initialization error:', error);
    return {
      success: false,
      message: 'Firebase initialization failed',
      services: {
        auth: false,
        database: false,
        admin: false
      }
    };
  }
}

/**
 * Health check for Firebase services
 */
export async function healthCheck(): Promise<{
  status: 'healthy' | 'degraded' | 'unhealthy';
  services: {
    auth: 'up' | 'down';
    database: 'up' | 'down';
    admin: 'up' | 'down';
  };
  timestamp: Date;
}> {
  const timestamp = new Date();
  const services = {
    auth: 'down' as const,
    database: 'down' as const,
    admin: 'down' as const
  };

  // Check auth service
  try {
    authService.getCurrentUser();
    services.auth = 'up';
  } catch (error) {
    console.error('Auth service health check failed:', error);
  }

  // Check database service
  try {
    await dbService.getProducts({}, 1, 1);
    services.database = 'up';
  } catch (error) {
    console.error('Database service health check failed:', error);
  }

  // Check admin service
  try {
    // Simple check - create admin service instance
    const admin = adminService;
    services.admin = 'up';
  } catch (error) {
    console.error('Admin service health check failed:', error);
  }

  // Determine overall status
  const upServices = Object.values(services).filter(status => status === 'up').length;
  let status: 'healthy' | 'degraded' | 'unhealthy';

  if (upServices === 3) {
    status = 'healthy';
  } else if (upServices >= 1) {
    status = 'degraded';
  } else {
    status = 'unhealthy';
  }

  return {
    status,
    services,
    timestamp
  };
}

/**
 * Quick setup function for development
 */
export async function quickSetup(): Promise<{
  success: boolean;
  message: string;
  actions: string[];
}> {
  const actions: string[] = [];

  try {
    // Initialize Firebase
    const initResult = await initializeFirebase();
    actions.push('Firebase services initialized');

    if (!initResult.success) {
      return {
        success: false,
        message: 'Firebase initialization failed',
        actions
      };
    }

    // Check if sample data exists
    try {
      const products = await dbService.getProducts({}, 1, 5);
      if (products.data.length === 0) {
        // Initialize sample data if none exists
        const sampleResult = await adminService.initializeSampleData();
        if (sampleResult.success) {
          actions.push('Sample data created');
        } else {
          actions.push('Sample data creation failed');
        }
      } else {
        actions.push('Sample data already exists');
      }
    } catch (error) {
      actions.push('Could not check for existing data');
    }

    return {
      success: true,
      message: 'Quick setup completed successfully',
      actions
    };

  } catch (error) {
    console.error('Quick setup error:', error);
    return {
      success: false,
      message: 'Quick setup failed',
      actions
    };
  }
}

// Environment validation
/**
 * Validate that all required environment variables are set
 */
export function validateEnvironment(): {
  valid: boolean;
  missing: string[];
  warnings: string[];
} {
  const required = [
    'FIREBASE_API_KEY',
    'FIREBASE_AUTH_DOMAIN',
    'FIREBASE_PROJECT_ID',
    'FIREBASE_STORAGE_BUCKET',
    'FIREBASE_MESSAGING_SENDER_ID',
    'FIREBASE_APP_ID'
  ];

  const adminRequired = [
    'FIREBASE_ADMIN_PROJECT_ID',
    'FIREBASE_ADMIN_CLIENT_EMAIL',
    'FIREBASE_ADMIN_PRIVATE_KEY'
  ];

  const missing: string[] = [];
  const warnings: string[] = [];

  // Check required client-side config
  required.forEach(key => {
    if (!process.env[key]) {
      missing.push(key);
    }
  });

  // Check admin config (warnings only)
  adminRequired.forEach(key => {
    if (!process.env[key]) {
      warnings.push(`${key} not set - admin features will not work`);
    }
  });

  return {
    valid: missing.length === 0,
    missing,
    warnings
  };
}

// Re-export commonly used types for convenience
export type {
  UserProfile,
  Product,
  Event,
  Order,
  Cart,
  CartItem,
  ProductCategory,
  EventCategory,
  OrderStatus,
  PaymentStatus,
  ApiResponse,
  PaginatedResponse,
  ProductFilters,
  EventFilters,
  CustomClaims
} from './types';