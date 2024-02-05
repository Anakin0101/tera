import useTheme from 'hooks/useTheme';
import { StyleSheet } from 'react-native';
import { Colors, FontFamily, FontSize } from 'theme/Variables';

export const useStyles = () => {
  const { Spacing, Layout } = useTheme();
  return StyleSheet.create({
    container: {
      ...Layout.fill,
      backgroundColor: Colors.white,
    },
    headerTitleStyle: {
      fontSize: FontSize.regular,
      lineHeight: 24,
      letterSpacing: 0.2,
      fontFamily: FontFamily.DemiBold,
      color: Colors.black700,
      marginLeft: -44,
    },
    headerWrapper: {
      ...Layout.row,
      marginTop: Spacing.md,
      alignItems: 'center',
    },
    titleWrapper: {
      flex: 1,
      alignItems: 'center',
    },
    itemWrapper: {
      paddingTop: Spacing.xlg,
      backgroundColor: Colors.white,
    },
    listWrapper: {
      paddingBottom: Spacing.xxl,
    },
    accountName: {
      fontSize: FontSize.regular,
      lineHeight: 24,
      letterSpacing: -0.5,
      fontFamily: FontFamily.DemiBold,
      color: Colors.black700,
      marginLeft: Spacing.xl,
      marginBottom: Spacing.ml,
    },
    accountWrapper: {
      ...Layout.row,
      marginHorizontal: Spacing.xl,
      paddingVertical: Spacing.ml,
    },
    cardWapper: {
      width: 48,
      height: 48,
      borderRadius: 40,
      borderWidth: 1,
      borderColor: Colors.borderColor,
      marginRight: Spacing.m,
      ...Layout.center,
    },
    card: {
      width: 26,
      height: 17,
      backgroundColor: Colors.black700,
      borderRadius: 4,
    },
    accountContent: {
      ...Layout.fill,
      ...Layout.row,
      ...Layout.justifyContentBetween,
      ...Layout.alignItemsCenter,
    },
    accountContentWrapper: {
      ...Layout.fill,
    },
    accountIban: {
      fontSize: FontSize.small,
      lineHeight: 16,
      letterSpacing: -0.5,
      fontFamily: FontFamily.medium,
      color: Colors.textBlack500,
    },
    moneyLabel: {
      marginTop: Spacing.xxs,
      fontSize: FontSize.regular,
      lineHeight: 24,
      letterSpacing: -0.5,
      fontFamily: FontFamily.medium,
      color: Colors.black,
    },
    selectedWrapper: {
      ...Layout.center,
    },
    loadingWrapper: {
      flex: 0.7,
    },
  });
};
