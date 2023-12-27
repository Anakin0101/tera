import useTheme from 'hooks/useTheme';
import { StyleSheet } from 'react-native';

export const useStyles = () => {
  const { Spacing } = useTheme();
  return StyleSheet.create({
    contentContainer: {
      paddingTop: Spacing.xl,
    },
    additionalPadding: {
      paddingBottom: 100,
    },
  });
};
