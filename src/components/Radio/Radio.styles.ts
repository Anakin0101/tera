import useTheme from 'hooks/useTheme';
import { StyleSheet } from 'react-native';

export const useStyleTheme = () => {
  const { Colors, Spacing, Layout } = useTheme();
  return StyleSheet.create({
    outline: {
      width: Spacing.lg,
      height: Spacing.lg,
      borderWidth: Spacing.xxxs,
      borderRadius: Spacing.m,
      ...Layout.center,
      borderColor: Colors.textBlack400,
    },
    inner: {
      width: 10,
      height: 10,
      borderRadius: 5,
      backgroundColor: Colors.primary,
    },
    selected: {
      borderColor: Colors.primary,
    },
    wrapper: {
      ...Layout.row,
      ...Layout.alignItemsCenter,
    },
    label: {
      marginLeft: Spacing.s,
    },
  });
};
