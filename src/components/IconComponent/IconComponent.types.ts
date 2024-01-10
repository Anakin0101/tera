import React from 'react';
import {
  FlexStyle,
  ImageStyle,
  ShadowStyleIOS,
  StyleProp,
  TransformsStyle,
  ViewStyle,
} from 'react-native';
import { SvgProps } from 'react-native-svg';

export interface FastImageStyle extends FlexStyle, TransformsStyle, ShadowStyleIOS {
  backfaceVisibility?: 'visible' | 'hidden';
  borderBottomLeftRadius?: number;
  borderBottomRightRadius?: number;
  backgroundColor?: string;
  borderColor?: string;
  borderWidth?: number;
  borderRadius?: number;
  borderTopLeftRadius?: number;
  borderTopRightRadius?: number;
  overlayColor?: string;
  opacity?: number;
}

export type IconComponentProps = {
  handler?: () => void;
  IconJSX?: (props: SvgProps) => React.JSX.Element;
  native?: boolean;
  pngLocalIcon?: any;
  pngLocalIconCustomStyle?: StyleProp<ImageStyle>;
  customIconComponentStyles?: StyleProp<ViewStyle>;
  hasBorder?: boolean;
  customIconSize?: number;
  imageId?: string;
  customImageIDStyle?: StyleProp<FastImageStyle>;
  fillColor?: string;
  isSecure?: boolean;
  base64Image?: string;
  pressable?: boolean;
};
