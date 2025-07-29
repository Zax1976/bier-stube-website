// Firebase Authentication Service
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
  sendPasswordResetEmail,
  sendEmailVerification,
  User,
  UserCredential,
  AuthError
} from 'firebase/auth';
import { doc, setDoc, getDoc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from './config';
import { UserProfile, ApiResponse, CustomClaims } from './types';
import { COLLECTIONS } from './schema';

export class AuthService {
  private static instance: AuthService;
  private currentUser: User | null = null;
  private userProfile: UserProfile | null = null;

  private constructor() {
    // Listen for auth state changes
    onAuthStateChanged(auth, async (user) => {
      this.currentUser = user;
      if (user) {
        await this.loadUserProfile(user.uid);
      } else {
        this.userProfile = null;
      }
    });
  }

  // Singleton pattern
  public static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  // Get current user
  public getCurrentUser(): User | null {
    return this.currentUser;
  }

  // Get current user profile
  public getCurrentUserProfile(): UserProfile | null {
    return this.userProfile;
  }

  // Check if user is authenticated
  public isAuthenticated(): boolean {
    return this.currentUser !== null;
  }

  // Check if user is admin
  public async isAdmin(): Promise<boolean> {
    if (!this.currentUser) return false;
    
    try {
      const tokenResult = await this.currentUser.getIdTokenResult();
      return tokenResult.claims.admin === true;
    } catch (error) {
      console.error('Error checking admin status:', error);
      return false;
    }
  }

  // Sign up new user
  public async signUp(
    email: string, 
    password: string, 
    userData: Partial<UserProfile>
  ): Promise<ApiResponse<UserProfile>> {
    try {
      // Create auth user
      const userCredential: UserCredential = await createUserWithEmailAndPassword(
        auth, 
        email, 
        password
      );
      
      const user = userCredential.user;

      // Update display name if provided
      if (userData.displayName) {
        await updateProfile(user, {
          displayName: userData.displayName
        });
      }

      // Create user profile document
      const userProfile: Omit<UserProfile, 'id'> = {
        uid: user.uid,
        email: user.email!,
        displayName: userData.displayName || null,
        photoURL: userData.photoURL || null,
        isAdmin: false, // Default to false, admin status set by admin users
        firstName: userData.firstName || '',
        lastName: userData.lastName || '',
        phone: userData.phone || '',
        addresses: [],
        preferences: {
          emailNotifications: true,
          smsNotifications: false,
          marketingEmails: true
        },
        createdAt: serverTimestamp() as any,
        updatedAt: serverTimestamp() as any
      };

      // Save to Firestore
      const userDocRef = doc(db, COLLECTIONS.USERS, user.uid);
      await setDoc(userDocRef, userProfile);

      // Send email verification
      await sendEmailVerification(user);

      // Load the created profile
      await this.loadUserProfile(user.uid);

      return {
        success: true,
        data: this.userProfile!,
        message: 'User created successfully. Please check your email for verification.'
      };

    } catch (error) {
      const authError = error as AuthError;
      return {
        success: false,
        error: this.getAuthErrorMessage(authError)
      };
    }
  }

  // Sign in existing user
  public async signIn(email: string, password: string): Promise<ApiResponse<UserProfile>> {
    try {
      const userCredential: UserCredential = await signInWithEmailAndPassword(
        auth, 
        email, 
        password
      );
      
      const user = userCredential.user;
      await this.loadUserProfile(user.uid);

      return {
        success: true,
        data: this.userProfile!,
        message: 'Signed in successfully'
      };

    } catch (error) {
      const authError = error as AuthError;
      return {
        success: false,
        error: this.getAuthErrorMessage(authError)
      };
    }
  }

  // Sign out user
  public async signOut(): Promise<ApiResponse<null>> {
    try {
      await signOut(auth);
      this.userProfile = null;
      
      return {
        success: true,
        message: 'Signed out successfully'
      };

    } catch (error) {
      return {
        success: false,
        error: 'Failed to sign out'
      };
    }
  }

  // Reset password
  public async resetPassword(email: string): Promise<ApiResponse<null>> {
    try {
      await sendPasswordResetEmail(auth, email);
      
      return {
        success: true,
        message: 'Password reset email sent'
      };

    } catch (error) {
      const authError = error as AuthError;
      return {
        success: false,
        error: this.getAuthErrorMessage(authError)
      };
    }
  }

  // Update user profile
  public async updateUserProfile(updates: Partial<UserProfile>): Promise<ApiResponse<UserProfile>> {
    if (!this.currentUser) {
      return {
        success: false,
        error: 'User not authenticated'
      };
    }

    try {
      const userDocRef = doc(db, COLLECTIONS.USERS, this.currentUser.uid);
      
      // Prepare updates
      const updateData = {
        ...updates,
        updatedAt: serverTimestamp()
      };

      // Remove fields that shouldn't be updated directly
      delete updateData.id;
      delete updateData.uid;
      delete updateData.createdAt;
      delete updateData.isAdmin; // Admin status should only be set by admin users

      await updateDoc(userDocRef, updateData);

      // Update auth profile if display name changed
      if (updates.displayName) {
        await updateProfile(this.currentUser, {
          displayName: updates.displayName
        });
      }

      // Reload user profile
      await this.loadUserProfile(this.currentUser.uid);

      return {
        success: true,
        data: this.userProfile!,
        message: 'Profile updated successfully'
      };

    } catch (error) {
      console.error('Error updating profile:', error);
      return {
        success: false,
        error: 'Failed to update profile'
      };
    }
  }

  // Get user's ID token (for API calls)
  public async getIdToken(): Promise<string | null> {
    if (!this.currentUser) return null;
    
    try {
      return await this.currentUser.getIdToken();
    } catch (error) {
      console.error('Error getting ID token:', error);
      return null;
    }
  }

  // Get user's custom claims
  public async getCustomClaims(): Promise<CustomClaims> {
    if (!this.currentUser) return {};
    
    try {
      const tokenResult = await this.currentUser.getIdTokenResult();
      return tokenResult.claims as CustomClaims;
    } catch (error) {
      console.error('Error getting custom claims:', error);
      return {};
    }
  }

  // Private method to load user profile from Firestore
  private async loadUserProfile(uid: string): Promise<void> {
    try {
      const userDocRef = doc(db, COLLECTIONS.USERS, uid);
      const userDoc = await getDoc(userDocRef);
      
      if (userDoc.exists()) {
        this.userProfile = {
          id: userDoc.id,
          ...userDoc.data()
        } as UserProfile;
      } else {
        console.warn('User profile not found in Firestore');
        this.userProfile = null;
      }
    } catch (error) {
      console.error('Error loading user profile:', error);
      this.userProfile = null;
    }
  }

  // Private method to handle auth errors
  private getAuthErrorMessage(error: AuthError): string {
    switch (error.code) {
      case 'auth/user-not-found':
        return 'No user found with this email address';
      case 'auth/wrong-password':
        return 'Incorrect password';
      case 'auth/email-already-in-use':
        return 'An account with this email already exists';
      case 'auth/weak-password':
        return 'Password should be at least 6 characters';
      case 'auth/invalid-email':
        return 'Invalid email address';
      case 'auth/user-disabled':
        return 'This account has been disabled';
      case 'auth/too-many-requests':
        return 'Too many failed attempts. Please try again later';
      case 'auth/operation-not-allowed':
        return 'This sign-in method is not enabled';
      case 'auth/requires-recent-login':
        return 'Please sign in again to complete this action';
      default:
        return error.message || 'An authentication error occurred';
    }
  }

  // Method to listen for auth state changes
  public onAuthStateChange(callback: (user: User | null, profile: UserProfile | null) => void) {
    return onAuthStateChanged(auth, (user) => {
      callback(user, this.userProfile);
    });
  }

  // Verify email address
  public async sendEmailVerification(): Promise<ApiResponse<null>> {
    if (!this.currentUser) {
      return {
        success: false,
        error: 'User not authenticated'
      };
    }

    try {
      await sendEmailVerification(this.currentUser);
      return {
        success: true,
        message: 'Verification email sent'
      };
    } catch (error) {
      return {
        success: false,
        error: 'Failed to send verification email'
      };
    }
  }

  // Check if email is verified
  public isEmailVerified(): boolean {
    return this.currentUser?.emailVerified || false;
  }
}

// Export singleton instance
export const authService = AuthService.getInstance();