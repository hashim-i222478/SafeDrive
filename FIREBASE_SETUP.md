# Firebase Setup Guide for SafeDrive

Follow these steps to set up Firebase for your SafeDrive project.

## 1. Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project"
3. Enter project name: `safedrive-yourname` (make it unique)
4. Disable Google Analytics (optional for this project)
5. Click "Create project"

## 2. Enable Authentication

1. In your Firebase project, go to **Authentication**
2. Click "Get started"
3. Go to **Sign-in method** tab
4. Enable **Email/Password** provider
5. Click "Save"

## 3. Enable Realtime Database

1. Go to **Realtime Database** in Firebase console
2. Click "Create Database"
3. Choose location (closest to your users)
4. Start in **test mode** (allows read/write for 30 days)
5. Click "Done"

## 4. Add Android App

1. In Firebase project overview, click Android icon
2. **Android package name**: `com.safedrive`
3. **App nickname**: SafeDrive
4. **Debug SHA-1**: Leave empty for now
5. Click "Register app"
6. **Download** `google-services.json`
7. **IMPORTANT**: Replace `android/app/google-services.json` with your downloaded file
8. Continue through the setup (dependencies already configured)

## 5. Add iOS App (Optional)

1. In Firebase project overview, click iOS icon
2. **iOS bundle ID**: `com.safedrive`
3. **App nickname**: SafeDrive
4. Click "Register app"
5. **Download** `GoogleService-Info.plist`
6. **IMPORTANT**: Replace `ios/SAFEDRIVE/GoogleService-Info.plist` with your downloaded file
7. Continue through the setup (dependencies already configured)

## 6. Configure Database Rules (For Testing)

In **Realtime Database** > **Rules**, use these rules for testing:

```json
{
  "rules": {
    ".read": true,
    ".write": true
  }
}
```

**⚠️ Warning**: These rules allow public read/write access. Change them before production!

## 7. Production Security Rules

For production, use these secure rules:

```json
{
  "rules": {
    "users": {
      "$uid": {
        ".read": "$uid === auth.uid",
        ".write": "$uid === auth.uid"
      }
    }
  }
}
```

## 8. Test Your Setup

1. Run the app: `pnpm run android`
2. Try signing up with a test email
3. Check Firebase Authentication console to see the new user
4. Check Realtime Database console to see the user profile data

## Troubleshooting

### Common Issues:

1. **Build errors**: Ensure `google-services.json` is in `android/app/` directory
2. **Auth not working**: Verify Email/Password is enabled in Firebase Console
3. **Database errors**: Check that Realtime Database is created and rules allow access
4. **Network errors**: Ensure device/emulator has internet connection

### Need Help?

- Check the main README.md for troubleshooting
- Firebase Documentation: https://firebase.google.com/docs
- React Native Firebase: https://rnfirebase.io/