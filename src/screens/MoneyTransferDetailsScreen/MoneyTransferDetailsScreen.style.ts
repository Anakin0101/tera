import useTheme from 'hooks/useTheme';
import { StyleSheet } from 'react-native';
import { FontFamily, FontSize } from 'theme/Variables';

export const useStyles = () => {
  const { Colors, Spacing, Layout } = useTheme();

  return StyleSheet.create({
    container: {
      paddingBottom: Spacing.xxxl,
    },
    headerTitle: {
      fontSize: FontSize.small,
      letterSpacing: -0.5,
      color: Colors.inactiveTint,
      fontFamily: FontFamily.main,
      textTransform: 'capitalize',
    },
    itemIconWrapper: {
      width: 56,
      height: 56,
      ...Layout.justifyContentCenter,
      ...Layout.alignItemsCenter,
      borderRadius: 50,
      borderWidth: 1,
      borderColor: Colors.borderColor,
      marginRight: Spacing.m,
    },
    amountLabel: {
      fontSize: FontSize.extraLarge,
      lineHeight: 36,
      letterSpacing: -0.5,
      color: Colors.error,
      fontFamily: FontFamily.main,
    },
    iconStyle: {
      width: 40,
      height: 40,
      resizeMode: 'contain',
    },
    wrapper: {
      backgroundColor: Colors.white,
      marginTop: Spacing.xxl,
      marginHorizontal: Spacing.xl,
      borderRadius: 10,
      padding: Spacing.xlg,
    },
    headerInfoWrapper: {
      ...Layout.row,
    },
    dateLabel: {
      fontSize: FontSize.tiny,
      letterSpacing: -0.5,
      lineHeight: 16,
      color: Colors.inactiveTint,
      fontFamily: FontFamily.main,
      textTransform: 'capitalize',
    },
    transferNumber: {
      fontSize: FontSize.regular,
      letterSpacing: -0.5,
      lineHeight: 24,
      color: Colors.textBlack,
      fontFamily: FontFamily.main,
      textTransform: 'capitalize',
    },
    actionWrapper: {
      ...Layout.row,
      ...Layout.justifyContentBetween,
      ...Layout.alignItemsCenter,
    },
    copyIconWrapper: {
      marginRight: 0,
    },
    itemDesc: {
      fontSize: FontSize.regular,
      lineHeight: 20,
      letterSpacing: -0.5,
      fontWeight: '400',
      color: Colors.textBlack,
      fontFamily: FontFamily.main,
      marginTop: Spacing.xxs,
      marginLeft: Spacing.xl,
    },
    pending: {
      color: Colors.yellow,
    },
    rejected: {
      color: Colors.red,
    },
    success: {
      color: Colors.success,
    },
    detailsLabel: {
      marginTop: Spacing.xxl,
      marginLeft: Spacing.xl,
      fontSize: FontSize.regularPlus,
      lineHeight: 22,
      letterSpacing: -0.5,
      fontWeight: '400',
      color: Colors.textBlack,
      fontFamily: FontFamily.main,
    },
    itemDescTitle: {
      marginLeft: Spacing.xl,
      marginTop: Spacing.xl,
      color: Colors.accountText500,
    },
  });
};
