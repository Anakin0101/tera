import { StyleSheet } from 'react-native';
import useTheme from 'hooks/useTheme';
import { horizontalScale } from 'utils/config';

export const useStyles = () => {
  const { Layout, Fonts, Spacing, FontSize, Colors } = useTheme();

  return StyleSheet.create({
    dashboardUpcomingOpsContainer: {
      paddingLeft: Spacing.xl,
      paddingVertical: Spacing.xlg,
      backgroundColor: Colors.white,
    },
    headerContainer: {
      ...Layout.row,
      ...Layout.justifyContentBetween,
      ...Layout.alignItemsCenter,
      width: '90%',
    },
    titleContainer: {
      ...Fonts.textBold,
      fontSize: FontSize.regular,
      fontWeight: '400',
    },
    dashboardTemplatesWrapper: {
      ...Layout.row,
      ...Layout.justifyContentBetween,
      ...Layout.alignItemsCenter,
    },
    dashboardTemplatesContent: {
      paddingVertical: Spacing.xl,
    },
    listFooter: {
      ...Layout.col,
      ...Layout.justifyContentBetween,
      ...Layout.alignItemsStart,
      width: horizontalScale(158),
      height: 188,
      backgroundColor: Colors.gray,
      borderRadius: 12,
      marginRight: Spacing.s,
      padding: 12,
    },
    templateCardContainer: {
      ...Layout.col,
      ...Layout.justifyContentBetween,
      ...Layout.alignItemsStart,
      width: horizontalScale(158),
      height: 188,
      backgroundColor: Colors.gray,
      borderRadius: 12,
      marginRight: Spacing.s,
      padding: 12,
    },
    containerOneCard: {
      width: '100%',
    },
    containertwoCard: {
      width: '48%',
    },
  });
};
