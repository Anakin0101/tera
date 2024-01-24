import { StyleSheet } from 'react-native';
import { useTheme } from 'hooks';
import { FORM_HEIGHT } from 'screens/VerificationTypeScreen/VerificationTypeScreen.constants';

export const useStyles = () => {
  const { Spacing, Layout } = useTheme();
  return StyleSheet.create({
    container: {
      ...Layout.fill,
    },
    wrapper: {
      marginHorizontal: Spacing.xl,
    },
    formContainer: {
      maxHeight: FORM_HEIGHT,
    },
    ctaWrapper: {
      marginVertical: Spacing.md,
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
