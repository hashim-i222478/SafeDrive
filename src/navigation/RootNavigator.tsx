import React from 'react';
import { useAuth } from '../context/AuthContext';
import AuthNavigator from './AuthNavigator';
import MainNavigator from './MainNavigator';
import { LoadingSpinner } from '../components/ui';
import { CameraScreen } from '../screens/main';

const SHOW_CAMERA_FIRST = true; // <-- flip this to false to restore auth

const RootNavigator: React.FC = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <LoadingSpinner overlay text="Loading..." />;
  }

  if (SHOW_CAMERA_FIRST) {
    return <CameraScreen />;
  }

  // Temporary: NavigationContainer disabled, direct component rendering
  return user ? <MainNavigator /> : <AuthNavigator />;
};

export default RootNavigator;
