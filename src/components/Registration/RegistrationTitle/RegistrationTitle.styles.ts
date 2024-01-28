import { StyleSheet } from 'react-native';
import { useTheme } from 'hooks';

export const useStyles = () => {
  const { Spacing } = useTheme();
  return StyleSheet.create({
    title: {
      marginLeft: Spacing.md,
      marginVertical: Spacing.xxxl - Spacing.s,
      maxWidth: '80%',
    },
  });
};
