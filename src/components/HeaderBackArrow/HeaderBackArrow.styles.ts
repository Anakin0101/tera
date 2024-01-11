import { StyleSheet } from 'react-native';
import { Spacing } from 'theme/Variables';
export const useStyles = () => {
  return StyleSheet.create({
    wrapper: {
      marginLeft: Spacing.lg,
      width: 24,
      height: 24,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
};
