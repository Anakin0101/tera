import useTheme from 'hooks/useTheme';
import { StyleSheet } from 'react-native';

export const useStyleTheme = () => {
  const { Colors } = useTheme();
  return StyleSheet.create({
    wrapper: {
      backgroundColor: Colors.white,
      height: '100%',
    },
  });
};
