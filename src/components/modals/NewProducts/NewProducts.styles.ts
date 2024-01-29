import useTheme from 'hooks/useTheme';
import { StyleSheet } from 'react-native';

export const useStyles = () => {
  const { Layout, Colors, Spacing } = useTheme();
  return StyleSheet.create({
    wrapper: {
      marginVertical: Spacing.xl,
    },
    container: {
      ...Layout.rowHCenter,
      gap: Spacing.m,
    },
    iconContainer: {
      ...Layout.center,
      borderWidth: 1,
      width: Spacing.xxxl,
      height: Spacing.xxxl,
      borderRadius: Spacing.xl,
      borderColor: Colors.inputBlack50,
    },
    image: {
      width: Spacing.xl,
      height: Spacing.xl,
    },
  });
};
