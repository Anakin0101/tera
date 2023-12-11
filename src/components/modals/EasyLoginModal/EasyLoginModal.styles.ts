import useTheme from 'hooks/useTheme';
import { StyleSheet } from 'react-native';
import { verticalScale } from 'utils/config';

export const useStyleTheme = () => {
  const { Colors, FontSize, Spacing, Layout } = useTheme();
  return StyleSheet.create({
    container: {
      ...Layout.center,
    },
    contentWrapper: {
      paddingHorizontal: Spacing.xl,
      ...Layout.center,
    },
    toggleContainer: {
      ...Layout.row,
      ...Layout.center,
      paddingTop: Spacing.m,
      paddingBottom: verticalScale(Spacing.xxl),
    },
    icon: {
      marginVertical: verticalScale(40),
    },
    text: {
      fontSize: FontSize.regular,
      textAlign: 'center',
      color: Colors.pinColor,
    },
    label: {
      fontSize: FontSize.small,
      textAlign: 'center',
      color: Colors.textBlack500,
      paddingVertical: verticalScale(Spacing.lg),
    },
    buttonsContainer: {
      ...Layout.fullWidth,
      ...Layout.row,
      ...Layout.justifyContentBetween,
      ...Layout.alignItemsCenter,
    },
  });
};
