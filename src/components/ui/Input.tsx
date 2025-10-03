import React, { useState, forwardRef } from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
  TextInputProps,
} from 'react-native';
import { useTheme } from '../../theme';

// Icon mapping for text-based icons
const iconMap: Record<string, string> = {
  email: '📧',
  lock: '🔒',
  person: '👤',
  visibility: '👁',
  'visibility-off': '🚫',
};

const getIconText = (iconName: string): string => {
  return iconMap[iconName] || '?';
};

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: string;
  rightIcon?: string;
  onRightIconPress?: () => void;
  containerStyle?: ViewStyle;
  inputStyle?: ViewStyle;
  variant?: 'default' | 'filled' | 'outlined';
  size?: 'small' | 'medium' | 'large';
  required?: boolean;
}

export const Input = forwardRef<TextInput, InputProps>(({
  label,
  error,
  helperText,
  leftIcon,
  rightIcon,
  onRightIconPress,
  containerStyle,
  inputStyle,
  variant = 'outlined',
  size = 'medium',
  required = false,
  ...props
}, ref) => {
  const theme = useTheme();
  const [isFocused, setIsFocused] = useState(false);

  const getSizeStyles = () => {
    switch (size) {
      case 'small':
        return {
          height: 40,
          fontSize: theme.typography.body.small.fontSize,
          paddingHorizontal: theme.spacing[3],
        };
      case 'medium':
        return {
          height: 48,
          fontSize: theme.typography.body.medium.fontSize,
          paddingHorizontal: theme.spacing[4],
        };
      case 'large':
        return {
          height: 56,
          fontSize: theme.typography.body.large.fontSize,
          paddingHorizontal: theme.spacing[4],
        };
      default:
        return {
          height: 48,
          fontSize: theme.typography.body.medium.fontSize,
          paddingHorizontal: theme.spacing[4],
        };
    }
  };

  const getVariantStyles = () => {
    const baseStyles = {
      borderRadius: theme.borderRadius.md,
    };

    switch (variant) {
      case 'filled':
        return {
          ...baseStyles,
          backgroundColor: theme.colors.background.secondary,
          borderWidth: 0,
          borderBottomWidth: 2,
          borderBottomColor: isFocused 
            ? theme.colors.primary[500] 
            : error 
              ? theme.colors.error[500] 
              : theme.colors.border.light,
        };
      case 'outlined':
        return {
          ...baseStyles,
          backgroundColor: theme.colors.background.primary,
          borderWidth: 1,
          borderColor: isFocused 
            ? theme.colors.primary[500] 
            : error 
              ? theme.colors.error[500] 
              : theme.colors.border.light,
        };
      default:
        return {
          ...baseStyles,
          backgroundColor: theme.colors.background.primary,
          borderWidth: 1,
          borderColor: isFocused 
            ? theme.colors.primary[500] 
            : error 
              ? theme.colors.error[500] 
              : theme.colors.border.light,
        };
    }
  };

  const sizeStyles = getSizeStyles();
  const variantStyles = getVariantStyles();

  const containerStyles = [
    styles.container,
    containerStyle,
  ];

  const inputContainerStyles = [
    styles.inputContainer,
    variantStyles,
    {
      height: sizeStyles.height,
      paddingHorizontal: leftIcon ? theme.spacing[2] : sizeStyles.paddingHorizontal,
    },
  ];

  const textInputStyles = [
    styles.input,
    {
      fontSize: sizeStyles.fontSize,
      color: theme.colors.text.primary,
      fontFamily: theme.typography.body.medium.fontFamily,
      paddingLeft: leftIcon ? theme.spacing[1] : 0,
      paddingRight: rightIcon ? theme.spacing[1] : 0,
    },
    inputStyle,
  ];

  const labelStyles = [
    styles.label,
    theme.typography.label.medium,
    {
      color: error ? theme.colors.error[500] : theme.colors.text.secondary,
      marginBottom: theme.spacing[1],
    },
  ];

  const errorStyles = [
    styles.helperText,
    theme.typography.caption.medium,
    {
      color: theme.colors.error[500],
      marginTop: theme.spacing[1],
    },
  ];

  const helperTextStyles = [
    styles.helperText,
    theme.typography.caption.medium,
    {
      color: theme.colors.text.secondary,
      marginTop: theme.spacing[1],
    },
  ];

  return (
    <View style={containerStyles}>
      {label && (
        <Text style={labelStyles}>
          {label}
          {required && <Text style={{ color: theme.colors.error[500] }}> *</Text>}
        </Text>
      )}
      
      <View style={inputContainerStyles}>
        {leftIcon && (
          <Text
            style={[
              styles.leftIcon,
              {
                color: isFocused ? theme.colors.primary[500] : theme.colors.text.secondary,
                fontSize: 20,
              }
            ]}
          >
            {getIconText(leftIcon)}
          </Text>
        )}
        
        <TextInput
          ref={ref}
          style={textInputStyles}
          placeholderTextColor={theme.colors.text.disabled}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...props}
        />
        
        {rightIcon && (
          <TouchableOpacity
            onPress={onRightIconPress}
            style={styles.rightIcon}
            disabled={!onRightIconPress}
          >
            <Text
              style={{
                color: isFocused ? theme.colors.primary[500] : theme.colors.text.secondary,
                fontSize: 20,
              }}
            >
              {getIconText(rightIcon)}
            </Text>
          </TouchableOpacity>
        )}
      </View>
      
      {error && <Text style={errorStyles}>{error}</Text>}
      {helperText && !error && <Text style={helperTextStyles}>{helperText}</Text>}
    </View>
  );
});

Input.displayName = 'Input';

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    textAlignVertical: 'center',
  },
  label: {
    fontWeight: '500',
  },
  leftIcon: {
    marginRight: 8,
  },
  rightIcon: {
    marginLeft: 8,
    padding: 4,
  },
  helperText: {
    fontSize: 12,
  },
});
