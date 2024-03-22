import { StyleSheet } from 'react-native';
import { useTheme } from 'hooks';

export const useStyles = () => {
  const { Layout, Colors, Spacing } = useTheme();

  return StyleSheet.create({
    badge: {
      ...Layout.row,
      ...Layout.center,
      backgroundColor: Colors.error100,
      gap: Spacing.xxs,
      paddingHorizontal: 5,
      borderRadius: 50,
    },
  });
};
