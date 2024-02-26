import { StyleSheet } from 'react-native';
import { useTheme } from 'hooks';
import { horizontalScale, moderateScale, verticalScale } from 'utils/config';

export const useStyles = () => {
  const { Layout, Colors, Spacing } = useTheme();
  return StyleSheet.create({
    sectionList: {
      backgroundColor: Colors.white,
    },
    contentContainer: {
      backgroundColor: Colors.dashboardBackground,
    },
    container: {
      ...Layout.fill,
    },
    nextPaymentWrapper: {
      backgroundColor: Colors.white,
      paddingHorizontal: moderateScale(Spacing.xl),
      paddingVertical: Spacing.xlg,
      borderTopLeftRadius: Spacing.xl,
      borderTopRightRadius: Spacing.xl,
    },
    nextPaymentContainer: {
      ...Layout.row,
      backgroundColor: Colors.dashboardBackground,
      borderRadius: Spacing.m,
      paddingVertical: Spacing.lg,
      gap: moderateScale(Spacing.m),
      paddingHorizontal: Spacing.ml,
    },
    nextIcon: {
      ...Layout.center,
      width: moderateScale(48),
      height: moderateScale(48),
      borderRadius: Spacing.xl,
      backgroundColor: Colors.white,
    },
    nextPaymentDate: {
      ...Layout.row,
      ...Layout.alignItemsCenter,
      gap: Spacing.s,
    },
    actionButtonsContainer: {
      gap: Spacing.xl,
    },
    nextPaymentContent: {
      marginLeft: horizontalScale(60),
      borderTopWidth: 1,
      borderTopColor: Colors.inputBlack50,
      paddingTop: 6,
    },
    nextPaymentDetails: {
      ...Layout.rowHCenter,
      ...Layout.justifyContentBetween,
      marginTop: 3,
    },
    details: {
      backgroundColor: Colors.white,
      paddingHorizontal: Spacing.xl,
      paddingVertical: Spacing.xlg,
    },
    borderTopRadius: {
      borderTopLeftRadius: Spacing.xl,
      borderTopRightRadius: Spacing.xl,
    },
    agreementButton: {
      borderWidth: 1,
      borderRadius: 52,
      ...Layout.alignItemsCenter,
      borderColor: Colors.inputBlack50,
      paddingVertical: verticalScale(16),
      marginTop: verticalScale(32),
    },
    innerContainer: {
      ...Layout.rowHCenter,
      gap: Spacing.md,
    },
    card: {
      ...Layout.justifyContentBetween,
      borderRadius: Spacing.m,
      width: horizontalScale(340),
      backgroundColor: Colors.white,
      padding: moderateScale(30),
      height: 200,
    },
    header: {
      ...Layout.rowHCenter,
      gap: 14,
    },
    iconContainer: {
      width: 48,
      height: 48,
      borderWidth: 1,
      borderRadius: Spacing.xl,
      borderColor: Colors.inputBlack50,
    },
    footer: {
      padding: 6,
      borderRadius: 80,
      ...Layout.row,
      ...Layout.center,
      backgroundColor: Colors.inputBlack50,
    },
    progressbarWrapper: {
      marginTop: Spacing.xxs,
    },
    progressbarContainer: {
      ...Layout.rowHCenter,
      ...Layout.justifyContentBetween,
    },
    titleContainer: {
      ...Layout.center,
    },
    collapsibleHeaderWrapper: {
      height: 60,
      borderBottomWidth: 1,
      ...Layout.justifyContentCenter,
      borderBottomColor: Colors.inputBlack50,
    },
    collapsibleHeader: {
      ...Layout.rowHCenter,
      ...Layout.justifyContentBetween,
      paddingRight: 10,
    },
    collapsibleContent: {
      borderRadius: Spacing.zero,
      paddingHorizontal: Spacing.zero,
    },
    overdueWrapper: {
      marginVertical: 10,
    },
    totalDebtWrapper: {
      marginTop: 10,
    },
    actionButtons: {
      ...Layout.justifyContentBetween,
    },
    alignEnd: {
      ...Layout.alignSelfEnd,
    },
    fill: {
      ...Layout.fill,
    },
  });
};
