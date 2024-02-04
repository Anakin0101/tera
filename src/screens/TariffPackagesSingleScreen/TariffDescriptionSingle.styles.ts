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
      paddingTop: Spacing.xxl,
    },
    regularItemStyle: {
      ...baseItemStyle,
    },
  });
};
