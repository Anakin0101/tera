import useTheme from 'hooks/useTheme';
import { StyleSheet } from 'react-native';

export const useStyleTheme = () => {
  const { Spacing, Layout, Colors } = useTheme();
  return StyleSheet.create({
    profileCardsContainer: {
      ...Layout.row,
      ...Layout.flexWrap,
      ...Layout.alignItemsCenter,
      ...Layout.justifyContentBetween,
      paddingHorizontal: Spacing.xl,
      paddingTop: Spacing.xl,
      paddingBottom: Spacing.xlg,
      backgroundColor: Colors.white,
    },
  });
};
