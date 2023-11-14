import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

export const Plus = ({ color = '#A0226D', ...props }: SvgProps) => (
  <Svg width={13} height={12} fill="none" {...props}>
    <Path
      fill={color}
      fillRule="evenodd"
      d="M6.5 2.25a.75.75 0 0 1 .75.75v2.25H9.5a.75.75 0 0 1 0 1.5H7.25V9a.75.75 0 0 1-1.5 0V6.75H3.5a.75.75 0 0 1 0-1.5h2.25V3a.75.75 0 0 1 .75-.75Z"
      clipRule="evenodd"
    />
  </Svg>
);
