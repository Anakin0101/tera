import { StyleSheet } from 'react-native';
import { useTheme } from 'hooks';
import { FontFamily, FontSize } from 'theme/Variables';

export const useStyles = () => {
  const { Colors, Layout, Spacing } = useTheme();

  return StyleSheet.create({
    swipeableWrapper: {
      paddingHorizontal: Spacing.xl,
      backgroundColor: Colors.white,
    },
    itemWrapper: {
      ...Layout.row,
      ...Layout.alignItemsCenter,
      marginLeft: Spacing.m,
    },
    itemWrapperContainer: {
      ...Layout.row,
      ...Layout.justifyContentBetween,
      ...Layout.alignItemsCenter,
    },
    itemContainer: {
      ...Layout.row,
      ...Layout.alignItemsCenter,
      marginRight: Spacing.xl,
      ...Layout.fill,
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
    contentWrapper: {
      ...Layout.fill,
    },
    contentBorder: {
      borderBottomWidth: 1,
      borderColor: Colors.borderColor,
      marginTop: Spacing.m,
      marginHorizontal: Spacing.xl,
      marginBottom: Spacing.ml,
    },
    itemTitle: {
      fontSize: FontSize.small,
      letterSpacing: -0.5,
      color: Colors.textBlack,
      fontFamily: FontFamily.medium,
      lineHeight: 16,
    },
    itemDesc: {
      fontSize: FontSize.tiny,
      lineHeight: 12,
      letterSpacing: -0.5,
      fontWeight: '400',
      color: Colors.textBlack,
      fontFamily: FontFamily.medium,
      marginTop: Spacing.xxs,
    },
    swipeableButton: {
      width: 40,
      height: 40,
      ...Layout.center,
      borderWidth: 1,
      borderRadius: 40,
      borderColor: Colors.borderColor,
      marginLeft: Spacing.xl,
      marginTop: Spacing.s,
    },
    editBtnWrapper: {
      marginRight: Spacing.xl,
    },
    statusWrapper: {
      ...Layout.row,
      ...Layout.alignItemsCenter,
      marginRight: Spacing.xl,
      borderRadius: 100,
      paddingHorizontal: Spacing.s,
      paddingVertical: Spacing.xs,
    },
    statusLabel: {
      fontSize: FontSize.tiny,
      letterSpacing: -0.5,
      color: Colors.textBlack,
      fontFamily: FontFamily.medium,
      lineHeight: 20,
      marginLeft: Spacing.xs,
    },
    closeWrapper: {
      width: 16,
      height: 16,
      ...Layout.center,
      borderRadius: 100,
      backgroundColor: Colors.error,
    },
  });
};
