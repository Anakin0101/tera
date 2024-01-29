import useTheme from 'hooks/useTheme';
import { StyleSheet } from 'react-native';

export const useStyles = () => {
  const { Spacing, Layout, FontFamily } = useTheme();
  return StyleSheet.create({
    header: {
      ...Layout.center,
      marginTop: Spacing.s,
      marginHorizontal: Spacing.s,
    },
    title: {
      marginBottom: Spacing.m,
    },
    button: {
      marginTop: Spacing.xxl,
      paddingVertical: Spacing.m,
    },
    buttonText: {
      fontFamily: FontFamily.medium,
    },
  });
};
