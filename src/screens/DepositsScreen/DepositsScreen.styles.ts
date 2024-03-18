import { StyleSheet } from 'react-native';
import { useTheme } from 'hooks';

export const useStyles = () => {
  const { Layout, Colors, Spacing, Fonts } = useTheme();
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
      paddingVertical: Spacing.ml,
    },
    buttonText: {
      ...Fonts.medium,
    },
  });
};
