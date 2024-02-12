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
      marginBottom: Spacing.lg,
    },
    itemContainer: {
      ...Layout.row,
    },
    icon: {
      width: Spacing.xxxl,
      height: Spacing.xxxl,
      margin: Spacing.zero,
      borderWidth: 1,
      borderColor: Colors.borderColor,
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
