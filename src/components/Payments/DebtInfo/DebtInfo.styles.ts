import { StyleSheet } from 'react-native';
import { useTheme } from 'hooks';
import { FontSize } from 'theme/Variables';

export const useStyles = () => {
  const { Colors, Layout, Spacing, Fonts } = useTheme();

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
      ...Fonts.medium,
    },
    deptTitle: {
      fontSize: FontSize.small,
      color: Colors.accountText500,
      ...Fonts.medium,
    },
    deptValue: {
      fontSize: FontSize.regular,
      color: Colors.error,
      ...Fonts.medium,
    },
  });
};
