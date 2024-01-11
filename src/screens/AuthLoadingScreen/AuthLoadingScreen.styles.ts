import useTheme from 'hooks/useTheme';
import { StyleSheet } from 'react-native';

export const useStyleTheme = () => {
  const { Colors } = useTheme();
  return StyleSheet.create({
    center: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: Colors.white,
    },
  });
};
