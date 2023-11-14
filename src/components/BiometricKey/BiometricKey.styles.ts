import useTheme from 'hooks/useTheme';
import { StyleSheet } from 'react-native';

export const useStyleTheme = () => {
  const { Colors, FontSize, Layout } = useTheme();
  return StyleSheet.create({
    pinItem: {
      width: 70,
      height: 70,
      borderRadius: 35,
      ...Layout.justifyContentCenter,
      ...Layout.alignItemsCenter,
    },

    pinItemText: {
      fontSize: FontSize.regular,
      color: Colors.textBlack400,
    },
    hide: {
      display: 'none',
    },
  });
};
