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
    headerTitle: {
      marginTop: Spacing.xlm,
      fontSize: FontSize.regular,
      lineHeight: 26,
      fontWeight: '400',
      letterSpacing: -0.2,
      color: Colors.textBlack,
      fontFamily: FontFamily.main,
      ...Layout.alignItemsCenter,
    },
    desc: {
      marginTop: Spacing.xlm,
      fontSize: FontSize.small,
      lineHeight: 22,
      letterSpacing: -0.2,
      color: Colors.textGray400,
      fontFamily: FontFamily.main,
    },
    listWrapper: {
      marginHorizontal: Spacing.xl,
      paddingBottom: Spacing.xxxl,
    },
    ctaWrapper: {
      ...Layout.absolute,
      bottom: Spacing.ml,
      ...Layout.fullWidth,
    },
    customButtonWrapper: {
      paddingHorizontal: Spacing.xl,
    },
    checkWrapper: {
      ...Layout.row,
      marginTop: Spacing.xl,
    },
    conditionLabel: {
      marginLeft: Spacing.md,
      marginTop: -Spacing.xs,
      fontSize: FontSize.small,
      lineHeight: 22,
      letterSpacing: -0.2,
      color: Colors.textGray700,
      fontFamily: FontFamily.main,
    },
  });
};
