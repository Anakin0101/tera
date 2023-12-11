import useTheme from 'hooks/useTheme';
import { StyleSheet } from 'react-native';
import { verticalScale } from 'utils/config';

export const useStyleTheme = () => {
  const { Colors, FontSize, Spacing, Layout } = useTheme();
  return StyleSheet.create({
    container: {
      ...Layout.center,
    },
    icon: {
      paddingTop: verticalScale(Spacing.xxl),
      paddingBottom: verticalScale(Spacing.xl),
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
      paddingTop: verticalScale(Spacing.lg),
      paddingBottom: verticalScale(Spacing.xxxl),
    },
  });
};
