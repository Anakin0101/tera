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
    },
    imageContainer: {
      width: 48,
      height: 48,
      borderWidth: 1,
      borderRadius: 24,
      borderColor: Colors.inputBlack50,
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
