import { StyleSheet } from 'react-native';
import { useTheme } from 'hooks';
import { useDefaultHeaderHeight } from 'hooks';
import { config } from 'utils/config';
import { moderateScale } from 'utils/config';

export const useStyles = () => {
  const { headerHeight } = useDefaultHeaderHeight();
  const { Layout, Colors, Spacing, Fonts } = useTheme();
  return StyleSheet.create({
    headerContainer: {
      marginBottom: Spacing.ml,
    },
    listWrapper: {
      backgroundColor: Colors.white,
      flex: 1,
    },
    indicator: { marginTop: Spacing.xl, height: config.mobileHeight - headerHeight - 205 },

    inputContaner: {
      ...Layout.rowHCenter,
      backgroundColor: Colors.secondary,
      paddingHorizontal: Spacing.lg,
      height: 40,
      borderRadius: 40,
    },
    input: {
      marginHorizontal: Spacing.s,
      ...Fonts.regular,
    },
    cardContainer: {
      ...Layout.center,
      width: moderateScale(48),
      height: moderateScale(48),
      borderWidth: 1,
      borderRadius: Spacing.xl,
      borderColor: Colors.inputBlack50,
    },
    detailsWrapper: {
      ...Layout.fill,
      marginLeft: Spacing.m,
    },
    trustIcon: { position: 'absolute', right: 0, top: 30 },
    details: {
      ...Layout.row,
      ...Layout.alignItemsCenter,
      ...Layout.justifyContentBetween,
      marginTop: 5,
    },
    textContainer: {
      ...Layout.fill,
    },
    templates: {
      ...Layout.row,
      paddingHorizontal: Spacing.lg,
    },
    rightAction: {
      width: 40,
      height: 40,
      ...Layout.center,
      borderColor: Colors.inputBlack50,
      borderWidth: 1,
      borderRadius: 50,
    },
    buttonWrapper: {
      width: moderateScale(100),
      ...Layout.row,
      ...Layout.justifyContentAround,
      marginRight: Spacing.lg,
    },
    childrenContainerStyle: {
      backgroundColor: Colors.white,
    },
  });
};
