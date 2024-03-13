import { StyleSheet } from 'react-native';
import { useTheme } from 'hooks';

export const useStyles = () => {
  const { Layout, Colors, Spacing } = useTheme();

  return StyleSheet.create({
    pdf: {
      ...Layout.fill,
      backgroundColor: Colors.white,
    },
    buttonContainer: {
      marginHorizontal: Spacing.xl,
      marginBottom: Spacing.xl,
      paddingTop: Spacing.xs,
    },
    button: {
      paddingVertical: 14,
      marginVertical: Spacing.xl,
    },
    loanDocContainer: {
      ...Layout.fill,
      backgroundColor: Colors.white,
    },
    disbaled: {
      opacity: 0.5,
    },
  });
};
