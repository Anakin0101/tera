import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

export const ArrowDown = (props: SvgProps) => (
  <Svg width={12} height={12} viewBox="0 0 12 12" fill="none" {...props}>
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M1.1 3.232a.9.9 0 011.272 0L6 6.86l3.628-3.628a.9.9 0 011.273 1.273L6.636 8.77a.9.9 0 01-1.272 0L1.099 4.505a.9.9 0 010-1.273z"
      fill="#1D1D1D"
      fillOpacity={0.4}
    />
  </Svg>
);
