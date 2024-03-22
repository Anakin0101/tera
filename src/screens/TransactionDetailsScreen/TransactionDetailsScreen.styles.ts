import useTheme from 'hooks/useTheme';
import { StyleSheet } from 'react-native';

export const useStyles = () => {
  const { Colors, Spacing, Layout } = useTheme();

  return StyleSheet.create({
    container: {
      ...Layout.overflowHidden,
      borderTopLeftRadius: Spacing.xl,
      borderTopRightRadius: Spacing.xl,
      borderColor: Colors.defaultBackground,
    },
    header: {
      marginTop: Spacing.xl,
      marginHorizontal: Spacing.xl,
      backgroundColor: Colors.white,
      borderRadius: Spacing.m,
      paddingVertical: Spacing.xlg,
      paddingHorizontal: Spacing.lg,
      paddingBottom: Spacing.ml,
    },
    headerSection: {
      ...Layout.row,
      ...Layout.fill,
      gap: 14,
      ...Layout.alignItemsCenter,
    },
    headerDesc: {
      ...Layout.fill,
    },
    iconContainer: {
      ...Layout.center,
      width: 48,
      height: 48,
    },
    Icon: {
      width: 16,
      height: 16,
      padding: Spacing.xl,
    },
    actionButtonsContainer: {
      ...Layout.fill,
      ...Layout.justifyContentBetween,
    },
    main: {
      marginTop: 48,
      backgroundColor: Colors.white,
      borderTopLeftRadius: Spacing.xl,
      borderTopRightRadius: Spacing.xl,
    },
    section: {
      paddingHorizontal: Spacing.xl,
      paddingVertical: Spacing.xlg,
    },
    lastSection: {
      marginBottom: Spacing.xlg,
    },
  });
};
