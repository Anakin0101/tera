import { StyleSheet } from 'react-native';
import useTheme from 'hooks/useTheme';

export const useStyles = () => {
  const { Layout, Fonts, Spacing, FontSize } = useTheme();

  return StyleSheet.create({
    headerContainer: {
      ...Layout.row,
      ...Layout.justifyContentBetween,
      ...Layout.alignItemsCenter,
    },
    titleContainer: {
      ...Fonts.textBold,
      fontSize: FontSize.regularPlus,
      fontWeight: '400',
    },
    dashboardTemplatesContainer: {
      ...Layout.col,
    },
    dashboardTemplatesWrapper: {
      ...Layout.row,
      ...Layout.justifyContentBetween,
      ...Layout.alignItemsCenter,
    },
    dashboardTemplatesContent: {
      paddingVertical: Spacing.xl,
    },
  });
};
