import { TextProps as RNTextProps } from 'react-native';
import { TOptions } from 'i18next';

export type TextProps = {
  size?: number;
  color?: string;
  lineHeight?: number;
  uppercase?: boolean;
  center?: boolean;
  label?: boolean;
  title?: boolean;
  headline?: boolean;
  secondary?: boolean;
  special?: boolean;
  translate?: boolean;
  marginTop?: number;
  translateProp?: TOptions;
  bold?: boolean;
  black?: boolean;
  demiBold?: boolean;
  light?: boolean;
  lightItalic?: boolean;
  regular?: boolean;
  medium?: boolean;
} & RNTextProps;
