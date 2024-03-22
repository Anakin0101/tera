import { StyleSheet } from 'react-native';
import { useTheme } from 'hooks';

export const useStyles = () => {
  const { Colors, Layout, Spacing, Fonts, FontSize } = useTheme();

  return StyleSheet.create({
    container: {
      ...Layout.row,
      ...Layout.alignItemsCenter,
      marginTop: Spacing.xlg,
      ...Layout.justifyContentBetween,
    },
    headerTitle: {
      fontSize: FontSize.small,
      lineHeight: 16,
      color: Colors.textBlack500,
      ...Fonts.medium,
      letterSpacing: -0.2,
      flex: 1,
    },
    valueStyle: {
      fontSize: FontSize.regular,
      lineHeight: 24,
      color: Colors.textBlack,
      ...Fonts.medium,
      letterSpacing: -0.2,
    },
    content: {
      ...Layout.fill,
    },
  });
};
