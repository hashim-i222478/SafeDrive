import { useColorScheme } from 'react-native';
import { colors, getColors, ColorScheme } from './colors';
import { typography } from './typography';
import { spacing, borderRadius, shadows } from './spacing';

export interface Theme {
  colors: ReturnType<typeof getColors>;
  typography: typeof typography;
  spacing: typeof spacing;
  borderRadius: typeof borderRadius;
  shadows: typeof shadows;
  isDark: boolean;
}

export const createTheme = (colorScheme: ColorScheme): Theme => ({
  colors: getColors(colorScheme),
  typography,
  spacing,
  borderRadius,
  shadows,
  isDark: colorScheme === 'dark',
});

export const useTheme = (): Theme => {
  const colorScheme = useColorScheme();
  return createTheme(colorScheme || 'light');
};

// Export individual theme modules
export { colors, getColors, ColorScheme } from './colors';
export { typography } from './typography';
export { spacing, borderRadius, shadows } from './spacing';
