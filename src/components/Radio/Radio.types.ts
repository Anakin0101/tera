import { StyleProp, ViewStyle } from 'react-native';

export type RadioProps = {
  value: string;
  isSelected: boolean;
  disabled?: boolean;
  label?: string;
  style?: StyleProp<ViewStyle>;
  onPress: (value: string) => void;
};
