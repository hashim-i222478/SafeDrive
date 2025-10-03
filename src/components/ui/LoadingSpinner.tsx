import React from 'react';
import {
  View,
  ActivityIndicator,
  Text,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import { useTheme } from '../../theme';

interface LoadingSpinnerProps {
  size?: 'small' | 'large';
  color?: string;
  text?: string;
  overlay?: boolean;
  style?: ViewStyle;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'large',
  color,
  text,
  overlay = false,
  style,
}) => {
  const theme = useTheme();

  const spinnerColor = color || theme.colors.primary[500];

  const containerStyle = [
    styles.container,
    overlay && styles.overlay,
    overlay && { backgroundColor: theme.colors.background.primary + '80' },
    style,
  ];

  const textStyle = [
    styles.text,
    theme.typography.body.medium,
    {
      color: theme.colors.text.secondary,
      marginTop: theme.spacing[3],
    },
  ];

  return (
    <View style={containerStyle}>
      <ActivityIndicator size={size} color={spinnerColor} />
      {text && <Text style={textStyle}>{text}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1000,
  },
  text: {
    textAlign: 'center',
  },
});
