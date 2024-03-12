import useTheme from 'hooks/useTheme';
import { StyleSheet } from 'react-native';
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
      fontFamily: FontFamily.main,
      lineHeight: 22,
    },
    listWrapper: {
      marginHorizontal: Spacing.xl,
      paddingBottom: Spacing.xxxl,
    },
    ctaWrapper: {
      paddingBottom: Spacing.ml,
    },
    ctaBG: {
      backgroundColor: Colors.white,
    },
    customButtonWrapper: {
      paddingHorizontal: Spacing.xl,
      marginTop: Spacing.m,
    },
    termsWrapper: {
      flexDirection: 'row',
      marginTop: Spacing.xl,
      marginBottom: Spacing.lg,
      alignItems: 'center',
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
    currencyConversionWrapper: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: Spacing.lg,
    },
    currencyConversionLabel: {
      fontSize: FontSize.small,
      letterSpacing: -0.2,
      color: Colors.textGray400,
    },
  });
};
