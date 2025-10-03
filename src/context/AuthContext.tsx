import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { Alert } from 'react-native';
import { 
  firebaseAuth, 
  createUserProfile, 
  getUserProfile, 
  User, 
  UserProfile,
  AuthError 
} from '../config/firebase';

interface AuthContextType {
  user: User | null;
  userProfile: UserProfile | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, additionalData?: Partial<UserProfile>) => Promise<void>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updateProfile: (updates: Partial<UserProfile>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = firebaseAuth.onAuthStateChanged(async (authUser: User) => {
      setLoading(true);
      
      if (authUser) {
        setUser(authUser);
        
        // Fetch user profile from Firestore
        try {
          const profile = await getUserProfile(authUser.uid);
          setUserProfile(profile);
        } catch (error) {
          console.error('Error fetching user profile:', error);
        }
      } else {
        setUser(null);
        setUserProfile(null);
      }
      
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const signIn = async (email: string, password: string): Promise<void> => {
    try {
      setLoading(true);
      // For now with mock Firebase, just simulate authentication
      await firebaseAuth.signInWithEmailAndPassword();
      console.log('Mock sign in for:', email);
    } catch (error) {
      const authError = error as AuthError;
      let errorMessage = 'An error occurred during sign in.';
      
      switch (authError.code) {
        case 'auth/user-not-found':
          errorMessage = 'No account found with this email address.';
          break;
        case 'auth/wrong-password':
          errorMessage = 'Incorrect password. Please try again.';
          break;
        case 'auth/invalid-email':
          errorMessage = 'Please enter a valid email address.';
          break;
        case 'auth/user-disabled':
          errorMessage = 'This account has been disabled.';
          break;
        case 'auth/too-many-requests':
          errorMessage = 'Too many failed attempts. Please try again later.';
          break;
        default:
          errorMessage = authError.message || errorMessage;
      }
      
      Alert.alert('Sign In Error', errorMessage);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (
    email: string, 
    password: string, 
    additionalData?: Partial<UserProfile>
  ): Promise<void> => {
    try {
      setLoading(true);
      // For now with mock Firebase, just simulate user creation
      const result = await firebaseAuth.createUserWithEmailAndPassword();
      const newUser = result.user;
      
      if (newUser) {
        await createUserProfile(newUser, additionalData);
      }
      console.log('Mock sign up for:', email);
    } catch (error) {
      const authError = error as AuthError;
      let errorMessage = 'An error occurred during sign up.';
      
      switch (authError.code) {
        case 'auth/email-already-in-use':
          errorMessage = 'An account with this email already exists.';
          break;
        case 'auth/invalid-email':
          errorMessage = 'Please enter a valid email address.';
          break;
        case 'auth/weak-password':
          errorMessage = 'Password should be at least 6 characters long.';
          break;
        case 'auth/operation-not-allowed':
          errorMessage = 'Email/password accounts are not enabled.';
          break;
        default:
          errorMessage = authError.message || errorMessage;
      }
      
      Alert.alert('Sign Up Error', errorMessage);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signOut = async (): Promise<void> => {
    try {
      setLoading(true);
      await firebaseAuth.signOut();
    } catch (error) {
      console.error('Error signing out:', error);
      Alert.alert('Error', 'Failed to sign out. Please try again.');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async (email: string): Promise<void> => {
    try {
      // For now with mock Firebase, just simulate password reset
      await firebaseAuth.sendPasswordResetEmail();
      console.log('Mock password reset for:', email);
      Alert.alert(
        'Password Reset',
        'A password reset email has been sent to your email address.'
      );
    } catch (error) {
      const authError = error as AuthError;
      let errorMessage = 'Failed to send password reset email.';
      
      switch (authError.code) {
        case 'auth/user-not-found':
          errorMessage = 'No account found with this email address.';
          break;
        case 'auth/invalid-email':
          errorMessage = 'Please enter a valid email address.';
          break;
        default:
          errorMessage = authError.message || errorMessage;
      }
      
      Alert.alert('Password Reset Error', errorMessage);
      throw error;
    }
  };

  const updateProfile = async (updates: Partial<UserProfile>): Promise<void> => {
    if (!user) {
      throw new Error('No user logged in');
    }
    
    try {
      const { updateUserProfile } = await import('../config/firebase');
      await updateUserProfile(user.uid, updates);
      
      // Update local state
      if (userProfile) {
        setUserProfile({ ...userProfile, ...updates, updatedAt: new Date() });
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      Alert.alert('Error', 'Failed to update profile. Please try again.');
      throw error;
    }
  };

  const value: AuthContextType = {
    user,
    userProfile,
    loading,
    signIn,
    signUp,
    signOut,
    resetPassword,
    updateProfile,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
