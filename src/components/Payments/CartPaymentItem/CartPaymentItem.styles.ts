import { StyleSheet } from 'react-native';
import { useTheme } from 'hooks';
import { FontFamily, FontSize } from 'theme/Variables';

export const useStyles = () => {
  const { Colors, Layout, Spacing } = useTheme();

  return StyleSheet.create({
    swipeableWrapper: {
      paddingHorizontal: Spacing.xl,
      backgroundColor: Colors.white,
    },
    itemWrapper: {
      ...Layout.row,
      ...Layout.alignItemsCenter,
      marginLeft: Spacing.m,
    },
    _itemWrapperContainer: {
      ...Layout.row,
      ...Layout.justifyContentBetween,
      ...Layout.alignItemsCenter,
    },
    get itemWrapperContainer() {
      return this._itemWrapperContainer;
    },
    set itemWrapperContainer(value) {
      this._itemWrapperContainer = value;
    },
    itemContainer: {
      ...Layout.row,
      ...Layout.alignItemsCenter,
      marginRight: Spacing.xl,
      flex: 0.8,
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
      marginHorizontal: Spacing.xl,
      marginBottom: Spacing.ml,
    },
    itemTitle: {
      fontSize: FontSize.small,
      letterSpacing: -0.5,
      color: Colors.textBlack,
      fontFamily: FontFamily.medium,
      lineHeight: 16,
    },
    itemDesc: {
      fontSize: FontSize.tiny,
      lineHeight: 12,
      letterSpacing: -0.5,
      fontWeight: '400',
      color: Colors.textBlack,
      fontFamily: FontFamily.medium,
      marginTop: Spacing.xxs,
    },
    allButton: {
      backgroundColor: Colors.white,
      marginTop: Spacing.lg,
      borderWidth: 1,
      borderRadius: 28,
      borderColor: Colors.borderColor,
    },
    allButtonText: {
      fontSize: FontSize.small,
      lineHeight: 20,
      letterSpacing: -0.2,
      fontFamily: FontFamily.medium,
      marginTop: Spacing.xxs,
    },
    headerButtonsWrapper: {
      ...Layout.row,
      ...Layout.alignItemsCenter,
      ...Layout.justifyContentBetween,
      paddingHorizontal: Spacing.xl,
    },
    addTemplateButton: {
      ...Layout.row,
      ...Layout.alignItemsCenter,
      gap: Spacing.xxs,
      backgroundColor: Colors.pink,
      paddingHorizontal: Spacing.m,
      paddingVertical: Spacing.s,
      borderRadius: 28,
    },
    addTemplateText: {
      letterSpacing: -0.2,
      fontSize: FontSize.small,
      lineHeight: 20,
      fontFamily: FontFamily.medium,
    },
    swipeableButtonsWrapper: {
      ...Layout.row,
    },
    swipeableButton: {
      width: 40,
      height: 40,
      ...Layout.center,
      borderWidth: 1,
      borderRadius: 40,
      borderColor: Colors.borderColor,
      marginLeft: Spacing.xl,
      marginTop: Spacing.s,
    },
    editBtnWrapper: {
      marginRight: Spacing.xl,
    },
    priceInputWrapper: {
      flex: 0.2,
    },
    inputStyle: {
      paddingVertical: Spacing.s,
      borderWidth: 1,
      borderColor: Colors.borderColor,
      borderRadius: 12,
      textAlign: 'center',
    },
    itemPrice: {
      fontSize: FontSize.small,
      lineHeight: 16,
      letterSpacing: -0.5,
      color: Colors.error,
      fontFamily: FontFamily.medium,
      marginTop: Spacing.xxs,
    },
    loaderWrapper: {
      paddingVertical: Spacing.xl,
    },
    inputContainerStyle: {
      borderBottomWidth: 0,
    },
    inputColor: {
      color: Colors.error,
    },
  });
};
