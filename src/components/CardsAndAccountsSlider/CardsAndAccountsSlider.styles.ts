import { StyleSheet } from 'react-native';
import { useTheme } from 'hooks';
import { horizontalScale } from 'utils/config';

export const useStyles = () => {
  const { Layout, Colors, Spacing, BorderRadius } = useTheme();

  return StyleSheet.create({
    contentContainer: {
      gap: Spacing.m,
      paddingHorizontal: 36,
    },
    slider: {
      backgroundColor: Colors.dashboardBackground,
      paddingVertical: Spacing.xl,
    },
    card: {
      ...Layout.justifyContentBetween,
      padding: 26,
      borderRadius: Spacing.m,
      backgroundColor: Colors.titleBlack,
      width: horizontalScale(340),
      height: 200,
    },
    balance: {
      ...Layout.row,
    },
    arrowContainer: {
      marginTop: Spacing.m,
      marginLeft: Spacing.s,
    },
    starContainer: {
      ...Layout.center,
      ...Layout.absolute,
      width: Spacing.xl,
      height: Spacing.xl,
      borderRadius: Spacing.m,
      backgroundColor: Colors.white,
      top: Spacing.ml,
      right: Spacing.ml,
    },
    currencies: {
      ...Layout.row,
      ...Layout.flexWrap,
      gap: Spacing.xs,
    },
    currency: {
      backgroundColor: Colors.currencyBackground,
      padding: Spacing.xs,
      borderRadius: 80,
    },
    blockMessage: {
      ...Layout.row,
      ...Layout.alignItemsCenter,
      backgroundColor: Colors.error,
      borderRadius: BorderRadius.full,
      paddingHorizontal: Spacing.m,
      paddingVertical: Spacing.xxs,
      gap: Spacing.xs,
      width: 180,
    },
    actionButtonsContainer: {
      ...Layout.row,
      ...Layout.justifyContentCenter,
      marginTop: Spacing.xlg,
      marginHorizontal: 30,
    },
    actionWrapper: {
      ...Layout.alignItemsCenter,
      paddingHorizontal: 8,
    },
    iconContainer: {
      width: 56,
      height: 56,
      borderRadius: 28,
      backgroundColor: Colors.white,
      ...Layout.center,
    },
    actionButtonLabel: {
      maxWidth: 85,
      marginTop: Spacing.m,
    },
    cardItem: {
      ...Layout.justifyContentBetween,
      height: 200,
      width: horizontalScale(340),
      backgroundColor: Colors.creditCardBg,
      borderRadius: Spacing.m,
      padding: 22,
    },
    cardHeader: {
      ...Layout.row,
      ...Layout.justifyContentBetween,
      marginTop: Spacing.s,
    },
    insuredIcon: {
      ...Layout.center,
      width: Spacing.xl,
      height: Spacing.xl,
      borderRadius: Spacing.m,
      backgroundColor: Colors.white,
    },
    cardFooter: {
      ...Layout.row,
      ...Layout.justifyContentBetween,
    },
    cardInfo: {
      ...Layout.row,
      gap: Spacing.m,
    },
    cardStatusBadge: {
      ...Layout.row,
      ...Layout.alignItemsCenter,
      ...Layout.justifyContentCenter,
      backgroundColor: Colors.white,
      gap: Spacing.xxxs,
      height: Spacing.xl,
      paddingHorizontal: 5,
      borderRadius: 50,
    },
    badgesContainer: {
      ...Layout.row,
      gap: Spacing.s,
    },
  });
};
