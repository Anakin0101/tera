import { StyleSheet } from 'react-native';
import { useTheme } from 'hooks';

export const useStyles = () => {
  const { Spacing, Layout } = useTheme();
  return StyleSheet.create({
    container: {
      ...Layout.fill,
    },
    wrapper: {
      paddingHorizontal: Spacing.xl,
    },
    ctaWrapper: {
      paddingHorizontal: Spacing.xl,
      marginBottom: Spacing.ml,
    },
    ctaOpenWrapper: {
      paddingVertical: Spacing.md,
    },
    codeWordTextContainer: {
      marginTop: -Spacing.m,
      ...Layout.rowHCenter,
    },
    withError: {
      marginTop: Spacing.s,
    },
    linkContainer: {
      ...Layout.rowHCenter,
    },
    arrowRight: {
      marginTop: Spacing.xxxs,
    },
  });
};
