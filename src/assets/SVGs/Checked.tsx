import React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

export const Checked = ({ color = '#A0226D', ...props }: SvgProps) => (
  <Svg width={18} height={18} fill="none" {...props}>
    <Path
      fill={color}
      fillRule="evenodd"
      d="M4 0a4 4 0 0 0-4 4v10a4 4 0 0 0 4 4h10a4 4 0 0 0 4-4V4a4 4 0 0 0-4-4H4ZM2 9.202 7 14l9-8.637L14.59 4 7 11.284 3.41 7.848 2 9.202Z"
      clipRule="evenodd"
    />
  </Svg>
);
