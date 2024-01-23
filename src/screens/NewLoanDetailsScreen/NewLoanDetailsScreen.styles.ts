import { StyleSheet } from 'react-native';
import { useTheme } from 'hooks';
import { Spacing } from 'theme/Variables';

export const useStyles = () => {
  const { Layout, Colors } = useTheme();

  return StyleSheet.create({
    growfull: {
      ...Layout.growfull,
    },
    headerContainer: {
      backgroundColor: Colors.white,
      padding: Spacing.ml,
      marginTop: Spacing.xlg,
      borderRadius: Spacing.m,
      marginHorizontal: Spacing.xl,
    },
    headerItem: {
      ...Layout.rowHCenter,
      gap: Spacing.m,
    },
    headerItemRow: {
      ...Layout.rowHCenter,
      ...Layout.justifyContentBetween,
      marginVertical: Spacing.xl,
    },
    iconContainer: {
      ...Layout.center,
      width: Spacing.xxxl,
      height: Spacing.xxxl,
      borderRadius: Spacing.xl,
      borderWidth: 1,
      borderColor: Colors.inputBlack50,
    },
    image: {
      ...Layout.fullHeight,
      ...Layout.fullWidth,
      borderRadius: Spacing.xl,
    },
    main: {
      flex: 1,
      backgroundColor: Colors.white,
      borderTopLeftRadius: Spacing.xl,
      borderTopRightRadius: Spacing.xl,
      marginTop: Spacing.xlg,
    },
    inner: {
      paddingHorizontal: Spacing.xl,
      paddingVertical: Spacing.m,
    },
    buttonContainer: {
      paddingBottom: Spacing.ml,
      paddingHorizontal: Spacing.xl,
      backgroundColor: Colors.white,
    },
    button: {
      paddingVertical: 14,
    },
  });
};
