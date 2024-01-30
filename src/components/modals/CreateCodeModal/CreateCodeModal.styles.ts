import useTheme from 'hooks/useTheme';
import { StyleSheet } from 'react-native';

export const useStyles = () => {
  const { Spacing, Layout, Colors, Fonts } = useTheme();
  return StyleSheet.create({
    modalView: {
      ...Layout.row,
      borderBottomWidth: 1,
      borderBottomColor: Colors.inputBlack50,
      paddingVertical: Spacing.md,
    },
    viewWrapper: {
      flex: 1,
      ...Layout.alignItemsCenter,
      marginTop: Spacing.xl,
      paddingHorizontal: Spacing.md,
      borderRightWidth: 1,
      borderRightColor: Colors.inputBlack50,
      height: 30,
    },
    label: {
      ...Fonts.titleregularPlus,
      paddingVertical: Spacing.md,
      marginTop: Spacing.ml,
    },
    loader: {
      height: 100,
      ...Layout.center,
    },
    btn: { position: 'absolute', top: -30 },
    selected: {
      ...Fonts.semiLarge,
    },
    loadingSpinnerContainer: {
      height: 120,
      ...Layout.center,
      backgroundColor: Colors.white,
    },
    loadingSpinner: {
      width: 35,
      height: 35,
    },
  });
};
