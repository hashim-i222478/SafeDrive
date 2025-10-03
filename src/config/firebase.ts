// Temporarily disable Firebase to fix TurboModule errors
// We'll re-enable after basic app is working

// Mock Firebase services for now
export const firebaseAuth = {
  onAuthStateChanged: (callback: any) => {
    // Mock - always return no user for now
    callback(null);
    return () => {};
  },
  signInWithEmailAndPassword: async () => Promise.resolve({ user: null }),
  createUserWithEmailAndPassword: async () => Promise.resolve({ user: null }),
  signOut: async () => Promise.resolve(),
  sendPasswordResetEmail: async () => Promise.resolve(),
};

export const firebaseFirestore = {
  collection: () => ({
    doc: () => ({
      get: async () => ({ exists: false, data: () => null }),
      set: async () => Promise.resolve(),
      update: async () => Promise.resolve(),
    }),
  }),
};

// Export types (mocked for now)
export type User = {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
} | null;

export type AuthError = {
  code: string;
  message: string;
};

export type DocumentSnapshot = any;
export type QuerySnapshot = any;

// User profile interface for Firestore
export interface UserProfile {
  uid: string;
  email: string;
  displayName?: string;
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  photoURL?: string;
  createdAt: Date;
  updatedAt: Date;
  // Drowsiness detection specific fields
  drivingPreferences?: {
    alertSensitivity: 'low' | 'medium' | 'high';
    soundAlerts: boolean;
    vibrationAlerts: boolean;
    emergencyContacts: string[];
  };
  drivingHistory?: {
    totalTrips: number;
    totalDrivingTime: number; // in minutes
    drowsinessIncidents: number;
    lastTripDate?: Date;
  };
}

// Authentication helper functions
export const createUserProfile = async (user: User, additionalData?: Partial<UserProfile>): Promise<void> => {
  if (!user) return;
  
  const userRef = firebaseFirestore.collection('users').doc(user.uid);
  const snapshot = await userRef.get();
  
  if (!snapshot.exists) {
    const { email, displayName, photoURL } = user;
    const createdAt = new Date();
    
    const defaultProfile: UserProfile = {
      uid: user.uid,
      email: email || '',
      displayName: displayName || '',
      photoURL: photoURL || '',
      createdAt,
      updatedAt: createdAt,
      drivingPreferences: {
        alertSensitivity: 'medium',
        soundAlerts: true,
        vibrationAlerts: true,
        emergencyContacts: [],
      },
      drivingHistory: {
        totalTrips: 0,
        totalDrivingTime: 0,
        drowsinessIncidents: 0,
      },
      ...additionalData,
    };
    
    try {
      await userRef.set(defaultProfile);
    } catch (error) {
      console.error('Error creating user profile:', error);
      throw error;
    }
  }
};

export const getUserProfile = async (uid: string): Promise<UserProfile | null> => {
  try {
    const userRef = firebaseFirestore.collection('users').doc(uid);
    const snapshot = await userRef.get();
    
    if (snapshot.exists) {
      return snapshot.data() as UserProfile;
    }
    return null;
  } catch (error) {
    console.error('Error fetching user profile:', error);
    throw error;
  }
};

export const updateUserProfile = async (uid: string, updates: Partial<UserProfile>): Promise<void> => {
  try {
    const userRef = firebaseFirestore.collection('users').doc(uid);
    await userRef.update({
      ...updates,
      updatedAt: new Date(),
    });
  } catch (error) {
    console.error('Error updating user profile:', error);
    throw error;
  }
};

// Firebase app is automatically initialized by React Native Firebase
