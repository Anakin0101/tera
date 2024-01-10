import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

export const Percent = (props: SvgProps) => (
  <Svg width={20} height={20} fill="none" {...props}>
    <Path
      fill="#22282F"
      fillRule="evenodd"
      d="M14.497 2.806c.292.182.38.566.198.858L6.36 16.997a.623.623 0 0 1-1.056-.66l8.333-13.333a.623.623 0 0 1 .859-.198ZM5 3.956a1.877 1.877 0 1 0 0 3.755 1.877 1.877 0 0 0 0-3.754ZM1.877 5.835a3.123 3.123 0 1 1 6.246 0 3.123 3.123 0 0 1-6.246 0Zm11.246 8.334a1.877 1.877 0 1 1 3.754 0 1.877 1.877 0 0 1-3.754 0ZM15 11.044a3.123 3.123 0 1 0 0 6.245 3.123 3.123 0 0 0 0-6.245Z"
      clipRule="evenodd"
    />
  </Svg>
);
