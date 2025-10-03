// Firebase Configuration Template
// Copy this file to src/config/firebase-config.js and update with your Firebase project credentials

export const firebaseConfig = {
  apiKey: "your-api-key-here",
  authDomain: "your-project-id.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project-id.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:android:abcdef123456789012345678"
};

// Instructions:
// 1. Go to Firebase Console (https://console.firebase.google.com/)
// 2. Create a new project or select existing project
// 3. Add an Android/iOS app to your project
// 4. Download the google-services.json (Android) or GoogleService-Info.plist (iOS)
// 5. Copy the configuration values from those files to replace the values above
// 6. Enable Authentication in Firebase Console:
//    - Go to Authentication > Sign-in method
//    - Enable Email/Password authentication
// 7. Enable Firestore Database:
//    - Go to Firestore Database
//    - Create database in production mode
//    - Set up security rules as needed
// 8. Save this file as src/config/firebase-config.js
