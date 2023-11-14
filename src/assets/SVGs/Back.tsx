import React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

export const Back = (props: SvgProps) => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M15.778 4.22a1.1 1.1 0 010 1.556l-6.222 6.222 6.222 6.223a1.1 1.1 0 01-1.556 1.555l-7-7a1.1 1.1 0 010-1.555l7-7a1.1 1.1 0 011.556 0z"
      fill="#1D1D1D"
      fillOpacity={0.84}
    />
  </Svg>
);
