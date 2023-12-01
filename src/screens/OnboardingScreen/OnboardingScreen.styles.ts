import { StyleSheet } from 'react-native';
import { verticalScale } from 'utils/config';

export const useStyleTheme = () => {
  return StyleSheet.create({
    wrapper: {
      marginTop: verticalScale(60),
    },
  });
};
