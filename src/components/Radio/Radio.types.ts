import { StyleProp, ViewStyle } from 'react-native';

export type RadioProps = {
  isSelected: boolean;
  disabled?: boolean;
  label?: string;
  style?: StyleProp<ViewStyle>;
  onPress?: (value: boolean) => void;
};
