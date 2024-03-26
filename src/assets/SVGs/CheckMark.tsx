import React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

export const CheckMark = ({ color = '#A0226D', ...props }: SvgProps) => (
  <Svg width={14} height={10} viewBox="0 0 14 10" fill="none" {...props}>
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12.748.691a1 1 0 010 1.415L5.547 9.307a1 1 0 01-1.415 0l-2.88-2.88a1 1 0 111.414-1.415L4.84 7.186 11.334.69a1 1 0 011.414 0z"
      fill={color ?? '#1D1D1D'}
      fillOpacity={props?.fillOpacity ?? 1}
    />
  </Svg>
);
