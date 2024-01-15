import { StyleSheet } from 'react-native';
import { useTheme } from 'hooks';

export const useStyles = () => {
  const { Layout, Colors, Spacing } = useTheme();

  return StyleSheet.create({
    container: {
      backgroundColor: Colors.white,
      paddingHorizontal: Spacing.xl,
    },
    contentContainer: {
      ...Layout.growfull,
      paddingVertical: Spacing.xxl,
    },
    header: {
      ...Layout.alignItemsCenter,
    },
    imageContainer: {
      ...Layout.center,
      ...Layout.selfCenter,
      width: 100,
      height: 100,
      borderRadius: 50,
      borderWidth: 1,
      borderColor: Colors.inputBlack50,
    },
    image: {
      ...Layout.fullHeight,
      ...Layout.fullWidth,
      borderRadius: 50,
    },
    description: {
      ...Layout.growfull,
    },
    details: {
      marginTop: Spacing.m,
    },
    detailItem: {
      ...Layout.row,
      gap: Spacing.ml,
      marginTop: Spacing.lg,
    },
    point: {
      width: Spacing.xs,
      height: Spacing.xs,
      borderRadius: Spacing.xxs,
      backgroundColor: Colors.primary,
      marginTop: Spacing.md,
    },
    button: {
      marginTop: 50,
      paddingVertical: Spacing.ml,
    },
  });
};
