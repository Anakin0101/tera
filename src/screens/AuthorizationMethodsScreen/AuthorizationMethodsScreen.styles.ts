import useTheme from 'hooks/useTheme';
import { StyleSheet } from 'react-native';

export const useStyleTheme = () => {
  const { Spacing, Layout } = useTheme();
  return StyleSheet.create({
    container: {
      ...Layout.fullSize,
    },
    wrapper: {
      marginTop: Spacing.xl,
      paddingHorizontal: Spacing.xl,
    },
  });
};
