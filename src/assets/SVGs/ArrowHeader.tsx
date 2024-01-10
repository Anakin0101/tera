import React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

export const ArrowHeader = (props: SvgProps) => (
  <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" {...props}>
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M15.7782 4.22062C16.2078 4.6502 16.2078 5.34668 15.7782 5.77626L9.55603 11.9984L15.7782 18.2206C16.2078 18.6502 16.2078 19.3467 15.7782 19.7763C15.3486 20.2058 14.6521 20.2058 14.2226 19.7763L7.22257 12.7763C6.793 12.3467 6.793 11.6502 7.22257 11.2206L14.2226 4.22062C14.6521 3.79104 15.3486 3.79104 15.7782 4.22062Z"
      fill="#1D1D1D"
      fillOpacity="0.84"
    />
  </Svg>
);
