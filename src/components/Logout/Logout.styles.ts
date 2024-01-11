import useTheme from 'hooks/useTheme';
import { StyleSheet } from 'react-native';

export const useStyleTheme = () => {
  const { FontSize, Spacing, Colors, Layout } = useTheme();
  return StyleSheet.create({
    logoutContainer: {
      ...Layout.row,
      ...Layout.justifyContentStart,
      ...Layout.alignItemsCenter,
      paddingVertical: Spacing.m,
      paddingHorizontal: Spacing.xl,
      backgroundColor: Colors.white,
      marginTop: Spacing.xxs,
      paddingBottom: Spacing.xlg,
    },
    textStyles: {
      marginLeft: Spacing.lg,
      fontSize: FontSize.regular,
    },
    iconComponentCustomStyles: {
      width: 48,
      height: 48,
      backgroundColor: Colors.error100,
      padding: 0,
      margin: 0,
    },
  });
};
