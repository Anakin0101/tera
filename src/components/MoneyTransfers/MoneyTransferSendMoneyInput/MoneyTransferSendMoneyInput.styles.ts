import { StyleSheet } from 'react-native';
import { useTheme } from 'hooks';

export const useStyles = () => {
  const { Colors, Spacing, FontSize, Layout } = useTheme();

  return StyleSheet.create({
    wrapper: {
      ...Layout.row,
    },
    loaderStyle: {
      width: 50,
      height: 50,
      ...Layout.center,
    },
    itemWrapper: {
      ...Layout.row,
      ...Layout.fill,
    },
    inputStyle: {
      ...Layout.fill,
    },
    inputTextStyle: {
      fontSize: FontSize.large,
      fontWeight: 'bold',
    },
    currencyContainer: {
      ...Layout.justifyContentEnd,
    },
    currencyButton: {
      ...Layout.rowCenter,
      paddingHorizontal: Spacing.md,
      paddingVertical: Spacing.s,
      backgroundColor: Colors.white,
      borderRadius: 8,
      marginLeft: Spacing.s,
      shadowColor: Colors.black,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.1,
      shadowRadius: 4.65,
      elevation: 2,
    },
    currencyButtonLabel: {
      fontSize: FontSize.regularPlus,
      marginRight: Spacing.md,
    },

    title: {
      fontSize: FontSize.small,
      lineHeight: 16,
      color: Colors.accountText500,
      fontWeight: '400',
      letterSpacing: -0.2,
      textTransform: 'uppercase',
    },
    desc: {
      fontSize: FontSize.regular,
      lineHeight: 18,
      color: Colors.primary,
      fontWeight: '400',
      letterSpacing: -0.2,
      textTransform: 'uppercase',
    },
    iconStyle: {
      width: 40,
      height: 40,
      resizeMode: 'contain',
    },
    iconContainer: {
      marginHorizontal: Spacing.lg,
    },
    container: {
      ...Layout.row,
      ...Layout.justifyContentBetween,
      ...Layout.alignItemsCenter,
      marginTop: Spacing.lg,
    },
    content: {
      ...Layout.row,
      ...Layout.alignItemsCenter,
    },
    loadingStyle: {
      marginTop: Spacing.md,
    },
  });
};
