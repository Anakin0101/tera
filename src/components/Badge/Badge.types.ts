import { StyleProp, TextStyle, ViewStyle } from 'react-native';

export interface BadgeProps {
  icon: React.ReactNode;
  label: string;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  backgroundColor?: string;
  textColor?: string;
}
