import { StyleSheet } from 'react-native';
import { useTheme } from 'hooks';
import { moderateScale } from 'utils/config';

export const useStyles = () => {
  const { Layout, Spacing, Colors, FontFamily } = useTheme();

  return StyleSheet.create({
    wrapper: {
      ...Layout.fill,
      backgroundColor: Colors.white,
      paddingBottom: Spacing.xl,
    },
    container: {
      ...Layout.fill,
      ...Layout.alignItemsCenter,
      paddingVertical: Spacing.xl,
    },
    textInputContainer: {
      ...Layout.row,
      ...Layout.alignItemsCenter,
      marginHorizontal: Spacing.xl,
    },
    input: {
      fontSize: 40,
      height: 65,
      fontFamily: FontFamily.medium,
      marginLeft: Spacing.xxs,
    },
    selected: {
      borderColor: Colors.primary,
      backgroundColor: Colors.secondary,
    },
    currencies: {
      ...Layout.row,
      gap: Spacing.ml,
      marginTop: Spacing.ml,
    },
    currencyContainer: {
      ...Layout.center,
      width: 30,
      height: 30,
      borderWidth: 1,
      borderRadius: 15,
      borderColor: Colors.inputBlack50,
    },
    minimumAmount: {
      backgroundColor: Colors.dashboardBackground,
      paddingHorizontal: Spacing.ml,
      paddingVertical: Spacing.s,
      borderRadius: Spacing.lg,
      marginTop: Spacing.xlg,
    },
    accountsContainer: {
      ...Layout.rowHCenter,
      ...Layout.justifyContentBetween,
      paddingHorizontal: Spacing.m,
      paddingVertical: 22,
      borderTopWidth: 1,
      borderTopColor: Colors.inputBlack50,
    },
    cardIcon: {
      ...Layout.center,
      borderWidth: 1,
      width: moderateScale(Spacing.xxxl),
      height: moderateScale(Spacing.xxxl),
      borderRadius: Spacing.xl,
      borderColor: Colors.inputBlack50,
    },
    account: {
      ...Layout.rowHCenter,
      gap: Spacing.s,
    },
    buttonContainer: {
      paddingHorizontal: Spacing.ml,
    },
    button: {
      paddingVertical: 14,
    },
    alignEnd: {
      ...Layout.alignItemsEnd,
    },
  });
};
