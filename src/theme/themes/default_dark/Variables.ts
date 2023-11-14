import { ThemeNavigationColors } from 'types/declarations/theme';

export const Colors = {
  transparent: 'rgba(0,0,0,0)',
  inputBackground: '#262626',
  white: '#ffffff',
  textBlack: 'rgba(255, 255, 255, 0.98)',
  textBlack500: 'rgba(255, 255, 255, 0.64)',
  textBlack400: 'rgba(255, 255, 255, 0.4)',
  textWhite: 'rgba(0, 0, 0, 0.98)', // White text color for dark mode
  textGray400: '#B0B0B0',
  textGray200: '#808080',
  primary: '#7454a5',
  textPrimary: '#7454a5',
  secondary: '#9F1D6B0F',
  inactiveTint: '#777C8B',
  success: 'rgba(67, 182, 75, 1)',
  success100: 'rgba(67, 182, 75, 0.1)',
  error: 'rgba(226, 45, 32, 1)',
  error100: 'rgba(226, 45, 32, 0.1)',
  circleButtonBackground: '#252732',
  circleButtonColor: '#E1E1EF',
  inputBlack50: 'rgba(255, 255, 255, 0.05)',
};

export const NavigationColors: Partial<ThemeNavigationColors> = {
  primary: Colors.primary,
  background: '#1B1A23',
  card: '#1B1A23',
};

export default {
  Colors,
  NavigationColors,
};
