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
    nextWrapper: {
      backgroundColor: Colors.white,
      paddingHorizontal: Spacing.xl,
      paddingVertical: Spacing.xlg,
      borderTopLeftRadius: Spacing.xl,
      borderTopRightRadius: Spacing.xl,
    },
    nextPaymentContainer: {
      ...Layout.row,
      backgroundColor: Colors.dashboardBackground,
      borderRadius: Spacing.m,
      paddingHorizontal: Spacing.ml,
      paddingVertical: Spacing.lg,
      gap: Spacing.m,
    },
    nextIcon: {
      ...Layout.center,
      width: moderateScale(48),
      height: moderateScale(48),
      borderRadius: Spacing.xl,
      backgroundColor: Colors.white,
    },
    nextDetails: {
      ...Layout.fill,
      ...Layout.rowHCenter,
      ...Layout.justifyContentBetween,
    },
    nextDate: {
      ...Layout.row,
      ...Layout.alignItemsCenter,
      gap: Spacing.s,
    },
    actionButtonsContainer: {
      gap: Spacing.ml,
    },

    details: {
      backgroundColor: Colors.white,
      // borderTopLeftRadius: Spacing.xl,
      // borderTopRightRadius: Spacing.xl,
      paddingHorizontal: Spacing.xl,
      paddingVertical: Spacing.xlg,
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
      padding: 26,
      borderRadius: Spacing.m,
      backgroundColor: Colors.titleBlack,
      width: horizontalScale(340),
      height: 200,
    },
    depositItem: {
      backgroundColor: Colors.white,
      padding: Spacing.xlg,
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
  });
};
