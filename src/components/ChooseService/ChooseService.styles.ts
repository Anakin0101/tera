import { StyleSheet } from 'react-native';
import { useTheme } from 'hooks';

export const useStyles = () => {
  const { Layout, Colors, Spacing } = useTheme();

  return StyleSheet.create({
    cotentContainer: {
      gap: 20,
      paddingRight: 30,
    },
    flatlist: {
      marginLeft: Spacing.xl,
    },
    header: {
      padding: Spacing.xl,
    },
    wrapper: {
      ...Layout.center,
      ...Layout.flexWrap,
      maxWidth: 80,
    },
    iconContainer: {
      ...Layout.center,
      width: 56,
      height: 56,
      borderRadius: 28,
      borderWidth: 1,
      borderColor: Colors.inputBlack50,
    },
    textContainer: {
      marginTop: Spacing.m,
    },
  });
};
