import useTheme from 'hooks/useTheme';
import { StyleSheet } from 'react-native';
import { FontSize } from 'theme/Variables';

export const useStyles = () => {
  const { Colors, Spacing, Layout } = useTheme();

  return StyleSheet.create({
    container: {
      ...Layout.fill,
    },
    wrapper: {
      paddingBottom: 150,
    },
    ctaWrapper: {
      ...Layout.absolute,
      bottom: Spacing.ml,
      ...Layout.fullWidth,
    },
    customButtonWrapper: {
      paddingHorizontal: Spacing.xl,
    },
    infoWrapper: {
      ...Layout.row,
      backgroundColor: Colors.white,
      borderRadius: 8,
      marginTop: Spacing.xxl,
      paddingHorizontal: Spacing.ml,
      paddingVertical: Spacing.ml,
      marginHorizontal: Spacing.xl,
    },
    iconWrapper: {
      width: 48,
      height: 48,
      ...Layout.center,
      borderWidth: 1,
      borderColor: Colors.borderColor,
      borderRadius: 50,
      marginRight: Spacing.m,
    },
    title: {
      fontSize: FontSize.small,
      lineHeight: 16,
      letterSpacing: -0.5,
      color: Colors.textBlack500,
    },
    value: {
      fontSize: FontSize.regular,
      lineHeight: 24,
      letterSpacing: -0.5,
      color: Colors.textBlack,
      marginTop: Spacing.xxs,
    },
    content: {
      marginTop: Spacing.xlg,
      backgroundColor: Colors.white,
      ...Layout.fill,
      paddingHorizontal: Spacing.xl,
      borderTopRightRadius: 24,
      borderTopLeftRadius: 24,
      paddingBottom: Spacing.xxxl,
    },
    itemWrapper: {
      marginTop: Spacing.xl,
    },
  });
};
