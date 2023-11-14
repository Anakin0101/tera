import useTheme from 'hooks/useTheme';
import { StyleSheet } from 'react-native';

export const useStyleTheme = () => {
  const { FontSize, Spacing, Layout } = useTheme();
  return StyleSheet.create({
    container: {
      ...Layout.alignItemsCenter,
      marginHorizontal: Spacing.ml,
      paddingHorizontal: Spacing.xs,
      paddingVertical: Spacing.ml,
    },
    label: { paddingHorizontal: Spacing.xl, paddingVertical: Spacing.ml },
    user: {
      fontSize: FontSize.small,
    },
  });
};
