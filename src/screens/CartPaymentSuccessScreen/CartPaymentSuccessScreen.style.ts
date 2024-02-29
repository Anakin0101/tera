import useTheme from 'hooks/useTheme';
import { StyleSheet } from 'react-native';

export const useStyles = () => {
  const { Colors, Spacing, Layout, Fonts, FontSize } = useTheme();

  return StyleSheet.create({
    container: {
      ...Layout.fill,
      backgroundColor: Colors.white,
    },
    wrapper: {
      flex: 0.6,
      ...Layout.center,
      justifyContent: 'flex-end',
    },
    headerTitle: {
      fontSize: FontSize.large,
      letterSpacing: -0.5,
      color: Colors.textBlack,
      ...Fonts.medium,
      lineHeight: 34,
      textAlign: 'center',
      marginTop: Spacing.xxxl,
      marginHorizontal: Spacing.xxl,
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
      ...Fonts.medium,
      lineHeight: 22,
    },
    moneyLabelBlack: {
      color: Colors.textBlack,
    },
    buttonLabel: {
      fontSize: FontSize.small,
      letterSpacing: -0.2,
      ...Fonts.medium,
      lineHeight: 16,
      marginHorizontal: Spacing.m,
      marginVertical: Spacing.xxs,
    },
    flatListWrapper: {
      flex: 0.4,
    },
    contentContainerStyle: {
      paddingBottom: 80,
      marginTop: Spacing.xxxl,
    },
  });
};
