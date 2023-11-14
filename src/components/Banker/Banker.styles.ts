import { StyleSheet } from 'react-native';
import useTheme from 'hooks/useTheme';
import { Spacing } from 'theme/Variables';

export const useStyles = () => {
  const { Layout, FontSize, Colors, Fonts } = useTheme();

  return StyleSheet.create({
    dashboardTemplatesContainer: {
      ...Layout.col,
    },
    titleContainer: {
      ...Fonts.textBold,
      fontSize: FontSize.regularPlus,
      fontWeight: '400',
    },
    cardwrapper: {
      paddingLeft: Spacing.xl,
      paddingVertical: Spacing.xlg,
      backgroundColor: Colors.white,
    },
    wrapper: {
      marginVertical: Spacing.m,
      ...Layout.row,
      ...Layout.justifyContentBetween,
      ...Layout.alignItemsCenter,
    },

    customIconComponentStyles: {
      width: 48,
      height: 48,
    },
    eyeIcon: {
      width: 40,
      height: 40,
    },
    templateCardContentContainer: {
      marginTop: Spacing.xs,
      marginLeft: Spacing.s,
    },
    templateCardTitle: {
      fontSize: FontSize.small,
      color: Colors.textBlack500,
      fontWeight: '400',
    },
    maskedView: {
      ...Layout.row,
      ...Layout.justifyContentBetween,
      minWiwidth: 90,
    },
    templateCardAmount: {
      fontSize: FontSize.tiny,
      color: Colors.textBlack,
      fontWeight: '400',
    },
    mask: {
      width: 40,
      height: 40,
      ...Layout.alignItemsCenter,
      marginLeft: Spacing.s,
      ...Layout.center,
    },
    iconView: { ...Layout.row },
    iconWrap: { ...Layout.row, paddingRight: Spacing.md },
  });
};
