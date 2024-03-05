import useTheme from 'hooks/useTheme';
import { StyleSheet } from 'react-native';

export const useStyleTheme = () => {
  const { Spacing, Layout, Colors } = useTheme();
  return StyleSheet.create({
    container: {
      ...Layout.fullSize,
      backgroundColor: Colors.white,
    },
    wrapper: {
      paddingHorizontal: Spacing.xl,
    },
  });
};
