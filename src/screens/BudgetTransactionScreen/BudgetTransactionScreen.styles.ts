import { StyleSheet } from 'react-native';
import { useTheme } from 'hooks';

export const useStyles = () => {
  const { Layout, Colors, Spacing, Fonts } = useTheme();
  return StyleSheet.create({
    container: {
      ...Layout.fill,
      backgroundColor: Colors.white,
      paddingHorizontal: Spacing.xl,
    },
    budgetTitle: {
      ...Fonts.titleregularPlus,
    },
    button: {
      marginTop: 70,
      marginBottom: Spacing.xlm,
      paddingVertical: Spacing.ml,
    },
    buttonText: {
      ...Fonts.medium,
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
