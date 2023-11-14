import useTheme from 'hooks/useTheme';
import { StyleSheet } from 'react-native';

export const useStyleTheme = () => {
  const { Colors } = useTheme();
  return StyleSheet.create({
    containerStyle: {
      // YOUR CONTAINER STYLE
    },
    wrapperStyle: {
      backgroundColor: Colors.transparent,
      //   borderWidth: 1,
    },
    wrapperDisabledStyle: {
      backgroundColor: Colors.gray200,
    },
    wrapperBorderStyle: {
      // YOUR CUSTOM BORDER STYLES
      // borderColor: 'YOUR_BORDER_COLOR',
      // borderWidth: 2,
    },
    textStyle: {
      color: Colors.primary,
    },
  });
};
