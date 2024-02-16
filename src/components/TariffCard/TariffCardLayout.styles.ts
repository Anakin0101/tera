import { StyleSheet } from 'react-native';
import useTheme from 'hooks/useTheme';

export const useStyles = () => {
  const { FontSize, Spacing, Layout, Colors, FontFamily } = useTheme();

  const statusGeneralStyle = {
    ...Layout.center,
    height: 28,
    width: 80,
    borderRadius: Spacing.lg,
  };

  return StyleSheet.create({
    cardContainer: {
      ...Layout.row,
      ...Layout.center,
      ...Layout.justifyContentBetween,
      marginHorizontal: Spacing.xl,
      borderRadius: Spacing.ml,
      borderWidth: 1,
      borderColor: Colors.inputBlack50,
      height: 126,
      padding: Spacing.xl,
      marginBottom: Spacing.ml,
    },
    row: {
      ...Layout.row,
    },
    iconWrapper: {
      width: 48,
      height: 48,
      marginRight: Spacing.lg,
    },
    cardName: {
      color: Colors.textBlack,
      fontSize: FontSize.regular,
      fontFamily: FontFamily.medium,
      marginRight: Spacing.s,
    },
    commission: {
      color: Colors.accountText500,
      fontSize: FontSize.small,
      fontFamily: FontFamily.medium,
    },
    statusWrapper: {
      ...statusGeneralStyle,
      backgroundColor: Colors.successToastTextColor,
    },
    pandingWrapper: {
      ...statusGeneralStyle,
      backgroundColor: Colors.pandingYellow,
    },
    statusText: {
      color: Colors.white,
      fontSize: FontSize.tiny,
      lineHeight: Spacing.lg,
      fontFamily: FontFamily.medium,
    },
  });
};
