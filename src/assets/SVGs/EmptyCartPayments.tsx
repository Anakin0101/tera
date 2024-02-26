import * as React from 'react';
import Svg, { SvgProps, Rect, Path } from 'react-native-svg';

export const EmptyCartPayments = (props: SvgProps) => (
  <Svg width="93" height="75" viewBox="0 0 93 75" fill="none" {...props}>
    <Rect width="93" height="75" rx="16" fill="#F9F1F6" />
    <Path d="M8 21C8 13.268 14.268 7 22 7H71C78.732 7 85 13.268 85 21V25H8V21Z" fill="white" />
    <Rect x="10" y="37" width="34" height="8" rx="4" fill="white" />
  </Svg>
);
