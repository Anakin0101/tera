import useTheme from 'hooks/useTheme';
import { StyleSheet } from 'react-native';
import { FontFamily, FontSize } from 'theme/Variables';

export const useStyles = () => {
  const { Colors, Spacing, Layout } = useTheme();

  return StyleSheet.create({
    container: {},
    wrapper: {
      marginHorizontal: Spacing.xl,
    },
    headerWrapper: {
      ...Layout.fill,
      flexWrap: 'nowrap',
      paddingVertical: Spacing.xxs,
      paddingRight: Spacing.xl,
      marginLeft: Spacing.xxs,
    },
    headerTitle: {
      fontSize: FontSize.small,
      letterSpacing: -0.5,
      color: Colors.textBlack500,
      fontFamily: FontFamily.medium,
      lineHeight: 16,
    },
    providerWrapper: {
      backgroundColor: Colors.white,
      borderRadius: 12,
      marginHorizontal: Spacing.xl,
      marginTop: Spacing.xl,
      ...Layout.row,
      ...Layout.alignItemsCenter,
    },
    headerDesc: {
      fontSize: FontSize.regular,
      letterSpacing: -0.5,
      color: Colors.textBlack,
      fontFamily: FontFamily.medium,
      lineHeight: 24,
      marginTop: Spacing.xxs,
    },
    iconStyle: {
      width: 48,
      height: 48,
      borderWidth: 1,
      borderColor: Colors.borderColor,
    },
    nextButtonWrapper: {
      marginTop: Spacing.ml,
      marginHorizontal: Spacing.xl,
    },
  });
};
