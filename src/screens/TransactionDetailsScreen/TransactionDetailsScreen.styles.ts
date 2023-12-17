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
      padding: Spacing.xlg,
      paddingBottom: Spacing.ml,
    },
    headerSection: {
      ...Layout.row,
      gap: 14,
    },
    iconContainer: {
      ...Layout.center,
      width: 48,
      height: 48,

      borderWidth: 1,
      borderRadius: Spacing.xl,
      borderColor: Colors.inputBlack50,
    },
    marginTop: {
      marginTop: 5,
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
  });
};
