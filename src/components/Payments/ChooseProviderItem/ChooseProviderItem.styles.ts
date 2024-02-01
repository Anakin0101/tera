import { StyleSheet } from 'react-native';
import { useTheme } from 'hooks';
import { FontFamily, FontSize } from 'theme/Variables';

export const useStyles = () => {
  const { Colors, Layout, Spacing } = useTheme();

  return StyleSheet.create({
    wrapper: {
      backgroundColor: Colors.white,
      marginTop: Spacing.xxs,
      borderTopRightRadius: Spacing.m,
      borderTopLeftRadius: Spacing.m,
      paddingVertical: Spacing.xl,
    },
    mainTitle: {
      fontSize: FontSize.regularPlus,
      color: Colors.black,
      letterSpacing: -0.5,
      fontFamily: FontFamily.medium,
      paddingHorizontal: Spacing.xl,
    },
    listWrapper: {
      paddingHorizontal: Spacing.xl,
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
      flex: 1,
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
    allButton: {
      backgroundColor: Colors.white,
      marginTop: Spacing.lg,
      borderWidth: 1,
      borderRadius: 28,
      borderColor: Colors.borderColor,
    },
    allButtonText: {
      fontSize: FontSize.small,
      lineHeight: 20,
      letterSpacing: -0.2,
      fontFamily: FontFamily.medium,
      marginTop: Spacing.xxs,
    },
    headerButtonsWrapper: {
      ...Layout.row,
      ...Layout.alignItemsCenter,
      ...Layout.justifyContentBetween,
      paddingHorizontal: Spacing.xl,
    },
    addTemplateButton: {
      ...Layout.row,
      ...Layout.alignItemsCenter,
      gap: Spacing.xxs,
      backgroundColor: Colors.pink,
      paddingHorizontal: Spacing.m,
      paddingVertical: Spacing.s,
      borderRadius: 28,
    },
    addTemplateText: {
      letterSpacing: -0.2,
      fontSize: FontSize.small,
      lineHeight: 20,
      fontFamily: FontFamily.medium,
    },
    iconStyle: {
      width: 30,
      height: 30,
    },
  });
};
