import { StyleSheet } from 'react-native';
import { useTheme } from 'hooks';

export const useStyles = () => {
  const { Spacing, Layout, Colors, FontSize } = useTheme();
  return StyleSheet.create({
    container: {
      ...Layout.fill,
      backgroundColor: Colors.white,
      paddingBottom: 20,
    },
    header: {
      ...Layout.row,
      backgroundColor: Colors.white,
      borderTopLeftRadius: Spacing.xl,
      borderTopRightRadius: Spacing.xl,
      paddingTop: Spacing.xl,
      paddingBottom: Spacing.m,
      marginTop: Spacing.xl,
      paddingLeft: 90,
      borderBottomColor: Colors.dashboardBackground,
      borderBottomWidth: 1,
    },
    list: {
      backgroundColor: Colors.white,
    },
    fill: {
      ...Layout.fill,
    },
    item: {
      ...Layout.row,
      ...Layout.alignItemsCenter,
      backgroundColor: Colors.white,
      paddingLeft: Spacing.xl,
      paddingVertical: Spacing.reg,
    },
    iconContainer: {
      ...Layout.center,
      width: Spacing.xxxl,
      height: Spacing.xxxl,
      borderRadius: Spacing.xl,
      borderColor: Colors.inputBlack50,
      borderWidth: 1,
      margin: Spacing.zero,
    },
    marginTop: {
      // top: Spacing.xs,
      top: 8,
    },
    officialRates: {
      ...Layout.fill,
      marginLeft: Spacing.l,
    },
    teraRates: {
      ...Layout.fill,
      ...Layout.row,
    },
    lineThrough: {
      textDecorationLine: 'line-through',
      fontSize: FontSize.tiny,
      lineHeight: Spacing.ml,
      color: Colors.textBlack500,
    },
    icon: {
      width: Spacing.xlg,
      height: Spacing.xlg,
    },
    officialContainer: {
      ...Layout.rowHCenter,
      gap: Spacing.xs,
    },
    official: {
      ...Layout.rowHCenter,
      gap: Spacing.xxxs,
    },
    top: {
      top: 1,
    },
    buttonContainer: {
      marginHorizontal: Spacing.xl,
    },
    button: {
      paddingVertical: Spacing.reg,
    },
  });
};
