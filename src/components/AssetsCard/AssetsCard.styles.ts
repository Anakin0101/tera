import { StyleSheet } from 'react-native';
import useTheme from 'hooks/useTheme';
import { Spacing } from 'theme/Variables';

export const useStyles = () => {
  const { Layout, FontSize, Colors } = useTheme();

  return StyleSheet.create({
    templateCardContainer: {
      ...Layout.col,
      ...Layout.justifyContentBetween,

      marginTop: Spacing.m,
    },
    wrapper: {
      ...Layout.row,
      ...Layout.justifyContentBetween,
      ...Layout.alignItemsCenter,
    },
    discardRightMargin: {
      marginRight: Spacing.zero,
    },
    customIconComponentStyles: {
      width: 48,
      height: 48,
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
    templateCardAmount: {
      fontSize: FontSize.regular,
      color: Colors.textBlack,
      fontWeight: '400',
    },
    dateText: {
      fontSize: FontSize.dwarf,
      color: Colors.textBlack,
      fontWeight: '400',
    },
    templateCardContent: {
      fontSize: FontSize.dwarf,
      color: Colors.textBlack500,
    },
    underline: {
      width: '80%',
      margin: Spacing.xxs,
      marginRight: Spacing.lg,
      borderBottomWidth: 1,
      borderColor: Colors.inputBlack50,
      ...Layout.alignSelfEnd,
      flexShrink: 0,
    },
    iconView: { ...Layout.row },
  });
};
