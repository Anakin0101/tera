import useTheme from 'hooks/useTheme';
import { StyleSheet } from 'react-native';

export const useStyleTheme = () => {
  const { Colors, FontSize, Spacing, Layout } = useTheme();
  return StyleSheet.create({
    pinItem: {
      margin: Spacing.xxs,
      flex: 1,
      ...Layout.fullSize,
      ...Layout.justifyContentCenter,
      ...Layout.alignItemsCenter,
    },
    pinItemText: {
      fontSize: FontSize.regularPlus,
      color: Colors.pinColor,
    },
  });
};
