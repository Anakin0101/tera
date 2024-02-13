import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

export const ChevronDownLarge = ({ color = '#000', ...props }: SvgProps) => (
  <Svg width={24} height={24} fill="none" {...props}>
    <Path
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="m6 9 6 6 6-6"
    />
  </Svg>
);
