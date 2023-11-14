import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

export const Alert = ({ color = '#E22D20', ...props }: SvgProps) => (
  <Svg width={16} height={16} fill="none" {...props}>
    <Path
      fill={color}
      fillRule="evenodd"
      d="M15 8A7 7 0 1 1 1 8a7 7 0 0 1 14 0ZM8 4.45a.75.75 0 0 1 .75.75v3.5a.75.75 0 0 1-1.5 0V5.2A.75.75 0 0 1 8 4.45Zm0 7.05a.7.7 0 1 0 0-1.4.7.7 0 0 0 0 1.4Z"
      clipRule="evenodd"
    />
  </Svg>
);
