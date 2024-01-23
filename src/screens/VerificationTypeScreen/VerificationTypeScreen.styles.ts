import { StyleSheet } from 'react-native';
import { useTheme } from 'hooks';
import { FORM_HEIGHT, PHONE_INPUT_WIDTH } from './VerificationTypeScreen.constants';

export const useStyles = () => {
  const { Spacing, Layout, Colors } = useTheme();
  return StyleSheet.create({
    container: {
      ...Layout.fill,
    },
    wrapper: {
      marginHorizontal: Spacing.xl,
    },
    formContainer: {
      minHeight: FORM_HEIGHT,
    },
    ctaWrapper: {
      marginVertical: Spacing.md,
    },
    phoneInputContainer: {
      ...Layout.justifyContentCenter,
      alignItems: 'baseline',
    },
    rowWrapper: {
      ...Layout.row,
    },
    phoneInputWrapper: {
      maxWidth: PHONE_INPUT_WIDTH,
    },
    phonePrefixContainer: {
      ...Layout.fill,
      paddingVertical: Spacing.md,
      ...Layout.row,
      ...Layout.justifyContentStart,
      ...Layout.alignItemsCenter,
      borderBottomWidth: 1,
      borderBottomColor: Colors.borderColor,
      marginRight: Spacing.ml,
    },
    phonePrefix: {
      color: Colors.textBlack500,
      marginRight: Spacing.s,
    },
    radioContainer: {
      ...Layout.rowHCenter,
      ...Layout.justifyContentBetween,
      marginTop: Spacing.l,
    },
  });
};
