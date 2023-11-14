import useTheme from 'hooks/useTheme';
import { Platform, StyleSheet } from 'react-native';

export const useStyleTheme = () => {
  const { FontSize, Spacing, Layout, BorderRadius, Colors, Fonts } = useTheme();
  return StyleSheet.create({
    container: {
      ...Layout.row,
      ...Layout.justifyContentBetween,
      ...Layout.alignItemsCenter,
      backgroundColor: Colors.headerBackground,
      paddingHorizontal: Spacing.ml,
      // TODO !! - think of a better solution here for notch
      paddingTop: Platform.OS === 'ios' ? Spacing.xxl : Spacing.ml,
      height: 96,
    },
    initialContainer: {
      height: 116,
    },
    leftContainer: {
      ...Layout.row,
      ...Layout.justifyContentStart,
    },
    centerContainer: {
      ...Layout.growfull,
      ...Layout.rowCenter,
      paddingHorizontal: 'auto',
      marginHorizontal: 'auto',
      minWidth: '60%',
    },
    rightContainer: {
      ...Layout.row,
      ...Layout.justifyContentEnd,
      maxWidth: '30%',
      ...Layout.growfull,
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
      fontSize: FontSize.regularPlus,
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
