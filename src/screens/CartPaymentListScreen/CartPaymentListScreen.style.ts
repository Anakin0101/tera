import useTheme from 'hooks/useTheme';
import { StyleSheet } from 'react-native';
import StaticSafeAreaInsets from 'react-native-static-safe-area-insets';
import { FontFamily, FontSize } from 'theme/Variables';

export const useStyles = () => {
  const { Colors, Spacing, Layout } = useTheme();

  return StyleSheet.create({
    container: {
      ...Layout.fill,
      backgroundColor: Colors.white,
    },
    listWrapper: {
      paddingTop: Spacing.xl,
      paddingBottom: 120,
    },
    buttonText: {
      fontSize: FontSize.regular,
      lineHeight: 20,
      letterSpacing: -0.5,
      fontFamily: FontFamily.medium,
      paddingVertical: Spacing.xxs,
    },
    buttonContainer: {
      zIndex: 2,
      position: 'absolute',
      width: '100%',
      bottom: Spacing.s + StaticSafeAreaInsets.safeAreaInsetsBottom,
    },
    btnContainer: {
      marginHorizontal: Spacing.xl,
      marginTop: Spacing.lg,
    },
    detailsWrapper: {
      marginTop: Spacing.s,
    },
    detailsContainer: {
      ...Layout.row,
      marginHorizontal: Spacing.xl,
      ...Layout.justifyContentBetween,
      marginTop: Spacing.s,
    },
    detailsTitle: {
      fontSize: FontSize.small,
      lineHeight: 16,
      letterSpacing: -0.2,
      color: Colors.textBlack500,
      fontFamily: FontFamily.medium,
      fontWeight: '400',
    },
    detailsValue: {
      fontSize: FontSize.small,
      lineHeight: 16,
      letterSpacing: -0.2,
      color: Colors.textBlack,
      fontFamily: FontFamily.medium,
    },
    headerButton: {
      width: 40,
      height: 40,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: Spacing.xl,
      borderWidth: 1,
      borderRadius: 40,
      borderColor: Colors.borderColor,
      marginBottom: Spacing.md,
    },
  });
};
