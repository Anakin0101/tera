import { StyleSheet } from 'react-native';
import { useTheme } from 'hooks';

export const useStyles = () => {
  const { Spacing, Layout, Colors } = useTheme();
  return StyleSheet.create({
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
    button: {
      marginTop: 70,
      marginBottom: 30,
    },
  });
};
