import { StyleSheet } from 'react-native';
import { useTheme } from 'hooks';
import { Spacing } from 'theme/Variables';

export const useStyles = () => {
  const { Layout, Colors } = useTheme();

  return StyleSheet.create({
    scrollView: {
      ...Layout.fill,
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
      backgroundColor: Colors.white,
      borderTopLeftRadius: Spacing.xl,
      borderTopRightRadius: Spacing.xl,
      marginTop: Spacing.xlg,
    },
    inner: {
      paddingHorizontal: Spacing.xl,
      paddingVertical: Spacing.m,
    },
    detailsItem: {
      ...Layout.fullWidth,
      ...Layout.rowHCenter,
      ...Layout.justifyContentBetween,
      marginTop: 6,
    },
    footer: {
      paddingHorizontal: Spacing.xl,
      paddingVertical: Spacing.ml,
      marginTop: 45,
      borderTopWidth: 1,
      borderTopColor: Colors.inputBlack50,
    },
    checkbox: {
      ...Layout.row,
    },
    button: {
      marginTop: 26,
      paddingVertical: 14,
    },
    disabled: {
      opacity: 0.5,
    },
    loader: {
      ...Layout.center,
      ...Layout.absolute,
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
    },
    fill: {
      ...Layout.fill,
    },
  });
};
