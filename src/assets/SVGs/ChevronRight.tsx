import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

export const ChevronRight = (props: SvgProps) => (
  <Svg width={24} height={24} fill="none" {...props}>
    <Path
      fill="#1C1C1C"
      fillOpacity={0.98}
      fillRule="evenodd"
      d="M9.47 5.47a.75.75 0 0 1 1.06 0l6 6a.75.75 0 0 1 0 1.06l-6 6a.75.75 0 1 1-1.06-1.06L14.94 12 9.47 6.53a.75.75 0 0 1 0-1.06Z"
      clipRule="evenodd"
    />
  </Svg>
);
