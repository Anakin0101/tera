import useTheme from 'hooks/useTheme';
import { StyleSheet } from 'react-native';

export const useStyleTheme = () => {
  const { FontSize, Spacing, Layout, Colors } = useTheme();
  return StyleSheet.create({
    container: {
      ...Layout.row,
      ...Layout.alignItemsCenter,
    },
    input: {
      fontSize: FontSize.xxxl,
      borderWidth: 0,
      paddingRight: Spacing.md,
      color: Colors.textBlack,
    },
  });
};
