# SafeDrive Authentication Setup

This document provides instructions for setting up Firebase authentication in your SafeDrive app.

## 🚀 Quick Start

### 1. Firebase Project Setup

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project or select an existing one
3. Add your Android/iOS app to the project
4. Download configuration files:
   - **Android**: `google-services.json`
   - **iOS**: `GoogleService-Info.plist`

### 2. Enable Authentication Services

1. In Firebase Console, go to **Authentication** > **Sign-in method**
2. Enable **Email/Password** authentication
3. Optionally enable other providers (Google, Facebook, etc.)

### 3. Setup Firestore Database

1. Go to **Firestore Database** in Firebase Console
2. Create database in **production mode**
3. Set up security rules (see below)

### 4. Configure the App

1. Copy `firebase-config-template.js` to `src/config/firebase-config.js`
2. Update the configuration with your Firebase project credentials
3. Place platform-specific config files:
   - **Android**: Place `google-services.json` in `android/app/`
   - **iOS**: Add `GoogleService-Info.plist` to your iOS project in Xcode

## 🔧 Configuration Files

### Firebase Config (src/config/firebase-config.js)
```javascript
export const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "your-app-id"
};
```

### Firestore Security Rules
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can only access their own profile
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Driving sessions belong to authenticated users
    match /drivingSessions/{sessionId} {
      allow read, write: if request.auth != null && 
        request.auth.uid == resource.data.userId;
    }
  }
}
```

## 📱 Features Included

### Authentication
- ✅ Email/Password login and registration
- ✅ Password reset functionality
- ✅ Form validation and error handling
- ✅ Secure user profile management
- ✅ Auto-login persistence

### UI/UX
- ✅ Modern, responsive design
- ✅ Dark/Light theme support
- ✅ Drowsiness detection themed colors
- ✅ Smooth animations and transitions
- ✅ Loading states and error handling

### Security
- ✅ Input sanitization
- ✅ Password strength validation
- ✅ Secure Firebase integration
- ✅ Protected routes
- ✅ User session management

## 🎨 Theme Customization

The app includes a comprehensive theme system with:

- **Primary Colors**: Blue tones for main UI elements
- **Secondary Colors**: Orange tones for alerts and warnings
- **Status Colors**: Success (green), Error (red), Warning (yellow)
- **Drowsiness Colors**: Specific colors for different alert levels
- **Typography**: Responsive text styles for all screen sizes
- **Spacing**: Consistent spacing system
- **Shadows**: Material Design elevation system

## 🔐 User Profile Schema

The app automatically creates user profiles with:

```typescript
interface UserProfile {
  uid: string;
  email: string;
  displayName?: string;
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  photoURL?: string;
  createdAt: Date;
  updatedAt: Date;
  drivingPreferences: {
    alertSensitivity: 'low' | 'medium' | 'high';
    soundAlerts: boolean;
    vibrationAlerts: boolean;
    emergencyContacts: string[];
  };
  drivingHistory: {
    totalTrips: number;
    totalDrivingTime: number; // in minutes
    drowsinessIncidents: number;
    lastTripDate?: Date;
  };
}
```

## 🚨 Troubleshooting

### Common Issues

1. **Build Errors**: Make sure all Firebase packages are properly installed
2. **Authentication Errors**: Verify Firebase configuration and enable Email/Password auth
3. **Network Errors**: Check internet connection and Firebase project status
4. **Permission Errors**: Verify Firestore security rules allow user access

### Debug Mode

Enable debug logging by adding to your app:

```javascript
// In development only
if (__DEV__) {
  // Enable Firebase debug logging
  firebase.firestore().settings({
    host: 'localhost:8080',
    ssl: false
  });
}
```

## 📞 Support

If you encounter issues:

1. Check the [Firebase Documentation](https://firebase.google.com/docs)
2. Review the [React Native Firebase Guide](https://rnfirebase.io/)
3. Check console logs for specific error messages
4. Verify all configuration files are in place

## 🔄 Next Steps

After authentication is working:

1. Implement drowsiness detection features
2. Add camera integration
3. Set up real-time monitoring
4. Add emergency contact notifications
5. Implement driving history tracking
6. Add analytics and reporting

---

**Note**: Remember to keep your Firebase configuration secure and never commit sensitive credentials to version control.
