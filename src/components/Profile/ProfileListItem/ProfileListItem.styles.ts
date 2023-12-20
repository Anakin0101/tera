import useTheme from 'hooks/useTheme';
import { StyleSheet } from 'react-native';

export const useStyleTheme = () => {
  const { Spacing, Layout, Colors, FontSize } = useTheme();

  return StyleSheet.create({
    profileListItemContainer: {
      ...Layout.row,
      ...Layout.alignItemsCenter,
      ...Layout.justifyContentCenter,
      marginBottom: Spacing.m,
    },
    profileListItemIconStyles: {
      width: Spacing.xxxl,
      height: Spacing.xxxl,
      margin: 0,
      padding: 0,
    },
    profileListItemTextContainer: {
      marginLeft: Spacing.ml,
      marginTop: Spacing.xlm,
      ...Layout.fill,
    },
    profileListItemText: {
      fontSize: FontSize.small,
      marginBottom: Spacing.xlm,
    },
    separator: {
      backgroundColor: Colors.inputBlack50,
      height: 1,
    },
  });
};
