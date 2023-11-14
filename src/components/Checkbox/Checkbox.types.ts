import { StyleProp, TextStyle } from 'react-native';

export type CheckboxProps = {
  isChecked: boolean;
  label?: string;
  disabled?: boolean;
  checkedColor?: string;
  style?: StyleProp<TextStyle>;
  labelStyle?: StyleProp<TextStyle>;
  onChange: (value: boolean) => void;
};
