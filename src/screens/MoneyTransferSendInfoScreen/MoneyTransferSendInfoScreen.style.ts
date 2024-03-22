import useTheme from 'hooks/useTheme';
import { StyleSheet } from 'react-native';
import { FontFamily, FontSize } from 'theme/Variables';

export const useStyles = () => {
  const { Colors, Spacing, Layout } = useTheme();

  return StyleSheet.create({
    container: {
      ...Layout.fill,
    },
    headerTitle: {
      marginTop: Spacing.xlg,
      fontSize: FontSize.regularPlus,
      letterSpacing: -0.5,
      color: Colors.textBlack,
      fontFamily: FontFamily.main,
      lineHeight: 22,
    },
    listWrapper: {
      paddingBottom: Spacing.xxxl,
    },
    headerWrapper: {
      marginBottom: Spacing.md,
    },
    wrapper: {
      marginHorizontal: Spacing.xl,
    },
    ctaWrapper: {
      ...Layout.absolute,
      bottom: Spacing.xl,
      ...Layout.fullWidth,
    },
    ctaOpenWrapper: {
      paddingVertical: Spacing.md,
    },
    customButtonWrapper: {
      paddingHorizontal: Spacing.xl,
    },
  });
};
