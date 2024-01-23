import { StyleSheet } from 'react-native';
import { useTheme } from 'hooks';

export const useStyles = () => {
  const { Layout, Colors } = useTheme();

  return StyleSheet.create({
    container: {
      ...Layout.fill,
      ...Layout.center,
    },

    iconContainer: {
      ...Layout.center,
      ...Layout.selfCenter,
      width: 80,
      height: 80,
      borderRadius: 40,
      backgroundColor: Colors.success,
    },
    button: {
      paddingVertical: 14,
      marginTop: 40,
    },
  });
};
