import { StyleSheet } from 'react-native';
import useTheme from 'hooks/useTheme';
import { Spacing } from 'theme/Variables';

export const useStyles = () => {
  const { Layout, FontSize, Colors } = useTheme();

  return StyleSheet.create({
    templateCardContainer: {
      ...Layout.row,
      width: '90%',
      ...Layout.justifyContentBetween,
      ...Layout.alignItemsCenter,
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
      marginTop: Spacing.s,
      marginLeft: Spacing.s,
    },
    templateCardTitle: {
      width: 150,
      fontSize: FontSize.small,
      color: Colors.textBlack,
      fontWeight: '400',
    },
    templateAmount: {
      fontSize: FontSize.small,
      color: Colors.textBlack,
      fontWeight: '400',
    },
    ops: { ...Layout.alignItemsEnd, marginLeft: Spacing.md, width: 120 },
    dateText: {
      fontSize: FontSize.dwarf,
      color: Colors.textBlack,
      fontWeight: '400',
    },
    underline: {
      width: '85%',
      margin: Spacing.xs,
      borderBottomWidth: 1,
      borderColor: Colors.inputBlack50,
      ...Layout.alignSelfEnd,
      flexShrink: 0,
    },
    templateCardContent: {
      fontSize: FontSize.dwarf,
      width: 150,
      color: Colors.textBlack500,
    },
  });
};
