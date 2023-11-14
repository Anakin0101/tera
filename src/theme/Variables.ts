/**
 * This file contains the application's variables.
 *
 * Define color, sizes, etc. here instead of duplicating them throughout the components.
 * That allows to change them more easily later on.
 */

import { ThemeNavigationColors } from 'types/declarations/theme';

/**
 * Colors
 */
export const Colors = {
  transparent: 'rgba(0,0,0,0)',
  inputBackground: '#FFFFFF',
  white: '#ffffff',
  gray: 'rgba(246, 246, 247, 1)',
  gray200: 'rgba(161, 161, 161, 0.2)',
  successToastColor: '#E9F6EB',
  successToastTextColor: '#43B64B',
  titleBlack: 'rgba(15, 15, 15, 0.98)',
  textBlack: 'rgba(28, 28, 28, 0.98)',
  textBlack500: 'rgba(29, 29, 29, 0.64)',
  textBlack400: 'rgba(29, 29, 29, 0.4)',
  pinColor: '#1C1C1CFA',
  textWhite: 'rgba(253, 253, 253, 0.98)',
  textGray700: 'rgba(15, 15, 15, 0.98)',
  textGray400: '#4D4D4D',
  textGray200: '#A1A1A1',
  primary: '#A0226D',
  textPrimary: '#A0226D',
  secondary: '#9F1D6B0F',
  inactiveTint: '#777C8B',
  success: 'rgba(67, 182, 75, 1)',
  success100: 'rgba(67, 182, 75, 0.1)',
  error: 'rgba(226, 45, 32, 1)',
  error100: 'rgba(226, 45, 32, 0.1)',
  circleButtonBackground: '#E1E1EF',
  circleButtonColor: '#44427D',
  inputBlack50: 'rgba(29, 29, 29, 0.05)',
  textWhite400: 'rgba(253, 253, 253, 0.4)',
  textWhite500: 'rgba(253, 253, 253, 0.64)',
  dotGray: '#7D8D99',
  errorToastColor: '#FAE8E7',
  dashboardBackground: '#F6F6F7',
  overlay: '#000000B3',
  currencyBackground: 'rgba(255, 255, 255, 0.1)',
  currency: '#AAAAAA',
  black200: 'rgba(29, 29, 29, 0.20)',
  black700: '#0F0F0FFA',
  headerBackground: 'rgba(246, 246, 246, 1)',
  pink: '#9F1D6B0F',
  skeleton: 'rgba(254, 254, 254, 1)',
  lightRed: 'rgba(226, 45, 32, 0.08)',
  accountText500: 'rgba(15, 15, 15, 0.64)',
  lightGray: 'rgba(249, 249, 249, 1)',
  borderColor: 'rgba(196, 196, 196, 0.3)',
};

export const NavigationColors: Partial<ThemeNavigationColors> = {
  primary: Colors.primary,
  background: Colors.headerBackground,
  card: '#EFEFEF',
};

/**
 * FontSize
 */
export const FontSize = {
  dwarf: 10,
  tiny: 12,
  small: 14,
  regular: 16,
  regularPlus: 18,
  semiLarge: 20,
  large: 24,
  extraLarge: 32,
};

export const Spacing = {
  zero: 0,
  xxxs: 2,
  xxs: 4,
  xs: 6,
  s: 8,
  md: 10,
  m: 12,
  ml: 16,
  l: 18,
  lg: 20,
  xl: 24,
  xlg: 32,
  xxl: 36,
  xxxl: 48,
};

export const BorderRadius = {
  full: 100,
};

export const Opacity = {
  zero: 0,
  one: 1,
  pointOne: 0.1,
  pointTwo: 0.2,
  pointThree: 0.3,
  pointFour: 0.4,
  half: 0.5,
  pointSix: 0.6,
  pointSeven: 0.7,
  pointEight: 0.8,
  pointNine: 0.9,
};

/**
 * Metrics Sizes
 */
const tiny = 10;
const small = tiny * 2; // 20
const regular = tiny * 3; // 30
const large = regular * 2; // 60
export const MetricsSizes = {
  tiny,
  small,
  regular,
  large,
};

export const FontFamily = {
  medium: 'TB-Public-2022Sans-Medium',
  Black: 'TB-Public-2022Sans-Black',
  DemiBold: 'TB-Public-2022Sans-DemiBold',
  Light: 'TB-Public-2022Sans-Light',
  LightItalic: 'TB-Public-2022Sans-LightItalic',
  Regular: 'TB-Public-2022Sans-Regular',
};

export default {
  Colors,
  NavigationColors,
  FontSize,
  Spacing,
  BorderRadius,
  Opacity,
  MetricsSizes,
  FontFamily,
};
