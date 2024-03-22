import useTheme from 'hooks/useTheme';
import { useWindowDimensions } from 'react-native';
import { StyleSheet } from 'react-native';

export const useStyles = () => {
  const { Spacing, Layout, Fonts, Colors, FontSize } = useTheme();
  const { height } = useWindowDimensions();
  return StyleSheet.create({
    container: {
      maxHeight: height * 0.7,
    },
    listWrapper: {
      paddingBottom: Spacing.xxxl,
    },
    button: {
      paddingVertical: Spacing.m,
    },
    itemWrapper: {
      paddingTop: Spacing.xl,
    },
    itemContainer: {
      ...Layout.rowCenter,
    },
    itemTitle: {
      fontSize: FontSize.regular,
      lineHeight: 24,
      color: Colors.textBlack500,
      ...Fonts.medium,
      letterSpacing: -0.2,
      ...Layout.fill,
    },
    itemSelected: {
      color: Colors.textBlack,
    },
    searchWrapper: {
      marginHorizontal: 0,
    },
    headerTitle: {
      fontSize: FontSize.regularPlus,
      lineHeight: 22,
      letterSpacing: -0.5,
    },
  });
};
