import { useTheme } from 'hooks';
import { StyleSheet } from 'react-native';

export const useStyles = () => {
  const { Colors, Spacing, Layout } = useTheme();

  return StyleSheet.create({
    container: {
      ...Layout.overflowHidden,
      backgroundColor: Colors.dashboardBackground,
      borderRadius: Spacing.m,
      paddingHorizontal: Spacing.ml,
    },
    headerWrapper: {
      ...Layout.row,
      ...Layout.alignItemsCenter,
      ...Layout.justifyContentCenter,
    },
    headerContainer: {
      ...Layout.fill,
    },
  });
};
