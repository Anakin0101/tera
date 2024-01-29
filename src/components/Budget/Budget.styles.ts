import { StyleSheet } from 'react-native';
import { useTheme } from 'hooks';

export const useStyles = () => {
  const { Layout, Colors, Spacing, FontFamily, Fonts } = useTheme();
  return StyleSheet.create({
    container: {
      ...Layout.fill,
      backgroundColor: Colors.white,
      paddingHorizontal: Spacing.xl,
    },
    budgetTitle: {
      ...Fonts.titleregularPlus,
    },
    budgetView: {
      ...Layout.row,
      ...Layout.justifyContentCenter,
      backgroundColor: Colors.textLightBlue,
      borderRadius: Spacing.m,
      paddingHorizontal: Spacing.lg,
      paddingVertical: Spacing.ml,
    },
    budgetData: {
      ...Fonts.titleTiny,
    },
    button: {
      marginTop: Spacing.lg,
      marginBottom: Spacing.xlm,
      paddingVertical: Spacing.ml,
    },
    buttonText: {
      fontFamily: FontFamily.medium,
    },
  });
};
