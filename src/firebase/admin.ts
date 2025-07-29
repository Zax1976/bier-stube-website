// Firebase Admin SDK Service for Server-Side Operations
import { initializeApp, getApps, cert, ServiceAccount } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';
import { getStorage } from 'firebase-admin/storage';
import { 
  UserProfile, 
  Product, 
  Event, 
  Order, 
  CustomClaims,
  ApiResponse 
} from './types';
import { COLLECTIONS } from './schema';
import { sampleProducts, sampleEvents } from './sampleData';

// Firebase Admin Configuration
interface AdminConfig {
  type: string;
  project_id: string;
  private_key_id: string;
  private_key: string;
  client_email: string;
  client_id: string;
  auth_uri: string;
  token_uri: string;
  auth_provider_x509_cert_url: string;
  client_x509_cert_url: string;
}

export class FirebaseAdminService {
  private static instance: FirebaseAdminService;
  private auth: ReturnType<typeof getAuth>;
  private db: ReturnType<typeof getFirestore>;
  private storage: ReturnType<typeof getStorage>;

  private constructor() {
    // Initialize Firebase Admin if not already initialized
    if (getApps().length === 0) {
      const serviceAccount: ServiceAccount = {
        projectId: process.env.FIREBASE_ADMIN_PROJECT_ID || '',
        clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL || '',
        privateKey: process.env.FIREBASE_ADMIN_PRIVATE_KEY?.replace(/\\n/g, '\n') || ''
      };

      initializeApp({
        credential: cert(serviceAccount),
        storageBucket: process.env.FIREBASE_STORAGE_BUCKET || 'bier-stube-website.appspot.com'
      });
    }

    this.auth = getAuth();
    this.db = getFirestore();
    this.storage = getStorage();
  }

  // Singleton pattern
  public static getInstance(): FirebaseAdminService {
    if (!FirebaseAdminService.instance) {
      FirebaseAdminService.instance = new FirebaseAdminService();
    }
    return FirebaseAdminService.instance;
  }

  // USER MANAGEMENT OPERATIONS

  // Set custom claims for a user (admin privileges)
  public async setCustomClaims(uid: string, claims: CustomClaims): Promise<ApiResponse<null>> {
    try {
      await this.auth.setCustomUserClaims(uid, claims);
      
      // Update user document in Firestore
      const userRef = this.db.collection(COLLECTIONS.USERS).doc(uid);
      await userRef.update({
        isAdmin: claims.admin || false,
        updatedAt: new Date()
      });

      return {
        success: true,
        message: `Custom claims set for user ${uid}`
      };

    } catch (error) {
      console.error('Error setting custom claims:', error);
      return {
        success: false,
        error: 'Failed to set custom claims'
      };
    }
  }

  // Create admin user
  public async createAdminUser(
    email: string, 
    password: string, 
    userData: Partial<UserProfile>
  ): Promise<ApiResponse<{ uid: string; user: UserProfile }>> {
    try {
      // Create user with Firebase Auth
      const userRecord = await this.auth.createUser({
        email,
        password,
        displayName: userData.displayName || '',
        emailVerified: true // Admin users are pre-verified
      });

      // Set admin custom claims
      await this.auth.setCustomUserClaims(userRecord.uid, { admin: true });

      // Create user profile in Firestore
      const userProfile: Omit<UserProfile, 'id'> = {
        uid: userRecord.uid,
        email: userRecord.email!,
        displayName: userData.displayName || '',
        photoURL: userData.photoURL || null,
        isAdmin: true,
        firstName: userData.firstName || '',
        lastName: userData.lastName || '',
        phone: userData.phone || '',
        addresses: [],
        preferences: {
          emailNotifications: true,
          smsNotifications: false,
          marketingEmails: false
        },
        createdAt: new Date() as any,
        updatedAt: new Date() as any
      };

      await this.db.collection(COLLECTIONS.USERS).doc(userRecord.uid).set(userProfile);

      const result = {
        uid: userRecord.uid,
        user: { id: userRecord.uid, ...userProfile } as UserProfile
      };

      return {
        success: true,
        data: result,
        message: 'Admin user created successfully'
      };

    } catch (error) {
      console.error('Error creating admin user:', error);
      return {
        success: false,
        error: 'Failed to create admin user'
      };
    }
  }

  // Delete user (complete removal)
  public async deleteUser(uid: string): Promise<ApiResponse<null>> {
    try {
      // Delete from Firebase Auth
      await this.auth.deleteUser(uid);

      // Delete user document from Firestore
      await this.db.collection(COLLECTIONS.USERS).doc(uid).delete();

      // Delete user's cart if exists
      await this.db.collection(COLLECTIONS.CARTS).doc(uid).delete();

      return {
        success: true,
        message: 'User deleted successfully'
      };

    } catch (error) {
      console.error('Error deleting user:', error);
      return {
        success: false,
        error: 'Failed to delete user'
      };
    }
  }

  // Get all users (admin operation)
  public async getAllUsers(pageToken?: string): Promise<{
    users: UserProfile[];
    nextPageToken?: string;
  }> {
    try {
      const listUsersResult = await this.auth.listUsers(1000, pageToken);
      const userProfiles: UserProfile[] = [];

      // Get user profiles from Firestore
      for (const userRecord of listUsersResult.users) {
        try {
          const userDoc = await this.db.collection(COLLECTIONS.USERS).doc(userRecord.uid).get();
          if (userDoc.exists) {
            userProfiles.push({
              id: userDoc.id,
              ...userDoc.data()
            } as UserProfile);
          }
        } catch (docError) {
          console.warn(`Could not fetch profile for user ${userRecord.uid}:`, docError);
        }
      }

      return {
        users: userProfiles,
        nextPageToken: listUsersResult.pageToken
      };

    } catch (error) {
      console.error('Error getting all users:', error);
      throw new Error('Failed to fetch users');
    }
  }

  // BULK OPERATIONS

  // Initialize sample data (one-time setup)
  public async initializeSampleData(): Promise<ApiResponse<{
    productsCreated: number;
    eventsCreated: number;
  }>> {
    try {
      let productsCreated = 0;
      let eventsCreated = 0;

      // Create sample products
      const batch = this.db.batch();

      for (const productData of sampleProducts) {
        const productRef = this.db.collection(COLLECTIONS.PRODUCTS).doc();
        const product = {
          ...productData,
          createdAt: new Date(),
          updatedAt: new Date()
        };
        batch.set(productRef, product);
        productsCreated++;
      }

      // Create sample events
      for (const eventData of sampleEvents) {
        const eventRef = this.db.collection(COLLECTIONS.EVENTS).doc();
        const event = {
          ...eventData,
          createdAt: new Date(),
          updatedAt: new Date()
        };
        batch.set(eventRef, event);
        eventsCreated++;
      }

      // Commit batch
      await batch.commit();

      return {
        success: true,
        data: {
          productsCreated,
          eventsCreated
        },
        message: 'Sample data initialized successfully'
      };

    } catch (error) {
      console.error('Error initializing sample data:', error);
      return {
        success: false,
        error: 'Failed to initialize sample data'
      };
    }
  }

  // Update product stock (inventory management)
  public async updateProductStock(
    productId: string, 
    newStock: number
  ): Promise<ApiResponse<Product>> {
    try {
      const productRef = this.db.collection(COLLECTIONS.PRODUCTS).doc(productId);
      await productRef.update({
        stock: newStock,
        updatedAt: new Date()
      });

      const updatedDoc = await productRef.get();
      const updatedProduct = {
        id: updatedDoc.id,
        ...updatedDoc.data()
      } as Product;

      return {
        success: true,
        data: updatedProduct,
        message: 'Product stock updated successfully'
      };

    } catch (error) {
      console.error('Error updating product stock:', error);
      return {
        success: false,
        error: 'Failed to update product stock'
      };
    }
  }

  // Bulk update product prices
  public async bulkUpdatePrices(
    updates: { productId: string; newPrice: number }[]
  ): Promise<ApiResponse<{ updated: number; failed: number }>> {
    try {
      const batch = this.db.batch();
      let updated = 0;
      let failed = 0;

      for (const update of updates) {
        try {
          const productRef = this.db.collection(COLLECTIONS.PRODUCTS).doc(update.productId);
          batch.update(productRef, {
            price: update.newPrice,
            updatedAt: new Date()
          });
          updated++;
        } catch (error) {
          console.error(`Failed to update product ${update.productId}:`, error);
          failed++;
        }
      }

      await batch.commit();

      return {
        success: true,
        data: { updated, failed },
        message: `Bulk price update completed: ${updated} updated, ${failed} failed`
      };

    } catch (error) {
      console.error('Error in bulk price update:', error);
      return {
        success: false,
        error: 'Bulk price update failed'
      };
    }
  }

  // ORDER MANAGEMENT

  // Update order status
  public async updateOrderStatus(
    orderId: string, 
    newStatus: Order['status'],
    trackingNumber?: string
  ): Promise<ApiResponse<Order>> {
    try {
      const updateData: any = {
        status: newStatus,
        updatedAt: new Date()
      };

      if (trackingNumber && newStatus === 'shipped') {
        updateData.trackingNumber = trackingNumber;
      }

      const orderRef = this.db.collection(COLLECTIONS.ORDERS).doc(orderId);
      await orderRef.update(updateData);

      const updatedDoc = await orderRef.get();
      const updatedOrder = {
        id: updatedDoc.id,
        ...updatedDoc.data()
      } as Order;

      return {
        success: true,
        data: updatedOrder,
        message: 'Order status updated successfully'
      };

    } catch (error) {
      console.error('Error updating order status:', error);
      return {
        success: false,
        error: 'Failed to update order status'
      };
    }
  }

  // Get orders by status
  public async getOrdersByStatus(status: Order['status']): Promise<Order[]> {
    try {
      const querySnapshot = await this.db
        .collection(COLLECTIONS.ORDERS)
        .where('status', '==', status)
        .orderBy('createdAt', 'desc')
        .get();

      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as Order));

    } catch (error) {
      console.error('Error getting orders by status:', error);
      throw new Error('Failed to fetch orders');
    }
  }

  // ANALYTICS AND REPORTING

  // Get sales analytics
  public async getSalesAnalytics(
    startDate: Date, 
    endDate: Date
  ): Promise<{
    totalRevenue: number;
    totalOrders: number;
    averageOrderValue: number;
    topProducts: { productId: string; productName: string; quantity: number; revenue: number }[];
  }> {
    try {
      const ordersSnapshot = await this.db
        .collection(COLLECTIONS.ORDERS)
        .where('createdAt', '>=', startDate)
        .where('createdAt', '<=', endDate)
        .where('status', 'in', ['confirmed', 'processing', 'shipped', 'delivered'])
        .get();

      let totalRevenue = 0;
      let totalOrders = 0;
      const productSales: Map<string, { name: string; quantity: number; revenue: number }> = new Map();

      ordersSnapshot.docs.forEach(doc => {
        const order = doc.data() as Order;
        totalRevenue += order.total;
        totalOrders++;

        // Track product sales
        order.items.forEach(item => {
          const existing = productSales.get(item.productId) || { 
            name: item.productName, 
            quantity: 0, 
            revenue: 0 
          };
          existing.quantity += item.quantity;
          existing.revenue += item.totalPrice;
          productSales.set(item.productId, existing);
        });
      });

      // Convert to top products array
      const topProducts = Array.from(productSales.entries())
        .map(([productId, data]) => ({
          productId,
          productName: data.name,
          quantity: data.quantity,
          revenue: data.revenue
        }))
        .sort((a, b) => b.revenue - a.revenue)
        .slice(0, 10);

      return {
        totalRevenue,
        totalOrders,
        averageOrderValue: totalOrders > 0 ? totalRevenue / totalOrders : 0,
        topProducts
      };

    } catch (error) {
      console.error('Error getting sales analytics:', error);
      throw new Error('Failed to generate sales analytics');
    }
  }

  // Get inventory report
  public async getInventoryReport(): Promise<{
    lowStock: Product[];
    outOfStock: Product[];
    totalProducts: number;
    totalValue: number;
  }> {
    try {
      const productsSnapshot = await this.db
        .collection(COLLECTIONS.PRODUCTS)
        .where('isActive', '==', true)
        .get();

      const lowStock: Product[] = [];
      const outOfStock: Product[] = [];
      let totalProducts = 0;
      let totalValue = 0;

      productsSnapshot.docs.forEach(doc => {
        const product = { id: doc.id, ...doc.data() } as Product;
        totalProducts++;
        totalValue += product.stock * product.price;

        if (product.stock === 0) {
          outOfStock.push(product);
        } else if (product.stock <= 10) { // Low stock threshold
          lowStock.push(product);
        }
      });

      return {
        lowStock,
        outOfStock,
        totalProducts,
        totalValue
      };

    } catch (error) {
      console.error('Error getting inventory report:', error);
      throw new Error('Failed to generate inventory report');
    }
  }

  // BACKUP AND MAINTENANCE

  // Backup collection to JSON
  public async backupCollection(collectionName: string): Promise<ApiResponse<any[]>> {
    try {
      const snapshot = await this.db.collection(collectionName).get();
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      return {
        success: true,
        data,
        message: `${collectionName} collection backed up successfully`
      };

    } catch (error) {
      console.error(`Error backing up ${collectionName}:`, error);
      return {
        success: false,
        error: `Failed to backup ${collectionName} collection`
      };
    }
  }

  // Clean up old carts (older than 30 days)
  public async cleanupOldCarts(): Promise<ApiResponse<{ deleted: number }>> {
    try {
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

      const oldCartsSnapshot = await this.db
        .collection(COLLECTIONS.CARTS)
        .where('updatedAt', '<', thirtyDaysAgo)
        .get();

      const batch = this.db.batch();
      let deleted = 0;

      oldCartsSnapshot.docs.forEach(doc => {
        batch.delete(doc.ref);
        deleted++;
      });

      if (deleted > 0) {
        await batch.commit();
      }

      return {
        success: true,
        data: { deleted },
        message: `Cleaned up ${deleted} old carts`
      };

    } catch (error) {
      console.error('Error cleaning up old carts:', error);
      return {
        success: false,
        error: 'Failed to cleanup old carts'
      };
    }
  }

  // Verify token and get user claims
  public async verifyIdToken(idToken: string): Promise<{
    uid: string;
    email?: string;
    claims: CustomClaims;
  }> {
    try {
      const decodedToken = await this.auth.verifyIdToken(idToken);
      return {
        uid: decodedToken.uid,
        email: decodedToken.email,
        claims: {
          admin: decodedToken.admin || false,
          moderator: decodedToken.moderator || false,
          verified: decodedToken.email_verified || false
        }
      };
    } catch (error) {
      console.error('Error verifying ID token:', error);
      throw new Error('Invalid token');
    }
  }
}

// Export singleton instance
export const adminService = FirebaseAdminService.getInstance();