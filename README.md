# SafeDrive - Drowsiness Detection App

A React Native application with Firebase authentication for drowsiness detection while driving.

## Prerequisites

Before running this project, make sure you have:

### Development Environment
- **Node.js** (v18 or higher)
- **pnpm** package manager (`npm install -g pnpm`)
- **Android Studio** with Android SDK
- **Java JDK** (v17 or higher)
- **React Native CLI** (`npm install -g @react-native-community/cli`)

### Mobile Development Setup
- **Android Emulator** or physical Android device
- For iOS: **Xcode** and iOS Simulator (macOS only)

> **Note**: Complete the [React Native Environment Setup](https://reactnative.dev/docs/environment-setup) guide for your platform.

## Firebase Setup

This project uses Firebase for authentication and Realtime Database. You'll need to set up your own Firebase project:

### 1. Create Firebase Project
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project
3. Enable **Authentication** > **Email/Password** sign-in method
4. Enable **Realtime Database** in test mode

### 2. Configure Android App
1. Add an Android app to your Firebase project
2. Package name: `com.safedrive`
3. Download `google-services.json`
4. Place it in `android/app/google-services.json`

### 3. Configure iOS App (Optional)
1. Add an iOS app to your Firebase project
2. Bundle ID: `com.safedrive`
3. Download `GoogleService-Info.plist`
4. Place it in `ios/SAFEDRIVE/GoogleService-Info.plist`

## Installation & Setup

### 1. Clone Repository
```bash
git clone https://github.com/hashim-i222478/SafeDrive.git
cd SAFEDRIVE
```

### 2. Install Dependencies
```bash
# Install Node.js dependencies
pnpm install

# Install iOS dependencies (macOS only)
cd ios && bundle install && bundle exec pod install && cd ..
```

### 3. Firebase Configuration
- Replace `android/app/google-services.json` with your Firebase config
- Replace `ios/SAFEDRIVE/GoogleService-Info.plist` with your Firebase config (iOS)

### 4. Start Metro Server
```bash
pnpm start
```

### 5. Run the App

#### Android
```bash
# Using pnpm
pnpm run android

# OR using React Native CLI
npx react-native run-android
```

#### iOS (macOS only)
```bash
# Using pnpm
pnpm run ios

# OR using React Native CLI
npx react-native run-ios
```

## Project Structure

```
SAFEDRIVE/
├── src/
│   ├── components/ui/     # Reusable UI components
│   ├── config/           # Firebase configuration
│   ├── context/          # React Context (Auth)
│   ├── navigation/       # Navigation setup
│   ├── screens/          # App screens
│   └── theme/           # Design tokens
├── android/             # Android-specific code
├── ios/                # iOS-specific code
└── __tests__/          # Test files
```

## Features

- 🔐 **Firebase Authentication** (Email/Password)
- 📱 **Custom Navigation System**
- 🎨 **Custom UI Components**
- 💾 **Realtime Database Integration**
- 🚗 **Drowsiness Detection** (Coming Soon)

## Scripts

```bash
# Start Metro server
pnpm start

# Run on Android
pnpm run android

# Run on iOS
pnpm run ios

# Run tests
pnpm test

# Type checking
pnpm run tsc

# Linting
pnpm run lint
```

## Troubleshooting

### Common Issues

#### 1. Metro Server Issues
```bash
# Clear Metro cache
npx react-native start --reset-cache
```

#### 2. Android Build Issues
```bash
# Clean Android build
cd android && ./gradlew clean && cd ..
npx react-native run-android
```

#### 3. iOS Build Issues (macOS)
```bash
# Clean iOS build
cd ios && xcodebuild clean && cd ..
npx react-native run-ios
```

#### 4. Firebase Authentication Issues
- Ensure `google-services.json` is in `android/app/`
- Verify Firebase project has Email/Password auth enabled
- Check internet connectivity

#### 5. Database Permission Errors
- Ensure Realtime Database is in **test mode**
- Rules should allow read/write for testing:
```json
{
  "rules": {
    ".read": true,
    ".write": true
  }
}
```

## Development

### Adding New Features
1. Create feature branch: `git checkout -b feature/new-feature`
2. Make changes and test
3. Commit: `git commit -m "Add new feature"`
4. Push: `git push origin feature/new-feature`
5. Create Pull Request

### Firebase Security Rules (Production)
For production, update Realtime Database rules:
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

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact

- **Developer**: Hashim
- **GitHub**: [@hashim-i222478](https://github.com/hashim-i222478)
- **Repository**: [SafeDrive](https://github.com/hashim-i222478/SafeDrive)

## Step 1: Start Metro

First, you will need to run **Metro**, the JavaScript build tool for React Native.

To start the Metro dev server, run the following command from the root of your React Native project:

```sh
# Using npm
npm start

# OR using Yarn
yarn start
```

## Step 2: Build and run your app

With Metro running, open a new terminal window/pane from the root of your React Native project, and use one of the following commands to build and run your Android or iOS app:

### Android

```sh
# Using npm
npm run android

# OR using Yarn
yarn android
```

### iOS

For iOS, remember to install CocoaPods dependencies (this only needs to be run on first clone or after updating native deps).

The first time you create a new project, run the Ruby bundler to install CocoaPods itself:

```sh
bundle install
```

Then, and every time you update your native dependencies, run:

```sh
bundle exec pod install
```

For more information, please visit [CocoaPods Getting Started guide](https://guides.cocoapods.org/using/getting-started.html).

```sh
# Using npm
npm run ios

# OR using Yarn
yarn ios
```

If everything is set up correctly, you should see your new app running in the Android Emulator, iOS Simulator, or your connected device.

This is one way to run your app — you can also build it directly from Android Studio or Xcode.

## Step 3: Modify your app

Now that you have successfully run the app, let's make changes!

Open `App.tsx` in your text editor of choice and make some changes. When you save, your app will automatically update and reflect these changes — this is powered by [Fast Refresh](https://reactnative.dev/docs/fast-refresh).

When you want to forcefully reload, for example to reset the state of your app, you can perform a full reload:

- **Android**: Press the <kbd>R</kbd> key twice or select **"Reload"** from the **Dev Menu**, accessed via <kbd>Ctrl</kbd> + <kbd>M</kbd> (Windows/Linux) or <kbd>Cmd ⌘</kbd> + <kbd>M</kbd> (macOS).
- **iOS**: Press <kbd>R</kbd> in iOS Simulator.

## Congratulations! :tada:

You've successfully run and modified your React Native App. :partying_face:

### Now what?

- If you want to add this new React Native code to an existing application, check out the [Integration guide](https://reactnative.dev/docs/integration-with-existing-apps).
- If you're curious to learn more about React Native, check out the [docs](https://reactnative.dev/docs/getting-started).

# Troubleshooting

If you're having issues getting the above steps to work, see the [Troubleshooting](https://reactnative.dev/docs/troubleshooting) page.

# Learn More

To learn more about React Native, take a look at the following resources:

- [React Native Website](https://reactnative.dev) - learn more about React Native.
- [Getting Started](https://reactnative.dev/docs/environment-setup) - an **overview** of React Native and how setup your environment.
- [Learn the Basics](https://reactnative.dev/docs/getting-started) - a **guided tour** of the React Native **basics**.
- [Blog](https://reactnative.dev/blog) - read the latest official React Native **Blog** posts.
- [`@facebook/react-native`](https://github.com/facebook/react-native) - the Open Source; GitHub **repository** for React Native.
