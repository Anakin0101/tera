import { TOptions } from 'i18next';
import { StyleProp, TextStyle, ViewStyle } from 'react-native';

export interface BadgeProps {
  icon: React.ReactNode;
  label: string;
  height?: number;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  backgroundColor?: string;
  textColor?: string;
  translateProps?: TOptions;
}
