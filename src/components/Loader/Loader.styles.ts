import { StyleSheet } from 'react-native';
import { useTheme } from 'hooks';

export const useStyles = () => {
  const { Colors, Layout } = useTheme();

  return StyleSheet.create({
    container: {
      ...Layout.fill,
      ...Layout.center,
      backgroundColor: Colors.white,
    },
  });
};
