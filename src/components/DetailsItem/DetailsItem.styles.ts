import { StyleSheet } from 'react-native';
import { useTheme } from 'hooks';

export const useStyles = () => {
  const { Layout, Colors, Spacing } = useTheme();

  return StyleSheet.create({
    detailsContainer: {
      marginTop: Spacing.l,
    },
    detailsContainerUnderlined: {
      marginTop: Spacing.l,
      borderBottomWidth: 1,
      paddingVertical: 5,
      borderBottomColor: Colors.inputBlack50,
    },
    detailsWrapper: {
      ...Layout.rowHCenter,
      ...Layout.justifyContentBetween,
    },
    detailsIconContainer: {
      ...Layout.center,
      width: 40,
      height: 40,
      top: Spacing.m,
      borderRadius: Spacing.lg,
      borderColor: Colors.inputBlack50,
      borderWidth: 1,
    },
    blockedFundsIcon: {
      marginHorizontal: Spacing.s,
    },
    blockedAmountsContainer: {
      ...Layout.row,
      ...Layout.alignItemsCenter,
      gap: Spacing.ml,
    },
  });
};
