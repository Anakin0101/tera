import { StyleSheet } from 'react-native';
import { useTheme } from 'hooks';
import { FontFamily, FontSize } from 'theme/Variables';

export const useStyles = () => {
  const { Colors, Layout, Spacing } = useTheme();

  return StyleSheet.create({
    wrapper: {
      ...Layout.row,
      ...Layout.justifyContentBetween,
      ...Layout.alignItemsCenter,
      backgroundColor: Colors.white,
      marginHorizontal: Spacing.xl,
      marginTop: Spacing.lg,
      borderRadius: Spacing.m,
      paddingHorizontal: Spacing.ml,
      paddingVertical: Spacing.ml,
    },
    container: {
      ...Layout.row,
    },
    counterWrapper: {
      width: 48,
      height: 48,
      ...Layout.justifyContentCenter,
      ...Layout.alignItemsCenter,
      borderWidth: 1,
      borderRadius: 50,
      borderColor: Colors.borderColor,
      marginRight: Spacing.m,
    },
    counterText: {
      fontSize: FontSize.semiLarge,
      color: Colors.textBlack,
      fontFamily: FontFamily.medium,
    },
    deptTitle: {
      fontSize: FontSize.small,
      color: Colors.accountText500,
      fontFamily: FontFamily.medium,
    },
    deptValue: {
      fontSize: FontSize.regular,
      color: Colors.error,
      fontFamily: FontFamily.medium,
    },
  });
};
