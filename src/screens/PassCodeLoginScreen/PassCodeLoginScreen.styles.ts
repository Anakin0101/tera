import useTheme from 'hooks/useTheme';
import { StyleSheet } from 'react-native';

export const useStyleTheme = () => {
  const { Layout, Spacing } = useTheme();
  return StyleSheet.create({
    wrapper: {
      ...Layout.justifyContentCenter,
      ...Layout.alignItemsCenter,
      paddingHorizontal: Spacing.xxl,
    },
    pinLine: { paddingVertical: 50 },
  });
};
