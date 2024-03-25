import useTheme from 'hooks/useTheme';
import { StyleSheet } from 'react-native';

export const useStyles = () => {
  const { Layout, Spacing } = useTheme();

  return StyleSheet.create({
    criteriaContainer: {
      marginVertical: Spacing.xxs,
    },
    criteria: {
      ...Layout.rowHCenter,
      gap: Spacing.md,
    },
    textStyle: {
      lineHeight: 24,
      letterSpacing: -0.2,
    },
    criteriaHeading: {
      marginVertical: Spacing.s,
    },
  });
};
