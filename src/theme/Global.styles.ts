import { StyleSheet } from 'react-native';
import { useTheme } from 'hooks';

export const useGlobalStyles = () => {
  const { Layout } = useTheme();
  return StyleSheet.create({
    fill: {
      ...Layout.fill,
    },
    zIndexFull: {
      zIndex: 999,
    },
    row: {
      ...Layout.row,
    },
  });
};
