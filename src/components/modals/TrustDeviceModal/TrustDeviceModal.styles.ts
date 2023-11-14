import useTheme from 'hooks/useTheme';
import { StyleSheet } from 'react-native';

export const useStyleTheme = () => {
  const { Colors, FontSize, Spacing, Layout } = useTheme();
  return StyleSheet.create({
    container: {
      ...Layout.center,
    },
    icon: {
      paddingTop: Spacing.xxl,
      paddingBottom: Spacing.xl,
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
      paddingTop: Spacing.lg,
      paddingBottom: Spacing.xxxl,
    },
  });
};
