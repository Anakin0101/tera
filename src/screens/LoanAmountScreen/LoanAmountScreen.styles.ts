import { Platform, StyleSheet } from 'react-native';
import { useTheme } from 'hooks';
import { config } from 'utils/config';
import { CIRCULAR_ITEM_SIZE } from 'constants/common';

const ITEM_SPACING = (config.mobileWidth - CIRCULAR_ITEM_SIZE) / 2;

export const useStyles = () => {
  const { Layout, Colors, Spacing, Fonts } = useTheme();

  return StyleSheet.create({
    container: {
      ...Layout.fill,
      backgroundColor: Colors.white,
    },
    headerContainer: {
      marginHorizontal: Spacing.xl,
      marginTop: Spacing.ml,
    },
    headerInner: {
      ...Layout.rowHCenter,
      ...Layout.justifyContentBetween,
    },
    amountContainer: {
      ...Layout.alignItemsCenter,
      marginTop: 50,
    },
    textInputContainer: {
      ...Layout.row,
      ...Layout.alignItemsCenter,
      marginHorizontal: Spacing.xl,
    },
    input: {
      fontSize: 40,
      height: 65,
      ...Fonts.medium,
      marginRight: Spacing.xxs,
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
    currency: {
      ...Platform.select({
        android: { marginTop: 2 },
        ios: { marginTop: 5 },
      }),
    },
    selected: {
      borderColor: Colors.primary,
      backgroundColor: Colors.secondary,
    },
    minMaxContainer: {
      ...Layout.center,
      ...Layout.row,
      marginHorizontal: Spacing.xl,
      marginTop: Spacing.xl,
      gap: Spacing.m,
    },
    minimum: {
      backgroundColor: Colors.dashboardBackground,
      paddingHorizontal: Spacing.ml,
      paddingVertical: Spacing.s,
      borderRadius: Spacing.lg,
    },
    loadDuration: {
      marginTop: 50,
    },
    durationContentContainer: {
      paddingHorizontal: ITEM_SPACING,
    },
    list: {
      marginTop: Spacing.ml,
    },
    inputContainer: {
      ...Layout.center,
      ...Layout.selfCenter,
      marginTop: Spacing.ml,
      borderRadius: Spacing.m,
      borderColor: Colors.paleGray,
      borderWidth: 1,
      width: 70,
      height: 50,
    },
    periodInput: {
      width: 40,
      height: 50,
      color: Colors.textBlack500,
    },
    buttonContainer: {
      marginHorizontal: Spacing.xl,
      marginTop: 50,
    },
    button: {
      paddingVertical: 14,
    },
    disabled: {
      opacity: 0.5,
    },
    scrollView: {
      ...Layout.fill,
    },
  });
};
