import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import database, { FirebaseDatabaseTypes } from '@react-native-firebase/database';

// Firebase services
export const firebaseAuth = auth();
export const firebaseDatabase = database();

// Export Firebase types
export type User = FirebaseAuthTypes.User | null;
export type AuthError = {
  code: string;
  message: string;
};

export type DatabaseReference = FirebaseDatabaseTypes.Reference;
export type DataSnapshot = FirebaseDatabaseTypes.DataSnapshot;

// User profile interface for Realtime Database
export interface UserProfile {
  uid: string;
  email: string;
  displayName?: string;
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  photoURL?: string;
  createdAt: string; // ISO string for Realtime Database
  updatedAt: string;
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
    lastTripDate?: string; // ISO string
  };
}

// Authentication helper functions
export const createUserProfile = async (user: User, additionalData?: Partial<UserProfile>): Promise<void> => {
  if (!user) return;
  
  const userRef = firebaseDatabase.ref(`users/${user.uid}`);
  const snapshot = await userRef.once('value');
  
  if (!snapshot.exists()) {
    const { email, displayName, photoURL } = user;
    const createdAt = new Date().toISOString();
    
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
      console.log('✅ User profile created successfully in Realtime Database');
    } catch (error) {
      console.error('❌ Error creating user profile:', error);
      throw error;
    }
  }
};

export const getUserProfile = async (uid: string): Promise<UserProfile | null> => {
  try {
    const userRef = firebaseDatabase.ref(`users/${uid}`);
    const snapshot = await userRef.once('value');
    
    if (snapshot.exists()) {
      const data = snapshot.val();
      return data as UserProfile;
    }
    return null;
  } catch (error) {
    console.error('❌ Error fetching user profile:', error);
    throw error;
  }
};

export const updateUserProfile = async (uid: string, updates: Partial<UserProfile>): Promise<void> => {
  try {
    const userRef = firebaseDatabase.ref(`users/${uid}`);
    await userRef.update({
      ...updates,
      updatedAt: new Date().toISOString(),
    });
    console.log('✅ User profile updated successfully');
  } catch (error) {
    console.error('❌ Error updating user profile:', error);
    throw error;
  }
};

// Firebase app is automatically initialized by React Native Firebase
