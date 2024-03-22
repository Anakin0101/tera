import { StyleSheet } from 'react-native';
import { useTheme } from 'hooks';

export const useStyles = () => {
  const { Layout, Spacing } = useTheme();
  return StyleSheet.create({
    row: {
      ...Layout.row,
    },
    marginTopLg: {
      marginTop: Spacing.lg,
    },
  });
};
