import useTheme from 'hooks/useTheme';
import { StyleSheet } from 'react-native';

export const useStyleTheme = () => {
  const { Layout } = useTheme();
  return StyleSheet.create({
    pinItem: {
      flex: 1,
      ...Layout.fullSize,
      ...Layout.justifyContentCenter,
      ...Layout.alignItemsCenter,
    },
  });
};
