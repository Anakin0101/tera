import useTheme from 'hooks/useTheme';
import { StyleSheet } from 'react-native';

export const useStyleTheme = () => {
  const { FontSize, Spacing, Layout } = useTheme();
  return StyleSheet.create({
    container: {
      ...Layout.alignItemsCenter,
    },
    label: { paddingTop: Spacing.xl, fontSize: FontSize.large },
    user: {
      fontSize: FontSize.large,
      paddingTop: Spacing.s,
      paddingBottom: Spacing.xl,
    },
  });
};
