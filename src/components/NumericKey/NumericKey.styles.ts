import useTheme from 'hooks/useTheme';
import { StyleSheet } from 'react-native';

export const useStyleTheme = () => {
  const { Colors, FontSize, Spacing, Layout } = useTheme();
  return StyleSheet.create({
    pinItem: {
      width: 70,
      height: 70,
      borderRadius: Spacing.xxl,
      ...Layout.justifyContentCenter,
      ...Layout.alignItemsCenter,
    },

    pinItemText: {
      fontSize: FontSize.regularPlus,
      color: Colors.pinColor,
    },
  });
};
