import { StyleSheet } from 'react-native';
import { Spacing } from 'theme/Variables';
import { verticalScale } from 'utils/config';

export const useStyleTheme = () => {
  return StyleSheet.create({
    wrapper: {
      marginTop: verticalScale(60),
      paddingHorizontal: Spacing.xl - Spacing.xxs,
    },
  });
};
