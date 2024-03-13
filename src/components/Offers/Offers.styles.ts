import { StyleSheet } from 'react-native';
import { useTheme } from 'hooks';
import { config, horizontalScale } from 'utils/config';

const padding = config.mobileWidth - horizontalScale(320) - 24;

export const useStyles = () => {
  const { Spacing, Layout, Colors, Fonts, FontSize } = useTheme();

  const generaWrapperlStyle = {
    ...Layout.row,
    borderRadius: Spacing.m,
    height: 180,
    padding: Spacing.lg,
    // aspectRatio: 16 / 9,
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
      backgroundColor: Colors.successToastTextColor,
      width: 100,
      borderRadius: 50,
    },
    footer: {
      ...Layout.fill,
      ...Layout.justifyContentEnd,
      marginHorizontal: Spacing.xl,
    },
    disbursementContainer: {
      ...Layout.row,
      padding: 26,
      height: 180,
      width: horizontalScale(320),
      borderRadius: Spacing.m,
      backgroundColor: Colors.offerBgGreen,
      gap: Spacing.xl,
    },
    image: {
      ...Layout.overflowHidden,
      height: 180,
      width: horizontalScale(320),
      borderRadius: Spacing.m,
    },
    content: {
      flex: 1,
      marginTop: Spacing.xxs,
    },
    button: {
      ...Layout.alignSelfStart,
      backgroundColor: Colors.successToastTextColor,
      paddingVertical: Spacing.xxs,
      paddingHorizontal: Spacing.s,
      marginTop: Spacing.m,
    },
  });
};
