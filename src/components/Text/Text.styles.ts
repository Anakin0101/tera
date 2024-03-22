import useTheme from 'hooks/useTheme';
import { StyleSheet } from 'react-native';
import { moderateScale } from 'utils/config';

export const useStyleTheme = () => {
  const { Colors, FontSize, Fonts } = useTheme();
  return StyleSheet.create({
    default: {
      fontSize: moderateScale(FontSize.small),
      ...Fonts.regular,
      lineHeight: FontSize.large,
      color: Colors.textBlack,
    },
    withoutLineHeight: {
      fontSize: moderateScale(FontSize.small),
      ...Fonts.regular,

      color: Colors.textBlack,
    },
    uppercase: {
      ...Fonts.textUppercase,
    },
    center: {
      ...Fonts.textCenter,
    },
    label: {
      fontSize: moderateScale(FontSize.tiny),
      lineHeight: FontSize.regularPlus,
    },
    title: {
      fontSize: moderateScale(FontSize.small),
      lineHeight: 22,
    },
    headline: {
      fontSize: moderateScale(FontSize.large),
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
    demiBold: {
      ...Fonts.semiBold,
    },
    regular: {
      ...Fonts.regular,
    },
    medium: {
      ...Fonts.medium,
    },
    disabled: {
      color: Colors.textDisabled,
    },
  });
};
