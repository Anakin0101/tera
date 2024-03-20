import { StyleSheet } from 'react-native';
import useTheme from 'hooks/useTheme';

export const useStyles = () => {
  const { Spacing } = useTheme();

  return StyleSheet.create({
    text: { padding: Spacing.md },
    input: { borderWidth: 0 },
  });
};
