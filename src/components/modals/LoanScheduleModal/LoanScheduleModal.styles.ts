import useTheme from 'hooks/useTheme';
import { StyleSheet } from 'react-native';

export const useStyles = () => {
  const { Colors, Spacing, Layout } = useTheme();

  return StyleSheet.create({
    itemHeader: {
      ...Layout.row,
      ...Layout.justifyContentBetween,
      height: 40,
    },
    headerWrapper: {
      ...Layout.alignItemsStart,
    },
    iconContainer: {
      marginTop: Spacing.xxs,
      marginLeft: Spacing.ml,
    },
    collapsibleContainer: {
      borderBottomWidth: 1,
      marginTop: Spacing.lg,
      borderBottomColor: Colors.inputBlack50,
    },
    contentContainer: {
      paddingBottom: 100,
    },
    pdf: {
      ...Layout.rowHCenter,
      backgroundColor: Colors.pink,
      gap: Spacing.xs,
      paddingHorizontal: 14,
      paddingVertical: Spacing.s,
      borderRadius: Spacing.xlm,
    },
    total: {
      ...Layout.rowHCenter,
      ...Layout.justifyContentBetween,
    },
  });
};
