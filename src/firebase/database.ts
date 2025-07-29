// Firebase Firestore Database Service
import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  startAfter,
  onSnapshot,
  serverTimestamp,
  Timestamp,
  QueryDocumentSnapshot,
  DocumentData,
  WriteBatch,
  writeBatch
} from 'firebase/firestore';
import { db } from './config';
import {
  Product,
  Event,
  Order,
  UserProfile,
  Cart,
  CartItem,
  ProductFilters,
  EventFilters,
  ApiResponse,
  PaginatedResponse
} from './types';
import { COLLECTIONS, COLLECTION_LIMITS } from './schema';
import { authService } from './auth';

export class DatabaseService {
  private static instance: DatabaseService;

  private constructor() {}

  // Singleton pattern
  public static getInstance(): DatabaseService {
    if (!DatabaseService.instance) {
      DatabaseService.instance = new DatabaseService();
    }
    return DatabaseService.instance;
  }

  // PRODUCT OPERATIONS
  
  // Get all products with filtering and pagination
  public async getProducts(
    filters: ProductFilters = {},
    page: number = 1,
    pageLimit: number = COLLECTION_LIMITS.PRODUCTS_PER_PAGE
  ): Promise<PaginatedResponse<Product>> {
    try {
      let q = query(collection(db, COLLECTIONS.PRODUCTS));

      // Apply filters
      if (filters.category) {
        q = query(q, where('category', '==', filters.category));
      }
      if (filters.inStock !== undefined) {
        q = query(q, where('stock', '>', 0));
      }
      if (filters.featured !== undefined) {
        q = query(q, where('isFeatured', '==', filters.featured));
      }
      if (filters.minPrice !== undefined) {
        q = query(q, where('price', '>=', filters.minPrice));
      }
      if (filters.maxPrice !== undefined) {
        q = query(q, where('price', '<=', filters.maxPrice));
      }

      // Add ordering and active filter
      q = query(q, where('isActive', '==', true), orderBy('createdAt', 'desc'));

      // Apply pagination
      q = query(q, limit(pageLimit));
      if (page > 1) {
        // For simplicity, we'll skip pagination cursor logic here
        // In production, implement proper cursor-based pagination
      }

      const querySnapshot = await getDocs(q);
      const products: Product[] = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as Product));

      return {
        data: products,
        pagination: {
          page,
          limit: pageLimit,
          total: products.length, // In production, get actual count
          hasNext: products.length === pageLimit,
          hasPrev: page > 1
        }
      };

    } catch (error) {
      console.error('Error getting products:', error);
      throw new Error('Failed to fetch products');
    }
  }

  // Get single product by ID
  public async getProduct(id: string): Promise<Product | null> {
    try {
      const docRef = doc(db, COLLECTIONS.PRODUCTS, id);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        return {
          id: docSnap.id,
          ...docSnap.data()
        } as Product;
      }
      
      return null;
    } catch (error) {
      console.error('Error getting product:', error);
      throw new Error('Failed to fetch product');
    }
  }

  // Create new product (admin only)
  public async createProduct(productData: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>): Promise<ApiResponse<Product>> {
    if (!await authService.isAdmin()) {
      return {
        success: false,
        error: 'Unauthorized: Admin access required'
      };
    }

    try {
      const docRef = doc(collection(db, COLLECTIONS.PRODUCTS));
      const product: Omit<Product, 'id'> = {
        ...productData,
        createdAt: serverTimestamp() as Timestamp,
        updatedAt: serverTimestamp() as Timestamp
      };

      await setDoc(docRef, product);

      const createdProduct: Product = {
        id: docRef.id,
        ...product,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now()
      };

      return {
        success: true,
        data: createdProduct,
        message: 'Product created successfully'
      };

    } catch (error) {
      console.error('Error creating product:', error);
      return {
        success: false,
        error: 'Failed to create product'
      };
    }
  }

  // Update product (admin only)
  public async updateProduct(id: string, updates: Partial<Product>): Promise<ApiResponse<Product>> {
    if (!await authService.isAdmin()) {
      return {
        success: false,
        error: 'Unauthorized: Admin access required'
      };
    }

    try {
      const docRef = doc(db, COLLECTIONS.PRODUCTS, id);
      
      // Remove fields that shouldn't be updated directly
      const updateData = { ...updates };
      delete updateData.id;
      delete updateData.createdAt;
      
      // Add updated timestamp
      updateData.updatedAt = serverTimestamp() as Timestamp;

      await updateDoc(docRef, updateData);

      // Get updated product
      const updatedProduct = await this.getProduct(id);
      
      return {
        success: true,
        data: updatedProduct!,
        message: 'Product updated successfully'
      };

    } catch (error) {
      console.error('Error updating product:', error);
      return {
        success: false,
        error: 'Failed to update product'
      };
    }
  }

  // Delete product (admin only)
  public async deleteProduct(id: string): Promise<ApiResponse<null>> {
    if (!await authService.isAdmin()) {
      return {
        success: false,
        error: 'Unauthorized: Admin access required'
      };
    }

    try {
      await deleteDoc(doc(db, COLLECTIONS.PRODUCTS, id));
      
      return {
        success: true,
        message: 'Product deleted successfully'
      };

    } catch (error) {
      console.error('Error deleting product:', error);
      return {
        success: false,
        error: 'Failed to delete product'
      };
    }
  }

  // EVENT OPERATIONS

  // Get all events with filtering
  public async getEvents(
    filters: EventFilters = {},
    page: number = 1,
    pageLimit: number = COLLECTION_LIMITS.EVENTS_PER_PAGE
  ): Promise<PaginatedResponse<Event>> {
    try {
      let q = query(collection(db, COLLECTIONS.EVENTS));

      // Apply filters
      if (filters.category) {
        q = query(q, where('category', '==', filters.category));
      }
      if (filters.featured !== undefined) {
        q = query(q, where('isFeatured', '==', filters.featured));
      }
      if (filters.startDate) {
        q = query(q, where('startDate', '>=', Timestamp.fromDate(filters.startDate)));
      }
      if (filters.endDate) {
        q = query(q, where('startDate', '<=', Timestamp.fromDate(filters.endDate)));
      }

      // Add ordering and active filter
      q = query(q, where('isActive', '==', true), orderBy('startDate', 'asc'));

      // Apply pagination
      q = query(q, limit(pageLimit));

      const querySnapshot = await getDocs(q);
      const events: Event[] = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as Event));

      return {
        data: events,
        pagination: {
          page,
          limit: pageLimit,
          total: events.length,
          hasNext: events.length === pageLimit,
          hasPrev: page > 1
        }
      };

    } catch (error) {
      console.error('Error getting events:', error);
      throw new Error('Failed to fetch events');
    }
  }

  // Get single event by ID
  public async getEvent(id: string): Promise<Event | null> {
    try {
      const docRef = doc(db, COLLECTIONS.EVENTS, id);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        return {
          id: docSnap.id,
          ...docSnap.data()
        } as Event;
      }
      
      return null;
    } catch (error) {
      console.error('Error getting event:', error);
      throw new Error('Failed to fetch event');
    }
  }

  // Create new event (admin only)
  public async createEvent(eventData: Omit<Event, 'id' | 'createdAt' | 'updatedAt'>): Promise<ApiResponse<Event>> {
    if (!await authService.isAdmin()) {
      return {
        success: false,
        error: 'Unauthorized: Admin access required'
      };
    }

    try {
      const docRef = doc(collection(db, COLLECTIONS.EVENTS));
      const event: Omit<Event, 'id'> = {
        ...eventData,
        createdAt: serverTimestamp() as Timestamp,
        updatedAt: serverTimestamp() as Timestamp
      };

      await setDoc(docRef, event);

      const createdEvent: Event = {
        id: docRef.id,
        ...event,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now()
      };

      return {
        success: true,
        data: createdEvent,
        message: 'Event created successfully'
      };

    } catch (error) {
      console.error('Error creating event:', error);
      return {
        success: false,
        error: 'Failed to create event'
      };
    }
  }

  // CART OPERATIONS

  // Get user's cart
  public async getCart(userId: string): Promise<Cart | null> {
    try {
      const docRef = doc(db, COLLECTIONS.CARTS, userId);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        return docSnap.data() as Cart;
      }
      
      return null;
    } catch (error) {
      console.error('Error getting cart:', error);
      throw new Error('Failed to fetch cart');
    }
  }

  // Add item to cart
  public async addToCart(userId: string, item: CartItem): Promise<ApiResponse<Cart>> {
    if (!authService.isAuthenticated()) {
      return {
        success: false,
        error: 'User must be authenticated'
      };
    }

    try {
      const cartRef = doc(db, COLLECTIONS.CARTS, userId);
      const cartSnap = await getDoc(cartRef);
      
      let cart: Cart;
      
      if (cartSnap.exists()) {
        cart = cartSnap.data() as Cart;
        
        // Check if item already exists in cart
        const existingItemIndex = cart.items.findIndex(
          cartItem => cartItem.productId === item.productId && 
                     cartItem.variantId === item.variantId
        );
        
        if (existingItemIndex > -1) {
          // Update quantity
          cart.items[existingItemIndex].quantity += item.quantity;
        } else {
          // Add new item
          cart.items.push(item);
        }
      } else {
        // Create new cart
        cart = {
          userId,
          items: [item],
          updatedAt: serverTimestamp() as Timestamp
        };
      }
      
      cart.updatedAt = serverTimestamp() as Timestamp;
      await setDoc(cartRef, cart);

      return {
        success: true,
        data: cart,
        message: 'Item added to cart'
      };

    } catch (error) {
      console.error('Error adding to cart:', error);
      return {
        success: false,
        error: 'Failed to add item to cart'
      };
    }
  }

  // Remove item from cart
  public async removeFromCart(userId: string, productId: string, variantId?: string): Promise<ApiResponse<Cart>> {
    if (!authService.isAuthenticated()) {
      return {
        success: false,
        error: 'User must be authenticated'
      };
    }

    try {
      const cartRef = doc(db, COLLECTIONS.CARTS, userId);
      const cartSnap = await getDoc(cartRef);
      
      if (!cartSnap.exists()) {
        return {
          success: false,
          error: 'Cart not found'
        };
      }

      const cart = cartSnap.data() as Cart;
      cart.items = cart.items.filter(
        item => !(item.productId === productId && item.variantId === variantId)
      );
      
      cart.updatedAt = serverTimestamp() as Timestamp;
      await setDoc(cartRef, cart);

      return {
        success: true,
        data: cart,
        message: 'Item removed from cart'
      };

    } catch (error) {
      console.error('Error removing from cart:', error);
      return {
        success: false,
        error: 'Failed to remove item from cart'
      };
    }
  }

  // Clear cart
  public async clearCart(userId: string): Promise<ApiResponse<null>> {
    if (!authService.isAuthenticated()) {
      return {
        success: false,
        error: 'User must be authenticated'
      };
    }

    try {
      await deleteDoc(doc(db, COLLECTIONS.CARTS, userId));
      
      return {
        success: true,
        message: 'Cart cleared'
      };

    } catch (error) {
      console.error('Error clearing cart:', error);
      return {
        success: false,
        error: 'Failed to clear cart'
      };
    }
  }

  // ORDER OPERATIONS

  // Create order
  public async createOrder(orderData: Omit<Order, 'id' | 'createdAt' | 'updatedAt'>): Promise<ApiResponse<Order>> {
    if (!authService.isAuthenticated()) {
      return {
        success: false,
        error: 'User must be authenticated'
      };
    }

    try {
      const batch: WriteBatch = writeBatch(db);
      
      // Create order document
      const orderRef = doc(collection(db, COLLECTIONS.ORDERS));
      const order: Omit<Order, 'id'> = {
        ...orderData,
        orderNumber: this.generateOrderNumber(),
        createdAt: serverTimestamp() as Timestamp,
        updatedAt: serverTimestamp() as Timestamp
      };

      batch.set(orderRef, order);

      // Update product stock
      for (const item of orderData.items) {
        const productRef = doc(db, COLLECTIONS.PRODUCTS, item.productId);
        const productSnap = await getDoc(productRef);
        
        if (productSnap.exists()) {
          const product = productSnap.data() as Product;
          const newStock = product.stock - item.quantity;
          
          if (newStock < 0) {
            return {
              success: false,
              error: `Insufficient stock for ${item.productName}`
            };
          }
          
          batch.update(productRef, { stock: newStock, updatedAt: serverTimestamp() });
        }
      }

      // Clear user's cart
      const cartRef = doc(db, COLLECTIONS.CARTS, orderData.userId);
      batch.delete(cartRef);

      // Commit batch
      await batch.commit();

      const createdOrder: Order = {
        id: orderRef.id,
        ...order,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now()
      };

      return {
        success: true,
        data: createdOrder,
        message: 'Order created successfully'
      };

    } catch (error) {
      console.error('Error creating order:', error);
      return {
        success: false,
        error: 'Failed to create order'
      };
    }
  }

  // Get user's orders
  public async getUserOrders(userId: string): Promise<Order[]> {
    try {
      const q = query(
        collection(db, COLLECTIONS.ORDERS),
        where('userId', '==', userId),
        orderBy('createdAt', 'desc')
      );

      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as Order));

    } catch (error) {
      console.error('Error getting user orders:', error);
      throw new Error('Failed to fetch orders');
    }
  }

  // Get single order
  public async getOrder(orderId: string): Promise<Order | null> {
    try {
      const docRef = doc(db, COLLECTIONS.ORDERS, orderId);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        return {
          id: docSnap.id,
          ...docSnap.data()
        } as Order;
      }
      
      return null;
    } catch (error) {
      console.error('Error getting order:', error);
      throw new Error('Failed to fetch order');
    }
  }

  // Real-time listeners

  // Listen to products changes
  public onProductsChange(callback: (products: Product[]) => void) {
    const q = query(
      collection(db, COLLECTIONS.PRODUCTS),
      where('isActive', '==', true),
      orderBy('createdAt', 'desc')
    );

    return onSnapshot(q, (querySnapshot) => {
      const products: Product[] = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as Product));
      
      callback(products);
    });
  }

  // Listen to cart changes
  public onCartChange(userId: string, callback: (cart: Cart | null) => void) {
    const docRef = doc(db, COLLECTIONS.CARTS, userId);
    
    return onSnapshot(docRef, (docSnap) => {
      if (docSnap.exists()) {
        callback(docSnap.data() as Cart);
      } else {
        callback(null);
      }
    });
  }

  // Utility functions

  // Generate unique order number
  private generateOrderNumber(): string {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 1000);
    return `BS${timestamp}${random}`;
  }

  // Search products by name or description
  public async searchProducts(searchTerm: string): Promise<Product[]> {
    try {
      // Note: Firestore doesn't support full-text search natively
      // In production, consider using Algolia or Elasticsearch
      const q = query(
        collection(db, COLLECTIONS.PRODUCTS),
        where('isActive', '==', true),
        orderBy('name')
      );

      const querySnapshot = await getDocs(q);
      const products: Product[] = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as Product));

      // Client-side filtering (not ideal for large datasets)
      return products.filter(product => 
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );

    } catch (error) {
      console.error('Error searching products:', error);
      throw new Error('Failed to search products');
    }
  }
}

// Export singleton instance
export const dbService = DatabaseService.getInstance();