import { StyleSheet } from 'react-native';
import { useTheme } from 'hooks';

export const useStyles = () => {
  const { Layout, Spacing, Colors } = useTheme();

  return StyleSheet.create({
    container: {
      ...Layout.fill,
      backgroundColor: Colors.white,
    },
    contentContainer: {
      padding: Spacing.xl,
      paddingTop: 80,
    },
    iconContainer: {
      ...Layout.center,
      ...Layout.selfCenter,
      width: 80,
      height: 80,
      borderRadius: 40,
      backgroundColor: Colors.success,
    },
    wallet: {
      paddingVertical: 14,
      marginTop: 40,
    },
    autoPayment: {
      paddingVertical: 14,
      marginTop: Spacing.m,
    },
    goBack: {
      paddingVertical: 14,
      marginTop: 50,
    },
  });
};
