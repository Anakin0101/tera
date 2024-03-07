import useTheme from 'hooks/useTheme';
import { StyleSheet } from 'react-native';

export const useStyles = () => {
  const { Colors, Spacing, Layout, Fonts, FontSize } = useTheme();

  return StyleSheet.create({
    container: {
      ...Layout.fill,
    },
    containerStyle: {
      flex: 1,
      backgroundColor: Colors.white,
    },
    wrapper: {
      backgroundColor: Colors.dashboardBackground,
    },
    headerTitle: {
      marginBottom: Spacing.xl,
      marginTop: Spacing.xlm,
      fontSize: FontSize.regularPlus,
      letterSpacing: -0.5,
      color: Colors.textBlack,
      ...Fonts.medium,
      lineHeight: 22,
    },
    ctaWrapper: {
      marginBottom: Spacing.ml,
      marginHorizontal: Spacing.xl,
    },
    ctaOpenWrapper: {
      paddingVertical: Spacing.md,
    },
    headerWrapper: {
      ...Layout.fill,
      flexWrap: 'nowrap',
      paddingVertical: Spacing.xxs,
      paddingRight: Spacing.xl,
      marginLeft: Spacing.xxs,
    },
    providerHeaderTitle: {
      fontSize: FontSize.small,
      letterSpacing: -0.5,
      color: Colors.textBlack500,
      ...Fonts.medium,
      lineHeight: 16,
    },
    providerWrapper: {
      backgroundColor: Colors.white,
      borderRadius: 12,
      marginTop: Spacing.xl,
      ...Layout.row,
      ...Layout.alignItemsCenter,
      paddingHorizontal: Spacing.xl,
      paddingVertical: Spacing.s,
      minHeight: 60,
    },
    headerDesc: {
      fontSize: FontSize.regular,
      letterSpacing: -0.5,
      color: Colors.textBlack,
      ...Fonts.medium,
      lineHeight: 24,
      marginTop: Spacing.xxs,
    },
    iconStyle: {
      width: 48,
      height: 48,
      borderWidth: 1,
      borderColor: Colors.borderColor,
    },
    buttonWrapper: {
      marginTop: Spacing.xl,
    },
    contentWrapper: {
      backgroundColor: Colors.white,
      marginTop: Spacing.xxl,
      borderTopRightRadius: 24,
      borderTopLeftRadius: 24,
      paddingHorizontal: Spacing.xl,
      ...Layout.fill,
    },
    disabledButton: {
      opacity: 0.5,
    },
  });
};
