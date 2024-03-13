import { StyleSheet } from 'react-native';
import { useTheme } from 'hooks';

export const useStyles = () => {
  const { Spacing, Colors } = useTheme();

  return StyleSheet.create({
    scrollView: {
      backgroundColor: Colors.white,
      paddingHorizontal: Spacing.xl,
      borderTopLeftRadius: Spacing.xl,
      borderTopRightRadius: Spacing.xl,
      borderColor: Colors.white,
    },
    button: {
      paddingVertical: Spacing.reg,
      marginVertical: Spacing.xl,
    },
  });
};
