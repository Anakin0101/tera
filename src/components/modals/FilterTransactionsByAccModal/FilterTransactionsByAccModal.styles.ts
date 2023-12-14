import useTheme from 'hooks/useTheme';
import { StyleSheet } from 'react-native';
import { moderateScale } from 'utils/config';

export const useStyles = () => {
  const { Colors, FontFamily, Spacing, Layout } = useTheme();
  return StyleSheet.create({
    buttonsContainer: {
      ...Layout.rowHCenter,
      gap: Spacing.md,
      marginTop: 30,
    },
    buttonWrapper: {
      ...Layout.fill,
      paddingVertical: moderateScale(16),
    },
    buttonLabel: {
      fontFamily: FontFamily.medium,
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
    account: {
      ...Layout.rowHCenter,
      ...Layout.justifyContentBetween,
    },
  });
};
