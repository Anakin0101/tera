import { StyleSheet } from 'react-native';
import useTheme from 'hooks/useTheme';

export const useStyles = () => {
  const { Layout, Fonts, Spacing, FontSize, Colors, FontFamily } = useTheme();

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
    dashboardView: {
      paddingHorizontal: Spacing.xl,
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
      marginVertical: Spacing.xl,
    },
    dashboardTemplatesContent: {
      paddingVertical: Spacing.xl,
    },
    noTransactionsWrapper: {
      ...Layout.center,
    },
    noTransactionsText: {
      color: Colors.textBlack500,
      FontFamily: FontFamily.medium,
      fontSize: FontSize.small,
      marginTop: Spacing.xlm,
    },
  });
};
