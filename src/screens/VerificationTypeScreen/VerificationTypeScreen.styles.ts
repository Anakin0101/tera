import { StyleSheet } from 'react-native';
import { useTheme } from 'hooks';
import { PHONE_INPUT_WIDTH } from './VerificationTypeScreen.constants';

export const useStyles = () => {
  const { Spacing, Layout, Colors } = useTheme();
  return StyleSheet.create({
    container: {
      ...Layout.fill,
    },
    wrapper: {
      paddingHorizontal: Spacing.xl,
      paddingBottom: Spacing.ml,
    },
    ctaWrapper: {
      paddingHorizontal: Spacing.xl,
    },
    ctaOpenWrapper: {
      paddingBottom: Spacing.md,
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
    radiosContainer: {
      ...Layout.rowHCenter,
      marginBottom: Spacing.xlm,
      width: '100%',
    },
    radioContainer: {
      ...Layout.rowHCenter,
      ...Layout.justifyContentBetween,
      marginTop: Spacing.l,
    },
    withPhone: {
      marginRight: Spacing.lg,
    },
  });
};
