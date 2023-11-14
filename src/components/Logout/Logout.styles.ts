import useTheme from 'hooks/useTheme';
import { StyleSheet } from 'react-native';

export const useStyleTheme = () => {
  const { FontSize, Spacing, Colors, Layout } = useTheme();
  return StyleSheet.create({
    logoutContainer: {
      ...Layout.row,
      ...Layout.justifyContentStart,
      ...Layout.alignItemsCenter,
      padding: Spacing.m,
      marginBottom: 10,
      paddingHorizontal: Spacing.xl,
      backgroundColor: Colors.white,
    },
    textStyles: {
      marginLeft: Spacing.lg,
      fontSize: FontSize.regular,
    },
  });
};
