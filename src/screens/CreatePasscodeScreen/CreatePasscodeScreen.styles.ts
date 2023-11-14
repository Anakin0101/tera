import useTheme from 'hooks/useTheme';
import { StyleSheet } from 'react-native';

export const useStyleTheme = () => {
  const { Spacing } = useTheme();
  return StyleSheet.create({
    container: {
      paddingTop: Spacing.ml,
    },
  });
};
