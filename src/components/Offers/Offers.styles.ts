import { StyleSheet } from 'react-native';
import { useTheme } from 'hooks';
import { horizontalScale } from 'utils/config';

export const useStyles = (padding: number) => {
  const { Spacing, Layout, Colors, Fonts, FontSize } = useTheme();
  return StyleSheet.create({
    list: {
      marginLeft: Spacing.xl,
    },
    contentContainer: {
      gap: Spacing.m,
      paddingRight: padding,
    },
    title: {
      margin: Spacing.xl,
      ...Fonts.textBold,
      fontSize: FontSize.regular,
      fontWeight: '400',
    },
    offer: {
      ...Layout.row,
      borderRadius: Spacing.m,
      backgroundColor: 'rgb(231, 243, 232)',
      width: horizontalScale(320),
      height: 180,
      padding: 20,
    },
    offersWrapper: {
      backgroundColor: Colors.white,
      paddingBottom: 2,
    },
    headerWrapper: {
      ...Layout.row,
      ...Layout.alignItemsCenter,
      ...Layout.justifyContentBetween,
      width: '90%',
    },
    titleContainer: {
      ...Fonts.textBold,
      fontSize: FontSize.regular,
      fontWeight: '400',
    },
    offerDesc: {
      ...Layout.fill,
      marginLeft: Spacing.m,
      marginTop: Spacing.xs,
    },
    more: {
      ...Layout.alignItemsCenter,
      marginTop: Spacing.l,
      paddingVertical: Spacing.xxs,
      backgroundColor: '#43B64B',
      width: 100,
      borderRadius: 50,
    },
    footer: {
      ...Layout.fill,
      ...Layout.justifyContentEnd,
      marginHorizontal: Spacing.xl,
    },
  });
};
