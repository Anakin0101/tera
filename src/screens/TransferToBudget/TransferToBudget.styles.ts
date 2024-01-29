import useTheme from 'hooks/useTheme';
import { StyleSheet } from 'react-native';

export const useStyleTheme = () => {
  const { Layout } = useTheme();
  return StyleSheet.create({
    container: {
      ...Layout.center,
    },
  });
};
