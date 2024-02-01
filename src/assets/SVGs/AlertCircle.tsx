import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

export const AlertCircle = (props: SvgProps) => (
  <Svg width={24} height={24} fill="none" {...props}>
    <Path
      fill="#1D5AF2"
      fillRule="evenodd"
      d="M21.392 12c0 5.523-4.354 10-9.724 10s-9.723-4.477-9.723-10S6.298 2 11.668 2c5.37 0 9.724 4.477 9.724 10Zm-9.724-4.75a.75.75 0 0 1 .75.75v5a.75.75 0 0 1-1.5 0V8a.75.75 0 0 1 .75-.75Zm0 9.75c.537 0 .973-.448.973-1s-.436-1-.973-1c-.537 0-.972.448-.972 1s.435 1 .972 1Z"
      clipRule="evenodd"
    />
  </Svg>
);
