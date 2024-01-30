import useTheme from 'hooks/useTheme';
import { StyleSheet } from 'react-native';
import { Spacing } from 'theme/Variables';

export const useStyleTheme = () => {
  const { Layout } = useTheme();
  return StyleSheet.create({
    container: {
      ...Layout.center,
    },
    buttonsContainer: {
      marginTop: Spacing.lg,
      ...Layout.row,
      ...Layout.justifyContentBetween,
      ...Layout.alignItemsCenter,
    },
  });
};
