import { StyleSheet } from 'react-native';
import { useTheme } from 'hooks';
import { verticalScale } from 'utils/config';

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
    details: {
      backgroundColor: Colors.white,
      borderTopLeftRadius: Spacing.xl,
      borderTopRightRadius: Spacing.xl,
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
  });
};
