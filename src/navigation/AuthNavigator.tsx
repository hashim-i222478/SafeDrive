import React, { useState } from 'react';
import { LoginScreen, SignUpScreen } from '../screens/auth';

export type AuthStackParamList = {
  Login: undefined;
  SignUp: undefined;
  ForgotPassword: undefined;
};

// Simple state-based navigation for auth screens
const AuthNavigator: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<keyof AuthStackParamList>('Login');

  // Simple navigation object
  const navigation = {
    navigate: (screen: keyof AuthStackParamList) => {
      setCurrentScreen(screen);
    },
    goBack: () => {
      setCurrentScreen('Login'); // Go back to login as default
    },
  };

  // Render the appropriate screen based on current state
  switch (currentScreen) {
    case 'SignUp':
      return <SignUpScreen navigation={navigation} />;
    case 'Login':
    default:
      return <LoginScreen navigation={navigation} />;
  }
};

export default AuthNavigator;
