import { StyleSheet } from 'react-native';
import { useTheme } from 'hooks';

export const useStyles = () => {
  const { Colors } = useTheme();

  return StyleSheet.create({
    container: {
      backgroundColor: Colors.white,
    },
    button: {
      paddingVertical: 14,
      marginTop: 40,
    },
  });
};
