import { StyleSheet } from 'react-native';
import { useTheme } from 'hooks';
import { horizontalScale } from 'utils/config';

export const useStyles = (padding: number) => {
  const { Spacing, Layout, Colors, Fonts, FontSize } = useTheme();

  const generaWrapperlStyle = {
    ...Layout.row,
    borderRadius: Spacing.m,
    height: 180,
    padding: Spacing.lg,
    aspectRatio: 16 / 9,
  };
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
      ...generaWrapperlStyle,
      width: horizontalScale(320),
    },
    offerLengthOne: {
      ...generaWrapperlStyle,
      width: horizontalScale(360),
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
