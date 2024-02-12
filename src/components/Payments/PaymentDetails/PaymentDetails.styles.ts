import { StyleSheet } from 'react-native';
import { useTheme } from 'hooks';
import { FontFamily, FontSize } from 'theme/Variables';

export const useStyles = () => {
  const { Colors, Spacing } = useTheme();

  return StyleSheet.create({
    wrapper: {
      marginTop: Spacing.xlg,
      borderTopLeftRadius: 24,
      borderTopRightRadius: 24,
      paddingVertical: Spacing.xlg,
      paddingHorizontal: Spacing.lg,
      backgroundColor: Colors.white,
    },
    title: {
      fontSize: FontSize.regularPlus,
      lineHeight: 22,
      color: Colors.textBlack,
      fontFamily: FontFamily.medium,
      letterSpacing: -0.2,
    },
    headerTitleStyle: {
      fontSize: FontSize.small,
      lineHeight: 16,
      letterSpacing: -0.5,
      fontFamily: FontFamily.medium,
      color: Colors.textBlack500,
      marginTop: Spacing.xl,
    },
    accountIban: {
      fontSize: FontSize.small,
      lineHeight: 16,
      letterSpacing: -0.5,
      fontFamily: FontFamily.medium,
      color: Colors.textBlack500,
      marginTop: Spacing.xxs,
    },
    moneyLabel: {
      fontSize: FontSize.regular,
      lineHeight: 24,
      letterSpacing: -0.5,
      fontFamily: FontFamily.medium,
      color: Colors.black,
      marginTop: Spacing.xxs,
    },
  });
};
