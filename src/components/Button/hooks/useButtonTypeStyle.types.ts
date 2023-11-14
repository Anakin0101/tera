import { StyleProp, TextStyle, ViewStyle } from 'react-native';

export type ButtonStyleType = {
  containerStyle?: StyleProp<ViewStyle>;
  wrapperStyle?: StyleProp<ViewStyle>;
  wrapperDisabledStyle?: StyleProp<ViewStyle>;
  wrapperBorderStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  leftIcon?: StyleProp<ViewStyle>;
  rightIcon?: StyleProp<ViewStyle>;
};
