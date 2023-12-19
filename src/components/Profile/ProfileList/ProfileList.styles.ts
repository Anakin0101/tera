import useTheme from 'hooks/useTheme';
import { StyleSheet } from 'react-native';

export const useStyleTheme = () => {
  const { Spacing, Layout, Colors } = useTheme();
  return StyleSheet.create({
    profileListContainer: {
      ...Layout.row,
      ...Layout.flexWrap,
      ...Layout.alignItemsCenter,
      ...Layout.justifyContentBetween,
      paddingHorizontal: Spacing.xl,
      marginTop: Spacing.xxs,
      backgroundColor: Colors.white,
    },
  });
};
