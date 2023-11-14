import { DimensionValue, StyleProp, ViewStyle } from 'react-native';

export interface IDividerProps {
  height?: number;
  width?: DimensionValue;
  color?: string;
  style?: StyleProp<ViewStyle>;
  marginTop?: number;
  marginBottom?: number;
}
