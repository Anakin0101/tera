import { StyleSheet } from 'react-native';
import { useTheme } from 'hooks';
import { config, horizontalScale } from 'utils/config';

const PROGRESS_WIDTH = config.mobileWidth - 48 - 12 - 48;

export const useStyles = () => {
  const { Layout, Colors, Spacing, FontSize, FontFamily } = useTheme();

  return StyleSheet.create({
    sectionList: {
      backgroundColor: Colors.white,
    },
    contentContainer: {
      backgroundColor: Colors.dashboardBackground,
    },
    container: {
      ...Layout.fill,
    },
    cardContainer: {
      ...Layout.center,
      width: 48,
      height: 48,
      borderWidth: 1,
      borderRadius: Spacing.xl,
      borderColor: Colors.inputBlack50,
    },
    wrapperWithBorder: {
      backgroundColor: Colors.white,
      borderTopLeftRadius: Spacing.xl,
      borderTopRightRadius: Spacing.xl,
    },
    CardListWrapperWithoutBorder: {
      backgroundColor: Colors.white,
    },
    smallCard: {
      width: 26,
      height: Spacing.l,
      borderRadius: Spacing.xxs,
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
      marginBottom: Spacing.zero,
    },
    badgeContainer: {
      ...Layout.row,
      ...Layout.alignItemsCenter,
      gap: Spacing.xs,
      marginTop: Spacing.xs,
    },
    emptyCards: {
      ...Layout.alignItemsCenter,
    },
    detailsSectionWrapper: {
      padding: Spacing.xl,
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
    card: {
      ...Layout.justifyContentBetween,
      padding: 26,
      width: horizontalScale(340),
      height: 200,
    },
    content: {
      ...Layout.selfCenter,
    },
    balance: {
      ...Layout.row,
    },
    arrowContainer: {
      marginTop: 7,
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
      width: '90%',
      ...Layout.row,
      ...Layout.flexWrap,
      gap: Spacing.xs,
    },
    currency: {
      backgroundColor: Colors.currencyBackground,
      paddingHorizontal: Spacing.xs,
      paddingVertical: Spacing.xxs,
      borderRadius: 80,
    },
    actionButtons: {
      ...Layout.justifyContentBetween,
    },
  });
};
