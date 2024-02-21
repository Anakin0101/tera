import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

export const Error = (props: SvgProps) => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M22 12c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2s10 4.477 10 10zM12 7.25a.75.75 0 01.75.75v5a.75.75 0 01-1.5 0V8a.75.75 0 01.75-.75zM12 17a1 1 0 100-2 1 1 0 000 2z"
      fill="#E22D20"
    />
  </Svg>
);
