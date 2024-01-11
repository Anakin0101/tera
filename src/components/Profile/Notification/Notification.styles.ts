import useTheme from 'hooks/useTheme';
import { StyleSheet } from 'react-native';

export const useStyleTheme = () => {
  const { Colors, BorderRadius, Layout, FontSize, Spacing } = useTheme();
  return StyleSheet.create({
    notificationCircle: {
      width: 18,
      height: 18,
      padding: Spacing.xxxs,
      backgroundColor: Colors.primary,
      borderRadius: BorderRadius.full,
      ...Layout.center,
    },
    notificationsQTY: {
      color: Colors.white,
      fontSize: FontSize.tiny,
      lineHeight: 14,
    },
  });
};
