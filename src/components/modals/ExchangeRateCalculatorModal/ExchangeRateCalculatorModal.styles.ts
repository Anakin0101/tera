import useTheme from 'hooks/useTheme';
import { Platform, StyleSheet } from 'react-native';

export const useStyles = () => {
  const { Layout, Spacing, Colors, FontSize, MetricsSizes, FontFamily } = useTheme();

  return StyleSheet.create({
    currency: {
      ...Platform.select({
        android: { marginTop: Spacing.xxxs },
        ios: { marginTop: Spacing.xs },
      }),
    },
    fill: {
      ...Layout.fill,
    },
    inputsWrapper: {
      ...Layout.row,
      ...Layout.justifyContentBetween,
      marginTop: Spacing.xxl,
    },
    toCurrency: {
      ...Layout.fill,
      ...Layout.alignItemsEnd,
    },
    mainIconWrapper: {
      marginTop: Spacing.reg,
      marginHorizontal: Spacing.ml,
    },
    input: {
      fontSize: FontSize.regular,
      marginTop: Spacing.s,
      lineHeight: Spacing.lg,
      fontFamily: FontFamily.main,
    },
    selectCurrency: {
      ...Layout.row,
      ...Layout.center,
      backgroundColor: Colors.lightPink,
      borderRadius: Spacing.xlg,
      paddingHorizontal: Spacing.s,
      paddingVertical: Spacing.xs,
      gap: Spacing.md,
      height: 40,
    },
    iconContainer: {
      margin: Spacing.zero,
      borderWidth: Spacing.zero,
      width: Spacing.xl,
      height: Spacing.xl,
    },
    icon: {
      width: Spacing.xl,
      height: Spacing.xl,
    },
    currencyName: {
      ...Layout.rowHCenter,
      gap: Spacing.md,
    },
    alignEnd: {
      ...Layout.alignSelfEnd,
    },
    button: {
      paddingVertical: Spacing.reg,
      marginTop: Spacing.xl,
    },
    collapsibleWrapper: {
      marginTop: Spacing.m,
      width: 110,
    },
    headerWrapper: {
      borderRadius: Spacing.xlg,
      backgroundColor: Colors.lightPink,
    },
    headerIcon: {
      paddingHorizontal: Spacing.s,
    },
    cur: {
      ...Layout.center,
      width: MetricsSizes.medium,
      height: Spacing.xxl,
    },
    collapsibleContent: {
      width: MetricsSizes.extraLarge,
      ...Layout.alignItemsCenter,
      ...Layout.selfCenter,
      marginTop: Spacing.xs,
    },
    selected: {
      backgroundColor: Colors.lightPink,
      borderRadius: Spacing.lg,
    },
    disabled: {
      opacity: 0.5,
    },
    rates: {
      ...Layout.row,
      ...Layout.center,
    },
  });
};
