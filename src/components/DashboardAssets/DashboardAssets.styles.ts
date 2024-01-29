import { StyleSheet } from 'react-native';
import useTheme from 'hooks/useTheme';

export const useStyles = () => {
  const { Layout, Fonts, Spacing, FontSize, Colors } = useTheme();

  return StyleSheet.create({
    headerContainer: {},
    assetsView: {
      paddingLeft: Spacing.xl,
      paddingVertical: Spacing.xlg,
      backgroundColor: Colors.white,
    },
    titleContainer: {
      ...Fonts.textBold,
      fontSize: FontSize.regularPlus,
      fontWeight: '400',
      marginRight: Spacing.md,
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
    mask: {
      width: 40,
      height: 40,
      ...Layout.alignItemsCenter,
      marginLeft: Spacing.s,
      ...Layout.center,
    },
    eyeIcon: {
      width: 40,
      height: 40,
      marginBottom: Spacing.lg,
    },
    wrapMask: {
      ...Layout.row,
      width: '90%',
    },
  });
};
