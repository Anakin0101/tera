import useTheme from 'hooks/useTheme';
import { StyleSheet } from 'react-native';

export const useStyles = () => {
  const { Layout, Colors, Spacing } = useTheme();
  return StyleSheet.create({
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
