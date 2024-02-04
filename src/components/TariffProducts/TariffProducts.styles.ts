import { StyleSheet } from 'react-native';
import useTheme from 'hooks/useTheme';

export const useStyles = () => {
  const { FontSize, Spacing, Layout, Colors, FontFamily } = useTheme();

  return StyleSheet.create({
    cardWrapper: {
      ...Layout.row,
      ...Layout.justifyContentBetween,
    },
    row: {
      ...Layout.row,
    },
    priceTitle: {
      marginRight: Spacing.md,
      color: Colors.textBlack,
      fontSize: FontSize.regular,
      fontFamily: FontFamily.medium,
    },
    title: {
      color: Colors.accountText500,
      fontSize: FontSize.small,
      fontFamily: FontFamily.medium,
    },
    price: {
      color: Colors.tariffPrice,
      textDecorationLine: 'line-through',
      fontFamily: FontFamily.medium,
    },
    titleWrapper: {
      width: '65%',
    },
    statusWrapper: {
      height: 28,
      minWidth: 90,
      backgroundColor: Colors.success100,
      paddingHorizontal: 10,
      ...Layout.center,
      ...Layout.row,
      borderRadius: Spacing.lg,
    },
    status: {
      color: Colors.successToastTextColor,
      fontFamily: FontFamily.medium,
      fontSize: FontSize.tiny,
      marginRight: Spacing.xxs,
    },
  });
};
