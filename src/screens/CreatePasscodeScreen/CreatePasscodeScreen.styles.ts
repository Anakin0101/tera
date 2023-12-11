import useTheme from 'hooks/useTheme';
import { StyleSheet } from 'react-native';
import { verticalScale } from 'utils/config';

export const useStyleTheme = () => {
  const { Spacing } = useTheme();

  return StyleSheet.create({
    container: {
      flex: 1,
    },
    wrapper: {
      flex: 1,
      marginTop: verticalScale(44),
      marginBottom: Spacing.lg,
    },
  });
};
