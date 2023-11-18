import useTheme from 'hooks/useTheme';
import { StyleSheet } from 'react-native';
import { FontFamily } from 'theme/Variables';

export const useStyles = () => {
  const { Spacing, Layout } = useTheme();
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
      fontFamily: FontFamily.medium,
    },
  });
};
