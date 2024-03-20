import { StyleSheet } from 'react-native';
import { useTheme } from 'hooks';

export const useStyles = () => {
  const { Colors, Spacing } = useTheme();

  return StyleSheet.create({
    container: {
      backgroundColor: Colors.white,
    },
    button: {
      paddingVertical: Spacing.reg,
      marginTop: 40,
    },
  });
};
