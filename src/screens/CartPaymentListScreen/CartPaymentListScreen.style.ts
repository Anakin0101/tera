import useTheme from 'hooks/useTheme';
import { StyleSheet } from 'react-native';
import StaticSafeAreaInsets from 'react-native-static-safe-area-insets';
import { FontFamily, FontSize } from 'theme/Variables';

export const useStyles = () => {
  const { Colors, Spacing, Layout } = useTheme();

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
      fontFamily: FontFamily.medium,
      lineHeight: 22,
    },
    listWrapper: {
      paddingHorizontal: Spacing.xl,
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
      fontFamily: FontFamily.medium,
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
