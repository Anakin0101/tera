import { StyleSheet } from 'react-native';
import { useTheme } from 'hooks';

export const useStyles = () => {
  const { Layout, Spacing, Colors } = useTheme();

  return StyleSheet.create({
    scrollView: {
      backgroundColor: Colors.white,
    },
    textContainer: {
      flexGrow: 1,
      paddingHorizontal: Spacing.xl,
    },
    footer: {
      paddingHorizontal: Spacing.xl,
    },
    checkbox: {
      marginTop: Spacing.m,
    },
    alignStart: {
      ...Layout.alignItemsStart,
    },
    button: {
      paddingVertical: 14,
      marginTop: Spacing.xl,
    },
    disabled: {
      opacity: 0.5,
    },
  });
};
