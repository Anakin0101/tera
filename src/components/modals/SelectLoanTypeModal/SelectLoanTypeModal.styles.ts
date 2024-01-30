import useTheme from 'hooks/useTheme';
import { StyleSheet } from 'react-native';

export const useStyles = () => {
  const { Spacing, Layout } = useTheme();
  return StyleSheet.create({
    list: {
      marginTop: Spacing.ml,
    },
    item: {
      ...Layout.fill,
      ...Layout.rowHCenter,
      ...Layout.justifyContentBetween,
      paddingVertical: Spacing.xl,
    },
    title: {
      width: '90%',
    },
    footer: {
      marginVertical: Spacing.ml,
    },
    button: {
      paddingVertical: Spacing.ml,
    },
  });
};
