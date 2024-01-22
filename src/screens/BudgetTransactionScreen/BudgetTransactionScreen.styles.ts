import { StyleSheet } from 'react-native';
import { useTheme } from 'hooks';
import { FontFamily } from 'theme/Variables';

export const useStyles = () => {
  const { Layout, Colors, Spacing, FontSize } = useTheme();
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
    button: {
      marginTop: 70,
      marginBottom: 30,
      paddingVertical: Spacing.ml,
    },
    buttonText: {
      fontFamily: FontFamily.medium,
    },
    list: {
      backgroundColor: Colors.white,
    },
    contentContainer: {
      flexGrow: 1,
    },
    footer: {
      ...Layout.fill,
      ...Layout.justifyContentEnd,
      marginHorizontal: Spacing.xl,
    },
  });
};
