import { StyleSheet } from 'react-native';
import { useTheme } from 'hooks';

export const useStyles = () => {
  const { Layout, Colors, Spacing } = useTheme();

  return StyleSheet.create({
    badge: {
      ...Layout.row,
      ...Layout.alignItemsCenter,
      backgroundColor: Colors.error100,
      gap: Spacing.xxs,
      padding: 5,
      minWidth: 100,
      borderRadius: 50,
    },
  });
};
