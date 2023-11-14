import useTheme from 'hooks/useTheme';
import { StyleSheet } from 'react-native';

export const useStyleTheme = () => {
  const { FontSize, Spacing, Layout } = useTheme();
  return StyleSheet.create({
    container: {
      ...Layout.row,
      ...Layout.alignItemsCenter,
    },
    label: {
      marginLeft: Spacing.s,
      fontSize: FontSize.tiny,
    },
  });
};
