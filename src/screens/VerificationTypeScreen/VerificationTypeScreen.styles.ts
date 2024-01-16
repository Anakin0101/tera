import { StyleSheet } from 'react-native';
import { useTheme } from 'hooks';
import { FORM_HEIGHT } from './VerificationTypeScreen.constants';

export const useStyles = () => {
  const { Spacing } = useTheme();
  return StyleSheet.create({
    container: {
      flex: 1,
    },
    wrapper: {
      marginHorizontal: Spacing.xl,
    },
    formContainer: {
      minHeight: FORM_HEIGHT,
      borderWidth: 1,
    },
    ctaWrapper: {
      marginVertical: Spacing.md,
    },
  });
};
