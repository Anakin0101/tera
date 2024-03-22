import { StyleSheet } from 'react-native';
import { useTheme } from 'hooks';
import { FontFamily, FontSize } from 'theme/Variables';

export const useStyles = () => {
  const { Colors, Layout, Spacing } = useTheme();

  return StyleSheet.create({
    wrapper: {
      backgroundColor: Colors.white,
      marginTop: Spacing.lg,
      borderTopRightRadius: Spacing.xl,
      borderTopLeftRadius: Spacing.xl,
      paddingVertical: Spacing.xl,
      ...Layout.fill,
    },
    container: {
      paddingBottom: Spacing.xxxl,
    },
    mainTitle: {
      fontSize: FontSize.regularPlus,
      color: Colors.black,
      letterSpacing: -0.5,
      fontFamily: FontFamily.main,
      paddingHorizontal: Spacing.xl,
    },
    listWrapper: {
      paddingHorizontal: Spacing.xl,
      marginTop: Spacing.xlm,
    },
    itemWrapper: {
      ...Layout.row,
      ...Layout.alignItemsCenter,
    },
    itemWrapperMargin: {
      marginBottom: Spacing.m,
    },
    itemIconWrapper: {
      width: 56,
      height: 56,
      ...Layout.justifyContentCenter,
      ...Layout.alignItemsCenter,
      borderRadius: 50,
      borderWidth: 1,
      borderColor: Colors.borderColor,
      marginRight: Spacing.m,
    },
    contentWrapper: {
      ...Layout.fill,
    },
    contentBorder: {
      borderBottomWidth: 1,
      borderColor: Colors.borderColor,
      marginTop: Spacing.m,
      marginLeft: 68,
    },
    itemTitle: {
      fontSize: FontSize.small,
      letterSpacing: -0.5,
      color: Colors.textBlack,
      fontFamily: FontFamily.main,
      lineHeight: 16,
    },
    itemDesc: {
      fontSize: FontSize.tiny,
      lineHeight: 12,
      letterSpacing: -0.5,
      fontWeight: '400',
      color: Colors.textGray400,
      fontFamily: FontFamily.main,
      marginTop: Spacing.xxs,
    },
    dateLabel: {
      fontSize: FontSize.dwarf,
      lineHeight: 12,
      letterSpacing: -0.5,
      fontWeight: '400',
      color: Colors.textGray400,
      fontFamily: FontFamily.main,
      marginTop: Spacing.xxs,
    },
    valueDateWrapper: {
      ...Layout.alignItemsEnd,
    },
    iconStyle: {
      width: 40,
      height: 40,
      resizeMode: 'contain',
    },
    itemDescWrapper: {
      ...Layout.row,
      marginTop: Spacing.xxs,
    },
    descBorder: {
      ...Layout.fullHeight,
      width: 1,
      backgroundColor: Colors.border,
      marginHorizontal: Spacing.xxs,
    },
    pending: {
      color: Colors.yellow,
    },
    rejected: {
      color: Colors.red,
    },
    success: {
      color: Colors.success,
    },
  });
};
