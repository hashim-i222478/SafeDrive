import React from 'react';
import { HomeScreen } from '../screens/main';

export type MainStackParamList = {
  Home: undefined;
  // Add more screens as needed
  // Profile: undefined;
  // Settings: undefined;
  // History: undefined;
};

// Temporary: Navigation disabled, showing only HomeScreen
const MainNavigator: React.FC = () => {
  return <HomeScreen />;
};

export default MainNavigator;
