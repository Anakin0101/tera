import { StyleSheet } from 'react-native';
import { useTheme } from 'hooks';

export const useStyles = () => {
  const { Layout, Colors, Spacing, FontSize, FontFamily } = useTheme();
  return StyleSheet.create({
    container: {
      ...Layout.fill,
      backgroundColor: Colors.white,
      paddingHorizontal: Spacing.xl,
    },
    budgetTitle: {
      fontSize: FontSize.regularPlus,
      color: Colors.textBlack,
      fontWeight: '400',
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
      fontSize: FontSize.tiny,
      fontWeight: '400',
      color: Colors.textBlack,
    },
    button: {
      marginTop: 20,
      marginBottom: 30,
      paddingVertical: Spacing.ml,
    },
    buttonText: {
      fontFamily: FontFamily.medium,
    },
  });
};
