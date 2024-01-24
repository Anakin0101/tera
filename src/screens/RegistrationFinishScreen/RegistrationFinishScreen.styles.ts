import { StyleSheet } from 'react-native';
import { useTheme } from 'hooks';

export const useStyles = () => {
  const { Spacing } = useTheme();
  return StyleSheet.create({
    container: {
      flex: 1,
      margin: Spacing.md,
    },
    ctaWrapper: {
      marginVertical: Spacing.md,
    },
  });
};
