import { PressableProps, StyleProp, TextStyle, ViewStyle } from 'react-native';

export type ButtonType = 'Primary' | 'Secondary' | 'Text' | 'Destructive' | 'Outline';

export type ButtonProps = PressableProps & {
  text?: string;
  customWrapperStyle?: StyleProp<ViewStyle>;
  customContainerStyle?: StyleProp<ViewStyle>;
  customTextStyle?: StyleProp<TextStyle>;
  leftIcon?: SvgComponent;
  rightIcon?: SvgComponent;
  customLeftIconStyle?: StyleProp<ViewStyle>;
  customRightIconStyle?: StyleProp<ViewStyle>;
  fullWidth?: boolean;
  fixedWidth?: boolean;
  size?: 'medium' | 'large';
  hasBorder?: boolean;
  disabled?: boolean;
};
