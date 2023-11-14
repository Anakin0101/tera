import { StyleSheet } from 'react-native';
import { useTheme } from 'hooks';

export const useStyles = () => {
  const { Layout, Colors, Spacing, Fonts } = useTheme();
  return StyleSheet.create({
    listContainer: {
      backgroundColor: Colors.white,
    },
    flatlist: {
      paddingHorizontal: Spacing.xl,
    },
    bold: {
      ...Fonts.textBold,
    },
    account: {
      ...Layout.row,
      ...Layout.justifyContentBetween,
      marginTop: Spacing.ml,
    },
    cardContainer: {
      ...Layout.center,
      width: 48,
      height: 48,
      borderWidth: 1,
      borderRadius: Spacing.xl,
      borderColor: Colors.inputBlack50,
    },
    card: {
      width: 26,
      height: Spacing.l,
      borderRadius: Spacing.xxs,
      backgroundColor: Colors.textBlack,
    },
    details: {
      ...Layout.fill,
      marginLeft: Spacing.m,
    },
    nameContainer: {
      ...Layout.row,
      ...Layout.alignItemsCenter,
      gap: 8,
    },
    balanceContainer: {
      ...Layout.row,
      ...Layout.justifyContentBetween,
    },
    currencyWrapper: {
      ...Layout.row,
      ...Layout.alignItemsCenter,
      gap: Spacing.xxs,
    },
    currencySignContainer: {
      width: Spacing.xl,
      height: Spacing.xl,
      borderRadius: Spacing.m,
      backgroundColor: Colors.inputBlack50,
      ...Layout.center,
    },
    seeAll: {
      borderWidth: 1,
      borderRadius: 20,
      marginTop: Spacing.xl,
      paddingVertical: Spacing.s,
      ...Layout.alignItemsCenter,
      borderColor: Colors.inputBlack50,
    },
    headerWrapper: {
      marginBottom: Spacing.ml,
    },
    headerContainer: {
      ...Layout.row,
      ...Layout.alignItemsCenter,
      ...Layout.justifyContentBetween,
    },
    iconContainer: {
      width: 40,
      height: 40,
      borderRadius: 20,
      borderWidth: 1,
      borderColor: Colors.inputBlack50,
      ...Layout.center,
    },
  });
};
