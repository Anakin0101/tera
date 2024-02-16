import useTheme from 'hooks/useTheme';
import { StyleSheet } from 'react-native';

export const useStyles = () => {
  const { Spacing, Layout, FontSize, FontFamily, Colors } = useTheme();
  const baseItemStyle = {
    backgroundColor: Colors.white,
    paddingHorizontal: Spacing.xl,
    paddingBottom: Spacing.lg,
  };
  return StyleSheet.create({
    mainWrapper: {
      minHeight: 153,
      backgroundColor: Colors.skeleton,
      marginHorizontal: Spacing.xlm,
      borderRadius: Spacing.m,
      padding: Spacing.lg,
      marginTop: Spacing.xxl,
    },
    iconWrapper: {
      width: 48,
      height: 48,
      marginRight: Spacing.m,
    },
    cardNameMain: {
      ...Layout.justifyContentBetween,
      ...Layout.row,
      ...Layout.alignItemsCenter,
    },
    cardnameWrapper: {
      ...Layout.rowHCenter,
    },
    statusWrapper: {
      ...Layout.center,
      height: 28,
      width: 80,
      backgroundColor: Colors.successToastTextColor,
      borderRadius: Spacing.lg,
    },
    statusText: {
      color: Colors.white,
      fontSize: FontSize.tiny,
      lineHeight: Spacing.lg,
      fontFamily: FontFamily.medium,
    },
    cardName: {
      color: Colors.textBlack,
      fontSize: FontSize.regular,
      fontFamily: FontFamily.medium,
      marginRight: Spacing.s,
    },
    commission: {
      color: Colors.accountText500,
      fontSize: FontSize.small,
      fontFamily: FontFamily.medium,
    },
    firstItemStyle: {
      ...baseItemStyle,
      borderTopRightRadius: Spacing.xl,
      borderTopLeftRadius: Spacing.xl,
      marginTop: Spacing.xlg,
    },
    regularItemStyle: {
      ...baseItemStyle,
    },
    container: {
      ...Layout.rowCenter,
    },
    button: {
      marginHorizontal: Spacing.md,
      paddingVertical: Spacing.s,
      paddingHorizontal: Spacing.ml,
      borderRadius: Spacing.xlm,
    },
    activeButton: {
      backgroundColor: Colors.primaryToggleButtonCollor,
      borderColor: Colors.primary,
      borderWidth: Spacing.xxxs,
    },
    inactiveButton: {
      backgroundColor: Colors.white,
      borderColor: Colors.inputBlack50,
      borderWidth: 1,
    },
    buttonText: {
      fontSize: FontSize.small,
      fontFamily: FontFamily.medium,
    },
    buttonActiveText: {
      color: Colors.primary,
    },
    inactiveButtontext: {
      color: Colors.textBlack,
    },
    singleCardName: {
      color: Colors.textBlack500,
      fontSize: FontSize.regular,
      fontFamily: FontFamily.medium,
    },
    text: {
      color: Colors.textBlack500,
      fontSize: FontSize.small,
      fontFamily: FontFamily.medium,
    },
    marginBottom: {
      marginBottom: Spacing.l,
    },
    descWrapper: {
      marginTop: Spacing.xlg,
    },
    paytypeWrapper: {
      marginBottom: Spacing.ml,
      marginTop: Spacing.xlm,
    },
    centredView: {
      ...Layout.alignItemsCenter,
    },
    successTextView: {
      marginTop: Spacing.xlg,
      paddingHorizontal: Spacing.xlm,
    },
    changeTextView: {
      marginTop: Spacing.lg,
      marginBottom: Spacing.xxl,
    },
    successText: {
      color: Colors.textBlack,
      fontSize: FontSize.large,
      fontFamily: FontFamily.DemiBold,
      textAlign: 'center',
      lineHeight: 34,
    },
    changeText: {
      color: Colors.greyText,
      fontSize: FontSize.small,
      fontFamily: FontFamily.medium,
    },
    linkContainer: {
      ...Layout.rowHCenter,
    },
    chechboxContainer: {
      ...Layout.rowHCenter,
      marginBottom: Spacing.xl,
    },
    label: {
      color: Colors.accountText500,
      fontSize: FontSize.small,
      fontFamily: FontFamily.medium,
    },
    price: {
      color: Colors.tariffPrice,
      fontFamily: FontFamily.medium,
      fontSize: FontSize.small,
    },
  });
};
