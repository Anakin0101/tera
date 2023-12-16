import useTheme from 'hooks/useTheme';
import { StyleSheet } from 'react-native';
import { moderateScale } from 'utils/config';

export const useStyles = () => {
  const { Colors, FontFamily, Spacing, Layout } = useTheme();
  return StyleSheet.create({
    buttonsContainer: {
      ...Layout.rowHCenter,
      gap: Spacing.md,
      marginTop: 30,
    },
    buttonWrapper: {
      ...Layout.fill,
      paddingVertical: moderateScale(16),
    },
    buttonLabel: {
      fontFamily: FontFamily.medium,
    },
    outline: {
      width: Spacing.lg,
      height: Spacing.lg,
      borderWidth: Spacing.xxxs,
      borderRadius: Spacing.m,
      ...Layout.center,
      borderColor: Colors.textBlack400,
    },
    inner: {
      width: Spacing.md,
      height: Spacing.md,
      borderRadius: 5,
      backgroundColor: Colors.primary,
    },
    selected: {
      borderColor: Colors.primary,
    },
    account: {
      ...Layout.rowHCenter,
      ...Layout.justifyContentBetween,
    },
    currencyModal: {
      marginTop: Spacing.xlg,
    },
    currencyContainer: {
      ...Layout.rowHCenter,
      gap: Spacing.m,
    },
    ccy: {
      paddingHorizontal: Spacing.xl,
      paddingVertical: Spacing.s,
      borderWidth: 1,
      borderColor: Colors.inputBlack50,
      borderRadius: Spacing.xlm,
    },
    selectedItem: {
      borderColor: Colors.primary,
      backgroundColor: Colors.secondary,
    },
    title: {
      ...Layout.rowHCenter,
      ...Layout.justifyContentBetween,
    },
    transactionTypeModal: {
      ...Layout.row,
      ...Layout.flexWrap,
      gap: Spacing.s,
      marginTop: Spacing.xl,
    },
    type: {
      paddingVertical: Spacing.m,
      paddingHorizontal: Spacing.ml,
      borderWidth: 1,
      borderColor: Colors.inputBlack50,
      borderRadius: Spacing.xlm,
    },
    filterByDateWrapper: {
      marginTop: Spacing.xl,
    },
    dateContainer: {
      ...Layout.rowHCenter,
      ...Layout.justifyContentBetween,
      gap: Spacing.l,
    },
    date: {
      ...Layout.fill,
      borderBottomWidth: 1,
      borderBottomColor: Colors.inputBlack50,
      paddingBottom: Spacing.s,
    },
    intervalScrollView: {
      marginVertical: Spacing.xl,
    },
    intervalContent: {
      gap: Spacing.s,
    },
    calendar: {
      marginTop: Spacing.m,
    },
  });
};
