import useTheme from 'hooks/useTheme';
import { StyleSheet } from 'react-native';

export const useStyleTheme = () => {
  const { Layout, Spacing } = useTheme();
  return StyleSheet.create({
    pinItem: {
      margin: Spacing.xxs,
      flex: 1,
      ...Layout.fullSize,
      ...Layout.justifyContentCenter,
      ...Layout.alignItemsCenter,
    },
  });
};
