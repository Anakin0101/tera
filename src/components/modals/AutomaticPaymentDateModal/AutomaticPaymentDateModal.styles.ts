import useTheme from 'hooks/useTheme';
import { StyleSheet } from 'react-native';

export const useStyles = () => {
  const { Spacing, Layout, Colors } = useTheme();
  return StyleSheet.create({
    container: {
      marginTop: Spacing.ml,
    },
    buttonContainer: {
      marginTop: Spacing.xl,
    },
    button: {
      paddingVertical: Spacing.ml,
    },
    row: {
      ...Layout.row,
      ...Layout.justifyContentBetween,
      height: 50,
    },
    dateWrapper: {
      ...Layout.fill,
      ...Layout.center,
    },
    dateContainer: {
      ...Layout.center,
      height: 30,
      width: 30,
    },
    selected: {
      backgroundColor: Colors.primary,
      borderRadius: 15,
    },
    disabled: {
      opacity: 0.5,
    },
  });
};
