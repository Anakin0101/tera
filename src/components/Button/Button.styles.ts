import useTheme from 'hooks/useTheme';
import { StyleSheet } from 'react-native';

// shared styles for all button types
export const useStyleTheme = () => {
  const { FontSize, Spacing, Layout, BorderRadius, Opacity } = useTheme();
  return StyleSheet.create({
    wrapperStyle: {
      borderRadius: BorderRadius.full,
      ...Layout.rowCenter,
      ...Layout.colCenter,
      ...Layout.selfCenter,
    },
    wrapperFullWidthStyle: {
      ...Layout.fullWidth,
      ...Layout.rowCenter,
    },
    wrapperFixWidthStyle: { ...Layout.fixWidth, ...Layout.rowCenter },
    wrapperPaddingMedium: {
      paddingVertical: Spacing.s,
      paddingHorizontal: Spacing.ml,
    },
    wrapperPaddingLarge: {
      paddingVertical: Spacing.ml,
      paddingHorizontal: Spacing.xl,
    },
    textStyle: {
      paddingHorizontal: Spacing.xxs,
    },
    textStyleMedium: {
      fontSize: FontSize.small,
    },
    textStyleLarge: {
      fontSize: FontSize.regular,
    },
    textDisabled: {
      opacity: Opacity.half,
    },
  });
};
