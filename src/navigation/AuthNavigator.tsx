import React from 'react';
import { LoginScreen } from '../screens/auth';

export type AuthStackParamList = {
  Login: undefined;
  SignUp: undefined;
  ForgotPassword: undefined;
};

// Temporary: Navigation disabled, showing only LoginScreen
const AuthNavigator: React.FC = () => {
  return <LoginScreen />;
};

export default AuthNavigator;
