import useTheme from 'hooks/useTheme';
import { StyleSheet } from 'react-native';
import { FontFamily, FontSize } from 'theme/Variables';

export const useStyles = () => {
  const { Colors, Spacing, Layout } = useTheme();

  return StyleSheet.create({
    container: {
      ...Layout.fill,
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
      marginHorizontal: Spacing.xl,
      paddingBottom: Spacing.xxxl,
    },
    ctaWrapper: {
      paddingHorizontal: Spacing.xl,
      marginBottom: Spacing.ml,
    },
    ctaOpenWrapper: {
      paddingVertical: Spacing.md,
    },
  });
};
