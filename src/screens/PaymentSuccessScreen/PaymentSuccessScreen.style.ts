import useTheme from 'hooks/useTheme';
import { StyleSheet } from 'react-native';
import { FontFamily, FontSize } from 'theme/Variables';

export const useStyles = () => {
  const { Colors, Spacing, Layout } = useTheme();

  return StyleSheet.create({
    container: {
      ...Layout.fill,
      backgroundColor: Colors.white,
      ...Layout.center,
    },
    headerTitle: {
      fontSize: FontSize.large,
      letterSpacing: -0.5,
      color: Colors.textBlack,
      fontFamily: FontFamily.medium,
      lineHeight: 34,
      textAlign: 'center',
      marginTop: Spacing.xxxl,
    },
    nextButtonWrapper: {
      marginTop: Spacing.xxxl,
      marginHorizontal: Spacing.xl,
    },
    moneyWrapper: {
      ...Layout.row,
      ...Layout.alignItemsCenter,
      marginTop: Spacing.xl,
    },
    moneyLabel: {
      fontSize: FontSize.small,
      letterSpacing: -0.5,
      color: Colors.textBlack400,
      fontFamily: FontFamily.medium,
      lineHeight: 22,
    },
    moneyLabelBlack: {
      color: Colors.textBlack,
    },
    actionButtonsWrapper: {
      ...Layout.row,
      marginHorizontal: Spacing.xxxl,
      marginTop: Spacing.xl,
    },
    actionContainer: {
      flexWrap: 'nowrap',
      ...Layout.fill,
      ...Layout.center,
    },
    actionButtonLabel: {
      fontSize: FontSize.tiny,
      color: Colors.textBlack,
      fontFamily: FontFamily.medium,
      lineHeight: 14,
      marginTop: Spacing.m,
      textAlign: 'center',
    },
    actionButton: {
      width: 56,
      height: 56,
      ...Layout.center,
      borderWidth: 1,
      borderColor: Colors.borderColor,
      borderRadius: 40,
    },
    buttonLabel: {
      fontSize: FontSize.small,
      letterSpacing: -0.2,
      fontFamily: FontFamily.medium,
      lineHeight: 16,
      marginHorizontal: Spacing.m,
      marginVertical: Spacing.xxs,
    },
  });
};
