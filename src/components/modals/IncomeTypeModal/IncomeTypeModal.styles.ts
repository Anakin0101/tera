import useTheme from 'hooks/useTheme';
import { StyleSheet } from 'react-native';

export const useStyles = () => {
  const { Layout, Spacing } = useTheme();

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
    buttonContainer: {
      marginTop: Spacing.ml,
    },
    button: {
      paddingVertical: 14,
    },
  });
};
