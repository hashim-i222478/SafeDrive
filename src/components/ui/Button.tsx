import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useTheme } from '../../theme';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'small' | 'medium' | 'large';
  loading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  loading = false,
  disabled = false,
  fullWidth = false,
  style,
  textStyle,
  icon,
  iconPosition = 'left',
}) => {
  const theme = useTheme();

  const getButtonColors = () => {
    switch (variant) {
      case 'primary':
        return {
          background: [theme.colors.primary[500], theme.colors.primary[600]],
          text: theme.colors.text.inverse,
          border: 'transparent',
        };
      case 'secondary':
        return {
          background: [theme.colors.secondary[500], theme.colors.secondary[600]],
          text: theme.colors.text.inverse,
          border: 'transparent',
        };
      case 'outline':
        return {
          background: ['transparent', 'transparent'],
          text: theme.colors.primary[500],
          border: theme.colors.primary[500],
        };
      case 'ghost':
        return {
          background: ['transparent', 'transparent'],
          text: theme.colors.primary[500],
          border: 'transparent',
        };
      case 'danger':
        return {
          background: [theme.colors.error[500], theme.colors.error[600]],
          text: theme.colors.text.inverse,
          border: 'transparent',
        };
      default:
        return {
          background: [theme.colors.primary[500], theme.colors.primary[600]],
          text: theme.colors.text.inverse,
          border: 'transparent',
        };
    }
  };

  const getSizeStyles = () => {
    switch (size) {
      case 'small':
        return {
          paddingVertical: theme.spacing[2],
          paddingHorizontal: theme.spacing[3],
          typography: theme.typography.button.small,
        };
      case 'medium':
        return {
          paddingVertical: theme.spacing[3],
          paddingHorizontal: theme.spacing[4],
          typography: theme.typography.button.medium,
        };
      case 'large':
        return {
          paddingVertical: theme.spacing[4],
          paddingHorizontal: theme.spacing[6],
          typography: theme.typography.button.large,
        };
      default:
        return {
          paddingVertical: theme.spacing[3],
          paddingHorizontal: theme.spacing[4],
          typography: theme.typography.button.medium,
        };
    }
  };

  const colors = getButtonColors();
  const sizeStyles = getSizeStyles();
  const isDisabled = disabled || loading;

  const buttonStyle = [
    styles.button,
    {
      paddingVertical: sizeStyles.paddingVertical,
      paddingHorizontal: sizeStyles.paddingHorizontal,
      borderRadius: theme.borderRadius.md,
      borderWidth: variant === 'outline' ? 1 : 0,
      borderColor: colors.border,
      opacity: isDisabled ? 0.6 : 1,
      width: fullWidth ? '100%' : 'auto',
    },
    style,
  ];

  const textStyles = [
    sizeStyles.typography,
    {
      color: colors.text,
    },
    textStyle,
  ];

  const renderContent = () => (
    <>
      {icon && iconPosition === 'left' && (
        <React.Fragment>
          {icon}
          <Text style={[textStyles, { marginLeft: theme.spacing[2] }]}>
            {title}
          </Text>
        </React.Fragment>
      )}
      
      {!icon && (
        <Text style={textStyles}>
          {title}
        </Text>
      )}
      
      {icon && iconPosition === 'right' && (
        <React.Fragment>
          <Text style={[textStyles, { marginRight: theme.spacing[2] }]}>
            {title}
          </Text>
          {icon}
        </React.Fragment>
      )}
      
      {loading && (
        <ActivityIndicator
          size="small"
          color={colors.text}
          style={{ marginLeft: theme.spacing[2] }}
        />
      )}
    </>
  );

  if (variant === 'outline' || variant === 'ghost') {
    return (
      <TouchableOpacity
        style={[buttonStyle, { backgroundColor: 'transparent' }]}
        onPress={onPress}
        disabled={isDisabled}
        activeOpacity={0.7}
      >
        {renderContent()}
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={isDisabled}
      activeOpacity={0.8}
      style={buttonStyle}
    >
      <LinearGradient
        colors={colors.background}
        style={[
          styles.gradient,
          {
            borderRadius: theme.borderRadius.md,
            paddingVertical: sizeStyles.paddingVertical,
            paddingHorizontal: sizeStyles.paddingHorizontal,
          },
        ]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      >
        {renderContent()}
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  gradient: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
});
