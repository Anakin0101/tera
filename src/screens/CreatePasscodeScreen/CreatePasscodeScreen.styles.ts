import { StyleSheet } from 'react-native';
import { verticalScale } from 'utils/config';

export const useStyleTheme = () => {
  return StyleSheet.create({
    container: {
      marginTop: verticalScale(56),
    },
  });
};
