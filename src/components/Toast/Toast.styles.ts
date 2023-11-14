import useTheme from 'hooks/useTheme';
import { StyleSheet } from 'react-native';

export const useStyleTheme = () => {
  const { FontSize, Spacing, Layout, Colors } = useTheme();
  return StyleSheet.create({
    container: {
      top: -75,
      maxHeight: 140,
      paddingHorizontal: Spacing.ml,
      backgroundColor: Colors.white,
      ...Layout.absolute,
      ...Layout.justifyContentStart,
      ...Layout.alignItemsCenter,
      ...Layout.selfCenter,
      ...Layout.row,
      borderRadius: Spacing.ml,
      left: Spacing.l,
      right: Spacing.l,
    },
    toastText: {
      paddingHorizontal: Spacing.ml,
    },
    errorText: {
      ...Layout.fill,
      marginLeft: Spacing.ml,
      fontSize: FontSize.tiny,
    },
    closeButton: {
      ...Layout.absolute,
      top: Spacing.s,
      right: Spacing.s,
    },
  });
};
