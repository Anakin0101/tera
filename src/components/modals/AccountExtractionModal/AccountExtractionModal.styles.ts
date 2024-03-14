import { StyleSheet } from 'react-native';
import useTheme from 'hooks/useTheme';
import { Spacing } from 'theme/Variables';
import { COLLAPSIBLE_ACCOUNT_HEIGHT } from 'constants/common';

export const useStyles = () => {
  const { Layout, Colors } = useTheme();

  return StyleSheet.create({
    main: {
      ...Layout.fill,
    },
    title: {
      ...Layout.row,
      ...Layout.justifyContentBetween,
      paddingVertical: Spacing.ml,
      paddingHorizontal: 26,
    },
    collapsibleContainer: {
      borderRadius: Spacing.m,
      borderColor: Colors.inputBlack50,
      borderWidth: 1,
      paddingTop: Spacing.m,
      paddingHorizontal: Spacing.xl,
      marginHorizontal: Spacing.xl,
    },
    collapsibleHeader: {
      ...Layout.rowHCenter,
    },
    accountsContainer: {
      marginTop: Spacing.md,
    },
    accountItem: {
      ...Layout.rowHCenter,
      ...Layout.justifyContentBetween,
      height: COLLAPSIBLE_ACCOUNT_HEIGHT,
    },
    image: {
      width: 44,
      height: Spacing.xlm,
      borderRadius: Spacing.xxs,
    },
    accountInfo: {
      ...Layout.fill,
      ...Layout.rowHCenter,
      ...Layout.justifyContentBetween,
      marginLeft: Spacing.ml,
    },
    dateContainer: {
      ...Layout.rowHCenter,
      ...Layout.justifyContentBetween,
      gap: Spacing.l,
      marginHorizontal: Spacing.xl,
      marginTop: 10,
    },
    date: {
      ...Layout.fill,
      borderBottomWidth: 1,
      borderBottomColor: Colors.inputBlack50,
      paddingBottom: Spacing.s,
    },
    flatlist: {
      marginVertical: Spacing.xl,
      marginHorizontal: Spacing.xl,
    },
    contentContainer: {
      gap: Spacing.s,
    },
    template: {
      paddingVertical: Spacing.s,
      paddingHorizontal: Spacing.ml,
      borderWidth: 1,
      borderColor: Colors.inputBlack50,
      borderRadius: Spacing.xlm,
    },
    selected: {
      borderColor: Colors.primary,
      backgroundColor: Colors.secondary,
    },
    footer: {
      borderTopWidth: 1,
      borderTopColor: Colors.inputBlack50,
      margin: Spacing.xl,
    },
    docFormat: {
      ...Layout.row,
      marginTop: Spacing.xl,
      ...Layout.justifyContentEvenly,
    },
    format: {
      ...Layout.row,
      ...Layout.center,
      width: 140,
      height: 42,
      borderWidth: 1,
      gap: Spacing.m,
      borderRadius: Spacing.xl,
      borderColor: Colors.inputBlack50,
    },
    downloadBtn: {
      marginTop: Spacing.xl,
      paddingVertical: 14,
    },
    disabled: {
      opacity: 0.5,
    },
    itemWrapper: {
      marginHorizontal: Spacing.xl,
    },
    sectionHeader: {
      margin: Spacing.xl,
    },
    sectionListWrapper: {
      marginTop: Spacing.lg,
    },
    noTransactionsWrapper: {
      ...Layout.center,
      marginTop: Spacing.xxxl,
    },
    noTransactionsText: {
      marginTop: Spacing.xlm,
    },
  });
};
