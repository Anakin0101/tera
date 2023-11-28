import useTheme from 'hooks/useTheme';
import { StyleSheet } from 'react-native';

export const useStyles = () => {
  const { Spacing, Colors } = useTheme();

  return StyleSheet.create({
    progress: {
      height: Spacing.xxs,
      backgroundColor: Colors.inputBlack50,
      borderRadius: 20,
    },
    indicator: {
      height: Spacing.xxs,
      backgroundColor: Colors.success,
      borderRadius: 20,
    },
  });
};
