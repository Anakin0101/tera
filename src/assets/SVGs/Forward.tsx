import React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

export const Forward = (props: SvgProps) => (
  <Svg width={32} height={32} viewBox="0 0 32 32" fill="none" {...props}>
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12.364 9.363a.9.9 0 011.272 0l6 6a.9.9 0 010 1.273l-6 6a.9.9 0 11-1.272-1.273L17.727 16l-5.363-5.364a.9.9 0 010-1.273z"
      fill="#1D1D1D"
      fillOpacity={0.4}
    />
  </Svg>
);
