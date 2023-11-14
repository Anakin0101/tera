import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

export const Lock = (props: SvgProps) => (
  <Svg width={16} height={16} fill="none" {...props}>
    <Path
      fill="#E22D20"
      fillRule="evenodd"
      d="M8 2.083c-.69 0-1.25.56-1.25 1.25v1.395a5.432 5.432 0 0 1 2.5 0V3.333c0-.69-.56-1.25-1.25-1.25Zm-2.75 1.25v1.999a5.417 5.417 0 1 0 5.5 0V3.333a2.75 2.75 0 1 0-5.5 0ZM8 8.583a.75.75 0 0 1 .75.75v1.333a.75.75 0 1 1-1.5 0V9.333a.75.75 0 0 1 .75-.75Z"
      clipRule="evenodd"
    />
  </Svg>
);
