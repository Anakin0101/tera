import useTheme from 'hooks/useTheme';
import { StyleSheet } from 'react-native';
import StaticSafeAreaInsets from 'react-native-static-safe-area-insets';

export const useStyles = () => {
  const { Colors, Spacing, Layout, Fonts, FontSize } = useTheme();

  return StyleSheet.create({
    container: {
      ...Layout.fill,
      backgroundColor: Colors.white,
    },
    wrapper: {
      paddingHorizontal: Spacing.xl,
    },
    headerTitle: {
      marginTop: Spacing.xlm,
      fontSize: FontSize.regularPlus,
      letterSpacing: -0.5,
      color: Colors.textBlack,
      ...Fonts.medium,
      lineHeight: 22,
    },
    listWrapper: {
      paddingTop: Spacing.xl,
      paddingBottom: 120,
    },
    ctaWrapper: {
      paddingHorizontal: Spacing.xl,
      marginBottom: Spacing.ml,
    },
    ctaOpenWrapper: {
      paddingVertical: Spacing.md,
    },
    buttonText: {
      fontSize: FontSize.regular,
      lineHeight: 20,
      letterSpacing: -0.5,
      ...Fonts.medium,
      paddingVertical: Spacing.xxs,
    },
    buttonContainer: {
      zIndex: 2,
      paddingHorizontal: Spacing.xl,
      position: 'absolute',
      width: '100%',
      bottom: Spacing.s + StaticSafeAreaInsets.safeAreaInsetsBottom,
    },
  });
};
