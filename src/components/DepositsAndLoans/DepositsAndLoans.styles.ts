import { StyleSheet } from 'react-native';
import { useTheme } from 'hooks';
import { moderateScale } from 'utils/config';

export const useStyles = (seeAll?: boolean) => {
  const { Layout, Colors, Spacing, Fonts } = useTheme();
  return StyleSheet.create({
    listContainer: {
      backgroundColor: Colors.white,
    },
    bold: {
      ...Fonts.textBold,
    },
    seeAll: {
      borderWidth: 1,
      borderRadius: 20,
      marginTop: Spacing.xl,
      paddingVertical: Spacing.s,
      ...Layout.alignItemsCenter,
      borderColor: Colors.inputBlack50,
    },
    list: {
      paddingHorizontal: Spacing.xl,
    },
    account: {
      ...Layout.row,
    },
    cardContainer: {
      ...Layout.center,
      width: moderateScale(48),
      height: moderateScale(48),
      borderWidth: 1,
      borderRadius: Spacing.xl,
      borderColor: Colors.inputBlack50,
    },
    interest: {
      ...Layout.alignItemsCenter,
      backgroundColor: Colors.inputBlack50,
      borderRadius: 48,
      paddingHorizontal: moderateScale(20),
      paddingVertical: moderateScale(7),
    },
    detailsWrapper: {
      ...Layout.fill,
      marginLeft: Spacing.s,
    },
    details: {
      ...Layout.row,
      ...Layout.alignItemsCenter,
      ...Layout.justifyContentBetween,
    },
    fee: {
      ...Layout.alignItemsCenter,
      backgroundColor: Colors.lightRed,
      borderRadius: 48,
      paddingHorizontal: moderateScale(20),
      paddingVertical: moderateScale(7),
    },
    header: {
      marginTop: Spacing.s,
      marginBottom: seeAll ? Spacing.xlm : Spacing.ml,
    },
    textContainer: {
      ...Layout.fill,
      marginRight: Spacing.md,
    },
  });
};
