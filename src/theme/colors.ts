export const colors = {
  // Primary colors for drowsiness detection app
  primary: {
    50: '#E8F4FD',
    100: '#C6E2FA',
    200: '#94CBF5',
    300: '#5BADEF',
    400: '#3B95E8',
    500: '#1976D2', // Main primary
    600: '#1565C0',
    700: '#0D47A1',
    800: '#0A3D91',
    900: '#063078',
  },
  
  // Secondary colors (alert/warning for drowsiness)
  secondary: {
    50: '#FFF3E0',
    100: '#FFE0B2',
    200: '#FFCC80',
    300: '#FFB74D',
    400: '#FFA726',
    500: '#FF9800', // Main secondary
    600: '#FB8C00',
    700: '#F57C00',
    800: '#EF6C00',
    900: '#E65100',
  },
  
  // Success colors
  success: {
    50: '#E8F5E8',
    100: '#C8E6C9',
    200: '#A5D6A7',
    300: '#81C784',
    400: '#66BB6A',
    500: '#4CAF50', // Main success
    600: '#43A047',
    700: '#388E3C',
    800: '#2E7D32',
    900: '#1B5E20',
  },
  
  // Error/danger colors (critical drowsiness alert)
  error: {
    50: '#FFEBEE',
    100: '#FFCDD2',
    200: '#EF9A9A',
    300: '#E57373',
    400: '#EF5350',
    500: '#F44336', // Main error
    600: '#E53935',
    700: '#D32F2F',
    800: '#C62828',
    900: '#B71C1C',
  },
  
  // Warning colors (mild drowsiness)
  warning: {
    50: '#FFFDE7',
    100: '#FFF9C4',
    200: '#FFF59D',
    300: '#FFF176',
    400: '#FFEE58',
    500: '#FFEB3B', // Main warning
    600: '#FDD835',
    700: '#F9A825',
    800: '#F57F17',
    900: '#FF6F00',
  },
  
  // Neutral colors
  neutral: {
    50: '#FAFAFA',
    100: '#F5F5F5',
    200: '#EEEEEE',
    300: '#E0E0E0',
    400: '#BDBDBD',
    500: '#9E9E9E',
    600: '#757575',
    700: '#616161',
    800: '#424242',
    900: '#212121',
  },
  
  // Background colors
  background: {
    primary: '#FFFFFF',
    secondary: '#F8F9FA',
    tertiary: '#F1F3F4',
    dark: '#121212',
    darkSecondary: '#1E1E1E',
    darkTertiary: '#2D2D2D',
  },
  
  // Text colors
  text: {
    primary: '#212121',
    secondary: '#757575',
    disabled: '#BDBDBD',
    inverse: '#FFFFFF',
    darkPrimary: '#FFFFFF',
    darkSecondary: '#B3B3B3',
    darkDisabled: '#666666',
  },
  
  // Border colors
  border: {
    light: '#E0E0E0',
    medium: '#BDBDBD',
    dark: '#757575',
    darkLight: '#404040',
    darkMedium: '#606060',
    darkDark: '#808080',
  },
  
  // Special colors for drowsiness detection
  drowsiness: {
    alert: '#FF1744',      // Critical alert
    warning: '#FF9800',    // Warning state
    normal: '#4CAF50',     // Normal state
    monitoring: '#2196F3', // Monitoring active
  },
};

export type ColorScheme = 'light' | 'dark';

export const getColors = (scheme: ColorScheme = 'light') => {
  const isDark = scheme === 'dark';
  
  return {
    ...colors,
    background: isDark ? {
      primary: colors.background.dark,
      secondary: colors.background.darkSecondary,
      tertiary: colors.background.darkTertiary,
    } : {
      primary: colors.background.primary,
      secondary: colors.background.secondary,
      tertiary: colors.background.tertiary,
    },
    text: isDark ? {
      primary: colors.text.darkPrimary,
      secondary: colors.text.darkSecondary,
      disabled: colors.text.darkDisabled,
      inverse: colors.text.primary,
    } : {
      primary: colors.text.primary,
      secondary: colors.text.secondary,
      disabled: colors.text.disabled,
      inverse: colors.text.inverse,
    },
    border: isDark ? {
      light: colors.border.darkLight,
      medium: colors.border.darkMedium,
      dark: colors.border.darkDark,
    } : {
      light: colors.border.light,
      medium: colors.border.medium,
      dark: colors.border.dark,
    },
  };
};
