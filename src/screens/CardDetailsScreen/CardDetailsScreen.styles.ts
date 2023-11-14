import { StyleSheet } from 'react-native';
import { useTheme } from 'hooks';
import { config, horizontalScale } from 'utils/config';

const PROGRESS_WIDTH = config.mobileWidth - 48 - 12 - 48;

export const useStyles = () => {
  const { Layout, Colors, Spacing, FontSize, FontFamily, BorderRadius } = useTheme();

  return StyleSheet.create({
    sectionList: {
      backgroundColor: Colors.dashboardBackground,
    },
    container: {
      ...Layout.fill,
      backgroundColor: Colors.white,
    },
    contentContainer: {
      gap: Spacing.m,
      paddingHorizontal: 36,
    },
    cardsSlider: {
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
    startContainer: {
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
      // marginTop: Spacing.ml,
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
      ...Layout.justifyContentBetween,
      marginTop: Spacing.xlg,
      marginHorizontal: 30,
    },
    actionWrapper: {
      ...Layout.center,
    },
    iconContainer: {
      width: 56,
      height: 56,
      borderRadius: 28,
      backgroundColor: Colors.white,
      ...Layout.center,
    },
    cardContainer: {
      ...Layout.center,
      width: 48,
      height: 48,
      borderWidth: 1,
      borderRadius: Spacing.xl,
      borderColor: Colors.inputBlack50,
    },
    cardListWrapper: {
      backgroundColor: Colors.white,
      borderTopLeftRadius: Spacing.xl,
      borderTopRightRadius: Spacing.xl,
    },
    smallCard: {
      width: 26,
      height: Spacing.l,
      borderRadius: Spacing.xxs,
      backgroundColor: Colors.textBlack,
    },
    cardsListHeader: {
      padding: Spacing.xl,
    },
    cardItemContainer: {
      ...Layout.row,
      gap: Spacing.m,
      marginHorizontal: Spacing.xl,
    },
    cardDetailsContainer: {
      ...Layout.fill,
      ...Layout.row,
      ...Layout.justifyContentBetween,
    },
    nameContainer: {
      ...Layout.row,
      ...Layout.alignItemsCenter,
      gap: Spacing.xs,
    },
    cardIconContainer: {
      ...Layout.row,
      ...Layout.alignItemsCenter,
      gap: Spacing.ml,
    },
    footerContainer: {
      margin: Spacing.xl,
      marginBottom: 32,
    },
    badgeContainer: {
      ...Layout.row,
      ...Layout.alignItemsCenter,
      gap: Spacing.xs,
      marginTop: Spacing.xs,
    },
    badge: {
      ...Layout.row,
      ...Layout.alignItemsCenter,
      backgroundColor: Colors.error100,
      gap: Spacing.xxs,
      padding: 5,
      minWidth: 100,
      borderRadius: 50,
    },
    emptyCards: {
      ...Layout.alignItemsCenter,
    },
    detailsSectionWrapper: {
      backgroundColor: Colors.white,
      paddingHorizontal: Spacing.xl,
    },
    detailsWrapper: {
      ...Layout.row,
      ...Layout.justifyContentBetween,
    },
    detailsContainer: {
      marginTop: Spacing.ml,
    },
    detailsIconContainer: {
      width: 40,
      height: 40,
      borderRadius: 20,
      borderColor: Colors.inputBlack50,
      borderWidth: 1,
      ...Layout.center,
      marginTop: 15,
    },
    blockedFundsContainer: {
      ...Layout.rowHCenter,
      ...Layout.justifyContentBetween,
    },
    blockedFundsIcon: {
      margin: 10,
    },
    backgroundWhite: {
      backgroundColor: Colors.white,
    },
    headerLabelStyle: {
      fontSize: FontSize.regularPlus,
      fontFamily: FontFamily.DemiBold,
    },
    transactionsContainer: {
      backgroundColor: Colors.white,
      paddingBottom: Spacing.xl,
    },
    overdraftWrapper: {
      borderTopLeftRadius: Spacing.xl,
      backgroundColor: Colors.white,
      borderTopRightRadius: Spacing.xl,
    },
    overdraftContainer: {
      paddingHorizontal: Spacing.xl,
    },
    overdraftDetailsWrapper: {
      ...Layout.row,
      gap: Spacing.m,
      marginTop: Spacing.xl,
    },
    overdraftDetails: {
      ...Layout.fill,
      ...Layout.rowHCenter,
      ...Layout.justifyContentBetween,
    },
    overdraftAmount: {
      ...Layout.rowHCenter,
    },
    progress: {
      width: PROGRESS_WIDTH,
      height: Spacing.xxs,
      backgroundColor: Colors.inputBlack50,
      borderRadius: 20,
      marginTop: Spacing.l,
    },
    indicator: {
      height: Spacing.xxs,
      backgroundColor: Colors.success,
      borderRadius: 20,
    },
  });
};
