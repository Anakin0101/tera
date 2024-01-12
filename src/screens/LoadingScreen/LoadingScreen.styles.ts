import { StyleSheet } from 'react-native';
import { useTheme } from 'hooks';

export const useStyles = () => {
  const { Layout, Colors } = useTheme();

  return StyleSheet.create({
    loadingSpinner: {
      ...Layout.fill,
      ...Layout.fullSize,
      ...Layout.center,
      backgroundColor: Colors.white,
    },
  });
};
