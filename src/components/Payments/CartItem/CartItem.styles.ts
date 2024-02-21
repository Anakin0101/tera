import { StyleSheet } from 'react-native';
import { useTheme } from 'hooks';
import { FontFamily, FontSize } from 'theme/Variables';

export const useStyles = () => {
  const { Colors, Layout, Spacing } = useTheme();

  return StyleSheet.create({
    listWrapper: {
      marginTop: Spacing.xlm,
    },
    itemWrapper: {
      ...Layout.row,
      ...Layout.alignItemsCenter,
    },
    itemWrapperMargin: {
      marginBottom: Spacing.m,
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
      marginLeft: 68,
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
    swipeableWrapper: {
      paddingHorizontal: Spacing.xl,
      backgroundColor: Colors.white,
    },
    swipeableButtonsWrapper: {
      ...Layout.row,
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
  });
};
