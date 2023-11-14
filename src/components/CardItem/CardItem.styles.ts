import { StyleSheet } from 'react-native';
import useTheme from 'hooks/useTheme';
import { Spacing } from 'theme/Variables';

export const useStyles = () => {
  const { Layout, FontSize, Colors } = useTheme();

  return StyleSheet.create({
    wrapper: {
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
      marginBottom: Spacing.lg,
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
      fontSize: FontSize.regular,
      color: Colors.textBlack,
      fontWeight: '400',
      width: 70,
    },
    mask: {
      width: 40,
      height: 40,
      ...Layout.alignItemsCenter,
      marginLeft: Spacing.s,
      ...Layout.center,
    },
    iconView: { ...Layout.row },
  });
};
