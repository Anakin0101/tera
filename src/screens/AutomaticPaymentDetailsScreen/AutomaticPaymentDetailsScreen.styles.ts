import useTheme from 'hooks/useTheme';
import { StyleSheet } from 'react-native';

export const useStyles = () => {
  const { Layout, Colors, Spacing, FontSize } = useTheme();
  return StyleSheet.create({
    header: {
      ...Layout.row,
      ...Layout.alignItemsCenter,
      padding: Spacing.ml,
      borderRadius: Spacing.m,
      marginHorizontal: Spacing.xl,
      marginVertical: Spacing.xlg,
      backgroundColor: Colors.white,
    },
    actionIconContainer: {
      ...Layout.center,
      width: 40,
      height: 40,
      borderWidth: 1,
      borderRadius: Spacing.lg,
      borderColor: Colors.inputBlack50,
    },
    icon: {
      width: Spacing.xxxl,
      height: Spacing.xxxl,
      margin: Spacing.zero,
      borderWidth: 1,
      borderColor: Colors.borderColor,
    },
    main: {
      backgroundColor: Colors.white,
      paddingVertical: Spacing.xlg,
      paddingHorizontal: Spacing.xl,
    },
    borderRadius: {
      borderTopLeftRadius: Spacing.xl,
      borderTopRightRadius: Spacing.xl,
    },
    text: {
      fontSize: FontSize.regular,
    },
    debt: {
      color: Colors.error,
    },

    contentContainer: {
      padding: Spacing.xl,
      ...Layout.growfull,
    },
    container: {
      ...Layout.fill,
      backgroundColor: Colors.white,
    },
    wrapper: {
      ...Layout.alignItemsCenter,
      marginHorizontal: 40,
      marginTop: 150,
    },
    button: {
      paddingVertical: 14,
      marginTop: 40,
    },
    itemContainer: {
      ...Layout.row,
    },
    itemIconContainer: {
      ...Layout.center,
      width: Spacing.xxxl,
      height: Spacing.xxxl,
      borderRadius: Spacing.xl,
      borderWidth: 1,
      borderColor: Colors.inputBlack50,
    },
    info: {
      ...Layout.fill,
      marginLeft: Spacing.m,
    },
    itemRow: {
      ...Layout.row,
      ...Layout.justifyContentBetween,
    },
    footer: {
      ...Layout.fill,
      ...Layout.justifyContentEnd,
    },
  });
};
