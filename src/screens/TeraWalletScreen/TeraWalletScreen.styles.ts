import { StyleSheet } from 'react-native';
import { useTheme } from 'hooks';
import { config } from 'utils/config';

const ITEM_SIZE = 86;
const ITEM_SPACING = (config.mobileWidth - ITEM_SIZE) / 2;

export const useStyles = () => {
  const { Layout, Colors, Spacing, FontFamily } = useTheme();

  return StyleSheet.create({
    scrollView: {
      backgroundColor: Colors.white,
    },
    container: {
      marginHorizontal: Spacing.xl,
    },
    iconContainer: {
      ...Layout.center,
      ...Layout.selfCenter,
      width: 100,
      height: 100,
      borderRadius: 50,
      borderWidth: 1,
      borderColor: Colors.inputBlack50,
      marginTop: Spacing.xxl,
    },
    selectAmount: {
      marginTop: Spacing.ml,
    },
    selectAmountContentContainer: {
      paddingHorizontal: ITEM_SPACING,
    },
    itemWrapper: {
      ...Layout.center,
      width: 86,
      height: 86,
    },
    itemContainer: {
      ...Layout.center,
      width: 70,
      height: 70,
      borderRadius: 35,
      borderWidth: 1,
    },
    itemText: {
      textAlign: 'center',
      fontSize: Spacing.ml,
      fontFamily: FontFamily.Regular,
    },
    inputContainer: {
      ...Layout.row,
      ...Layout.center,
      ...Layout.selfCenter,
      marginTop: Spacing.xs,
      borderRadius: Spacing.m,
      borderColor: Colors.paleGray,
      borderWidth: 1,
      width: 70,
      height: 50,
    },
    input: {
      width: 40,
      height: 50,
    },
    footerIconContainer: {
      width: Spacing.xxxl,
      height: Spacing.xxxl,
      borderRadius: Spacing.xl,
      borderWidth: 1,
      borderColor: Colors.inputBlack50,
    },
    selectDeposit: {
      ...Layout.row,
      gap: Spacing.m,
      marginHorizontal: Spacing.xl,
      marginVertical: Spacing.ml,
    },
    selectDepositInner: {
      ...Layout.fill,
      ...Layout.rowHCenter,
      ...Layout.justifyContentBetween,
    },
    buttonContainer: {
      marginHorizontal: Spacing.xl,
      marginBottom: Spacing.xl,
    },
    button: {
      paddingVertical: 14,
    },
  });
};
