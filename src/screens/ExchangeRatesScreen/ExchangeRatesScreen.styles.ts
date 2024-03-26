import { StyleSheet } from 'react-native';
import { useTheme } from 'hooks';

export const useStyles = () => {
  const { Spacing, Layout, Colors, FontSize } = useTheme();
  return StyleSheet.create({
    container: {
      ...Layout.fill,
      backgroundColor: Colors.white,
      paddingBottom: Spacing.lg,
      borderTopLeftRadius: Spacing.xl,
      borderTopRightRadius: Spacing.xl,
    },
    header: {
      ...Layout.row,
      backgroundColor: Colors.white,
      paddingTop: Spacing.xl,
      paddingBottom: Spacing.m,
      marginTop: Spacing.xl,
      paddingLeft: Spacing.xc,
      borderBottomColor: Colors.dashboardBackground,
      borderBottomWidth: Spacing.one,
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
      borderWidth: Spacing.one,
      margin: Spacing.zero,
    },
    marginTop: {
      top: Spacing.s,
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
      top: Spacing.one,
    },
    buttonContainer: {
      marginHorizontal: Spacing.xl,
    },
    button: {
      paddingVertical: Spacing.reg,
    },
  });
};
