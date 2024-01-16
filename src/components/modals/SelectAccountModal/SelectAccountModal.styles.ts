import useTheme from 'hooks/useTheme';
import { StyleSheet } from 'react-native';

export const useStyles = () => {
  const { Spacing, Layout, Colors } = useTheme();
  return StyleSheet.create({
    contentContainer: {
      paddingTop: Spacing.xl,
    },
    additionalPadding: {
      paddingBottom: 100,
    },
    account: {
      ...Layout.rowHCenter,
      ...Layout.justifyContentBetween,
    },
    outline: {
      width: Spacing.lg,
      height: Spacing.lg,
      borderWidth: Spacing.xxxs,
      borderRadius: Spacing.m,
      ...Layout.center,
      borderColor: Colors.textBlack400,
    },
    inner: {
      width: Spacing.md,
      height: Spacing.md,
      borderRadius: 5,
      backgroundColor: Colors.primary,
    },
    selected: {
      borderColor: Colors.primary,
    },
  });
};
