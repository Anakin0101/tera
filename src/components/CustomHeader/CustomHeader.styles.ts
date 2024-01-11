import useTheme from 'hooks/useTheme';
import { StyleSheet } from 'react-native';
import { verticalScale } from 'utils/config';

export const useStyleTheme = () => {
  const { FontSize, Spacing, Layout, BorderRadius, Colors, Fonts } = useTheme();
  return StyleSheet.create({
    container: {
      ...Layout.row,
      ...Layout.justifyContentBetween,
      ...Layout.alignItemsCenter,
      backgroundColor: Colors.dashboardBackground,
      height: verticalScale(50),
    },
    initialContainer: {
      // height: verticalScale(104),
    },
    whiteBackground: {
      backgroundColor: Colors.white,
    },
    leftContainer: {
      ...Layout.row,
      ...Layout.justifyContentStart,
      marginLeft: Spacing.ml,
      height: '100%',
      alignItems: 'center',
    },
    withBackButtonStyle: {
      marginLeft: -Spacing.xlg,
    },
    centerContainer: {
      ...Layout.growfull,
      ...Layout.rowCenter,
      height: '100%',
    },
    rightContainer: {
      ...Layout.row,
      ...Layout.justifyContentEnd,
      marginRight: Spacing.ml,
      ...Layout.absolute,
      right: 0,
    },
    componentsWrapper: {
      ...Layout.row,
    },
    text: {
      color: Colors.titleBlack,
      ...Fonts.textCenter,
      fontSize: FontSize.small,
    },
    accountText: { color: Colors.accountText500, ...Fonts.textCenter, fontSize: FontSize.tiny },
    isInitialScreenText: {
      ...Fonts.textBold,
      fontSize: FontSize.regular,
    },
    iconCommonStyles: {
      width: 32,
      height: 32,
      ...Layout.center,
    },
    iconRoundedStyles: {
      borderRadius: BorderRadius.full,
      borderColor: Colors.gray200,
      borderWidth: 1,
      padding: Spacing.xs,
      margin: Spacing.xs,
    },
    borderBottom: {
      borderBottomWidth: 1,
      borderBottomColor: Colors.gray200,
    },
  });
};
