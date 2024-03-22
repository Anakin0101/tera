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
      paddingBottom: 150,
    },
    desc: {
      marginTop: Spacing.xlm,
      fontSize: FontSize.small,
      lineHeight: 22,
      letterSpacing: -0.2,
      color: Colors.textGray400,
      fontFamily: FontFamily.main,
    },
    ctaWrapper: {
      ...Layout.absolute,
      bottom: Spacing.ml,
      ...Layout.fullWidth,
    },
    customButtonWrapper: {
      paddingHorizontal: Spacing.xl,
    },
    termsWrapper: {
      ...Layout.row,
      marginTop: Spacing.xl,
      marginBottom: Spacing.lg,
      ...Layout.alignItemsCenter,
    },
    termsText: {
      fontSize: FontSize.tiny,
      fontFamily: FontFamily.main,
      letterSpacing: -0.2,
    },
    termsTextMargin: {
      marginLeft: Spacing.s,
      color: Colors.textGray400,
    },
    termsTextWrapper: {
      marginLeft: -Spacing.m,
    },
  });
};
