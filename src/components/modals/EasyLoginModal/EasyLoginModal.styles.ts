import useTheme from 'hooks/useTheme';
import { StyleSheet } from 'react-native';

export const useStyleTheme = () => {
  const { Colors, FontSize, Spacing, Layout } = useTheme();
  return StyleSheet.create({
    container: {
      ...Layout.center,
    },
    contentWrapper: {
      paddingHorizontal: Spacing.xl,
      ...Layout.center,
    },
    toggleContainer: {
      ...Layout.row,
      ...Layout.center,
      paddingTop: Spacing.m,
      paddingBottom: Spacing.xxl,
    },
    icon: {
      marginVertical: 40,
    },
    text: {
      fontSize: FontSize.regular,
      textAlign: 'center',
      color: Colors.pinColor,
    },
    label: {
      fontSize: FontSize.small,
      textAlign: 'center',
      color: Colors.textBlack500,
      paddingVertical: Spacing.lg,
    },
    buttonsContainer: {
      ...Layout.fullWidth,
      ...Layout.row,
      ...Layout.justifyContentBetween,
      ...Layout.alignItemsCenter,
    },
  });
};
