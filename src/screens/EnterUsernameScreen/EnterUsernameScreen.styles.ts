import { StyleSheet } from 'react-native';
import { useTheme } from 'hooks';

export const useStyles = () => {
  const { Spacing, Layout } = useTheme();
  return StyleSheet.create({
    container: {
      ...Layout.fill,
    },
    wrapper: {
      marginHorizontal: Spacing.xl,
    },
    ctaWrapper: {
      paddingHorizontal: Spacing.xl,
    },
    ctaOpenWrapper: {
      paddingBottom: Spacing.md,
    },
    chechboxContainer: {
      ...Layout.rowHCenter,
    },
    linkContainer: {
      ...Layout.rowHCenter,
    },
    arrowRight: {
      marginTop: Spacing.xxxs,
    },
  });
};
