import { StyleSheet } from 'react-native';
import { useDefaultHeaderHeight, useTheme } from 'hooks';
import { config, moderateScale } from 'utils/config';

export const useStyles = () => {
  const { Layout, Spacing, Colors, FontFamily } = useTheme();
  const { headerHeight } = useDefaultHeaderHeight();

  return StyleSheet.create({
    container: {
      marginHorizontal: Spacing.xl,
    },
    inputContaner: {
      ...Layout.rowHCenter,
      backgroundColor: Colors.white,
      paddingHorizontal: Spacing.ml,
      height: 40,
      borderRadius: 40,
    },
    input: {
      marginHorizontal: Spacing.s,
      fontFamily: FontFamily.Regular,
    },
    scrollView: {
      marginTop: Spacing.xl,
    },
    contentContainer: {
      gap: Spacing.s,
    },
    filterItem: {
      paddingHorizontal: Spacing.ml,
      paddingVertical: Spacing.s,
      backgroundColor: Colors.white,
      borderRadius: 40,
    },
    totalsContainer: {
      ...Layout.row,
      marginTop: Spacing.xl,
      gap: Spacing.m,
    },
    total: {
      ...Layout.fill,
      paddingVertical: Spacing.l,
      paddingHorizontal: Spacing.lg,
      borderRadius: Spacing.m,
    },
    sectionListWrapper: {
      ...Layout.overflowHidden,
      marginTop: Spacing.lg,
      width: config.mobileWidth,
      borderTopLeftRadius: Spacing.xl,
      borderTopRightRadius: Spacing.xl,
      borderColor: Colors.white,
      backgroundColor: Colors.white,
      minHeight: config.mobileHeight - headerHeight - 240,
    },
    sectionHeader: {
      margin: Spacing.xl,
    },
    itemWrapper: {
      marginHorizontal: Spacing.xl,
    },
    headerContainer: {
      marginHorizontal: Spacing.xl,
      marginTop: Spacing.l,
    },
    listWrapper: {
      ...Layout.overflowHidden,
      borderTopLeftRadius: Spacing.xl,
      borderTopRightRadius: Spacing.xl,
      borderColor: Colors.white,
    },
    buttonsContainer: {
      ...Layout.rowHCenter,
      gap: Spacing.md,
      marginTop: 30,
    },
    buttonWrapper: {
      ...Layout.fill,
      paddingVertical: moderateScale(16),
    },
    buttonLabel: {
      fontFamily: FontFamily.medium,
    },
    outline: {
      width: Spacing.lg,
      height: Spacing.lg,
      borderWidth: Spacing.xxxs,
      borderRadius: Spacing.m,
      ...Layout.center,
      borderColor: Colors.textBlack400,
    },
    inner: {
      width: Spacing.md,
      height: Spacing.md,
      borderRadius: 5,
      backgroundColor: Colors.primary,
    },
    selected: {
      borderColor: Colors.primary,
    },
    account: {
      ...Layout.rowHCenter,
      ...Layout.justifyContentBetween,
    },
    indicator: {
      marginTop: Spacing.xl,
      height: config.mobileHeight - headerHeight - 205,
    },
    listFooter: {
      height: 50,
      backgroundColor: Colors.white,
    },
  });
};
