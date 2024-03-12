import { StyleSheet } from 'react-native';
import { useTheme } from 'hooks';

export const useStyles = () => {
  const { Colors, Layout, Spacing, Fonts, FontSize } = useTheme();

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
      ...Fonts.medium,
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
      marginTop: Spacing.ml,
      marginHorizontal: Spacing.xl,
    },
    itemIconWrapper: {
      width: 48,
      height: 48,
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
      letterSpacing: -0.2,
      color: Colors.textBlack,
      ...Fonts.medium,
      lineHeight: 24,
    },
    itemDesc: {
      fontSize: FontSize.tiny,
      lineHeight: 12,
      letterSpacing: -0.5,
      color: Colors.textBlack500,
      ...Fonts.regular,
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
      ...Fonts.medium,
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
      ...Fonts.medium,
    },
    contentContainer: {
      ...Layout.row,
      ...Layout.fill,
      ...Layout.center,
    },
  });
};
