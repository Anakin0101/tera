import { StyleSheet } from 'react-native';
import useTheme from 'hooks/useTheme';

export const useStyles = () => {
  const { Layout, Fonts, Spacing, FontSize, Colors } = useTheme();

  return StyleSheet.create({
    headerContainer: {
      ...Layout.row,
      ...Layout.justifyContentBetween,
      ...Layout.alignItemsCenter,
    },
    wrapper: {
      paddingVertical: Spacing.xlg,
      backgroundColor: Colors.white,
    },
    dashboardView: { paddingLeft: Spacing.xl },

    titleContainer: {
      ...Fonts.textBold,
      fontSize: FontSize.regularPlus,
      fontWeight: '400',
    },
    dashboardTemplatesContainer: {
      ...Layout.col,
    },
    dashboardTemplatesWrapper: {
      marginVertical: Spacing.ml,
      ...Layout.row,
      ...Layout.justifyContentBetween,
      ...Layout.alignItemsCenter,
    },
    dashboardTemplatesContent: {
      paddingVertical: Spacing.xl,
    },
  });
};
