import useTheme from 'hooks/useTheme';
import { StyleSheet } from 'react-native';

export const useStyleTheme = () => {
  const { Colors, FontSize, Fonts, FontFamily } = useTheme();
  return StyleSheet.create({
    default: {
      fontSize: FontSize.small,
      fontFamily: FontFamily.Regular,
      lineHeight: FontSize.large,
      color: Colors.textBlack,
    },
    uppercase: {
      ...Fonts.textUppercase,
    },
    center: {
      ...Fonts.textCenter,
    },
    label: {
      fontSize: FontSize.tiny,
      lineHeight: FontSize.regular,
    },
    title: {
      fontSize: FontSize.small,
      lineHeight: 22,
    },
    headline: {
      fontSize: FontSize.large,
      lineHeight: 34,
    },
    secondary: {
      color: Colors.textBlack500,
    },
    special: {
      color: Colors.textPrimary,
    },
    bold: {
      fontWeight: '700',
    },
    black: {
      fontFamily: FontFamily.Black,
    },
    demiBold: {
      fontFamily: FontFamily.DemiBold,
    },
    light: {
      fontFamily: FontFamily.Light,
    },
    lightItalic: {
      fontFamily: FontFamily.LightItalic,
    },
    regular: {
      fontFamily: FontFamily.Regular,
    },
    medium: {
      fontFamily: FontFamily.medium,
    },
  });
};
