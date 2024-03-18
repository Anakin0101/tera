import useTheme from 'hooks/useTheme';
import { StyleSheet } from 'react-native';

export const useStyles = () => {
  const { Spacing, Layout, Fonts } = useTheme();
  return StyleSheet.create({
    container: {
      ...Layout.alignItemsCenter,
    },
    iconContainer: {
      ...Layout.center,
      width: 64,
      height: 64,
      borderRadius: 32,
    },
    button: {
      paddingVertical: Spacing.m,
      marginTop: 40,
    },
    buttonText: {
      ...Fonts.medium,
    },
  });
};
