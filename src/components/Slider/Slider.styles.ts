import { StyleSheet } from 'react-native';
import { useTheme } from 'hooks';

export const useStyles = () => {
  const { Layout, Colors, Spacing } = useTheme();

  return StyleSheet.create({
    contentContainer: {
      gap: Spacing.m,
      paddingHorizontal: 36,
    },
    slider: {
      backgroundColor: Colors.dashboardBackground,
      paddingVertical: Spacing.xl,
    },
    actionButtonsContainer: {
      ...Layout.row,
      ...Layout.justifyContentCenter,
      marginTop: Spacing.xlg,
      marginHorizontal: 30,
    },
    actionWrapper: {
      ...Layout.alignItemsCenter,
    },
    iconContainer: {
      width: 56,
      height: 56,
      borderRadius: 28,
      backgroundColor: Colors.white,
      ...Layout.center,
    },
    iconUpdateContainer: {
      width: 56,
      height: 56,
      borderRadius: 28,
      backgroundColor: Colors.white,
      ...Layout.center,
    },
    actionButtonLabel: {
      // maxWidth: 85,
      marginTop: Spacing.m,
    },
  });
};
