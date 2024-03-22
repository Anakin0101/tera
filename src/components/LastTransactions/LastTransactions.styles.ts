import { StyleSheet } from 'react-native';
import { useTheme } from 'hooks';

export const useStyles = () => {
  const { Spacing, Colors, Layout } = useTheme();

  return StyleSheet.create({
    list: {
      paddingHorizontal: Spacing.xl,
    },
    header: {
      padding: Spacing.xl,
    },
    transactionWrapper: {
      ...Layout.row,
    },
    detailsWrapper: {
      ...Layout.fill,
      marginLeft: Spacing.m,
    },
    details: {
      ...Layout.row,
      ...Layout.justifyContentBetween,
      gap: Spacing.lg,
    },
    description: { flex: 1 },
    imageContainer: {
      width: 48,
      height: 48,
      ...Layout.center,
    },
    Icon: {
      width: 16,
      height: 16,
      padding: Spacing.lg,
    },
    seeAll: {
      borderWidth: 1,
      borderRadius: 20,
      marginTop: Spacing.xl,
      paddingVertical: Spacing.s,
      ...Layout.alignItemsCenter,
      borderColor: Colors.inputBlack50,
    },
  });
};
