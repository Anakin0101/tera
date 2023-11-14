import useTheme from 'hooks/useTheme';
import { StyleSheet } from 'react-native';

export const useStyleTheme = () => {
  const { Spacing, Layout } = useTheme();
  return StyleSheet.create({
    container: {
      ...Layout.fullSize,
      ...Layout.justifyContentStart,
      paddingHorizontal: Spacing.xl,
    },
    wrapper: {
      marginTop: Spacing.xl,
    },
  });
};
