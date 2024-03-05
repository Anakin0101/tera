import useTheme from 'hooks/useTheme';
import { StyleSheet } from 'react-native';

export const useStyleTheme = () => {
  const { Spacing, Layout } = useTheme();
  return StyleSheet.create({
    buttonContainer: {
      ...Layout.fullWidth,
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
    },
    container: {
      margin: Spacing.m,
      justifyContent: 'center',
      alignItems: 'center',
    },
    leftIcon: {
      marginRight: Spacing.xs,
    },
  });
};
