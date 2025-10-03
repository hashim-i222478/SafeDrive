import { Platform } from 'react-native';

export const fontFamily = {
  regular: Platform.select({
    ios: 'System',
    android: 'Roboto',
    default: 'System',
  }),
  medium: Platform.select({
    ios: 'System',
    android: 'Roboto-Medium',
    default: 'System',
  }),
  bold: Platform.select({
    ios: 'System',
    android: 'Roboto-Bold',
    default: 'System',
  }),
  light: Platform.select({
    ios: 'System',
    android: 'Roboto-Light',
    default: 'System',
  }),
};

export const fontSize = {
  xs: 12,
  sm: 14,
  base: 16,
  lg: 18,
  xl: 20,
  '2xl': 24,
  '3xl': 30,
  '4xl': 36,
  '5xl': 48,
  '6xl': 60,
};

export const lineHeight = {
  xs: 16,
  sm: 20,
  base: 24,
  lg: 28,
  xl: 28,
  '2xl': 32,
  '3xl': 36,
  '4xl': 40,
  '5xl': 48,
  '6xl': 60,
};

export const fontWeight = {
  light: '300' as const,
  normal: '400' as const,
  medium: '500' as const,
  semibold: '600' as const,
  bold: '700' as const,
  extrabold: '800' as const,
};

export const typography = {
  // Display styles
  display: {
    large: {
      fontFamily: fontFamily.bold,
      fontSize: fontSize['5xl'],
      lineHeight: lineHeight['5xl'],
      fontWeight: fontWeight.bold,
    },
    medium: {
      fontFamily: fontFamily.bold,
      fontSize: fontSize['4xl'],
      lineHeight: lineHeight['4xl'],
      fontWeight: fontWeight.bold,
    },
    small: {
      fontFamily: fontFamily.bold,
      fontSize: fontSize['3xl'],
      lineHeight: lineHeight['3xl'],
      fontWeight: fontWeight.bold,
    },
  },
  
  // Heading styles
  heading: {
    h1: {
      fontFamily: fontFamily.bold,
      fontSize: fontSize['3xl'],
      lineHeight: lineHeight['3xl'],
      fontWeight: fontWeight.bold,
    },
    h2: {
      fontFamily: fontFamily.bold,
      fontSize: fontSize['2xl'],
      lineHeight: lineHeight['2xl'],
      fontWeight: fontWeight.bold,
    },
    h3: {
      fontFamily: fontFamily.semibold,
      fontSize: fontSize.xl,
      lineHeight: lineHeight.xl,
      fontWeight: fontWeight.semibold,
    },
    h4: {
      fontFamily: fontFamily.semibold,
      fontSize: fontSize.lg,
      lineHeight: lineHeight.lg,
      fontWeight: fontWeight.semibold,
    },
    h5: {
      fontFamily: fontFamily.medium,
      fontSize: fontSize.base,
      lineHeight: lineHeight.base,
      fontWeight: fontWeight.medium,
    },
    h6: {
      fontFamily: fontFamily.medium,
      fontSize: fontSize.sm,
      lineHeight: lineHeight.sm,
      fontWeight: fontWeight.medium,
    },
  },
  
  // Body text styles
  body: {
    large: {
      fontFamily: fontFamily.regular,
      fontSize: fontSize.lg,
      lineHeight: lineHeight.lg,
      fontWeight: fontWeight.normal,
    },
    medium: {
      fontFamily: fontFamily.regular,
      fontSize: fontSize.base,
      lineHeight: lineHeight.base,
      fontWeight: fontWeight.normal,
    },
    small: {
      fontFamily: fontFamily.regular,
      fontSize: fontSize.sm,
      lineHeight: lineHeight.sm,
      fontWeight: fontWeight.normal,
    },
  },
  
  // Label styles
  label: {
    large: {
      fontFamily: fontFamily.medium,
      fontSize: fontSize.base,
      lineHeight: lineHeight.base,
      fontWeight: fontWeight.medium,
    },
    medium: {
      fontFamily: fontFamily.medium,
      fontSize: fontSize.sm,
      lineHeight: lineHeight.sm,
      fontWeight: fontWeight.medium,
    },
    small: {
      fontFamily: fontFamily.medium,
      fontSize: fontSize.xs,
      lineHeight: lineHeight.xs,
      fontWeight: fontWeight.medium,
    },
  },
  
  // Caption styles
  caption: {
    large: {
      fontFamily: fontFamily.regular,
      fontSize: fontSize.sm,
      lineHeight: lineHeight.sm,
      fontWeight: fontWeight.normal,
    },
    medium: {
      fontFamily: fontFamily.regular,
      fontSize: fontSize.xs,
      lineHeight: lineHeight.xs,
      fontWeight: fontWeight.normal,
    },
  },
  
  // Button styles
  button: {
    large: {
      fontFamily: fontFamily.medium,
      fontSize: fontSize.base,
      lineHeight: lineHeight.base,
      fontWeight: fontWeight.medium,
    },
    medium: {
      fontFamily: fontFamily.medium,
      fontSize: fontSize.sm,
      lineHeight: lineHeight.sm,
      fontWeight: fontWeight.medium,
    },
    small: {
      fontFamily: fontFamily.medium,
      fontSize: fontSize.xs,
      lineHeight: lineHeight.xs,
      fontWeight: fontWeight.medium,
    },
  },
};
