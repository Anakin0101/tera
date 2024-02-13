import useTheme from 'hooks/useTheme';
import { StyleSheet } from 'react-native';

export const useStyles = () => {
  const { Spacing } = useTheme();
  return StyleSheet.create({
    button: {
      marginVertical: Spacing.ml,
      paddingVertical: 14,
    },
    disabled: {
      opacity: 0.5,
    },
  });
};
