import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

export const CheckLarge = (props: SvgProps) => (
  <Svg width={48} height={48} fill="none" {...props}>
    <Path
      fill="#FDFDFD"
      fillOpacity={0.98}
      fillRule="evenodd"
      d="M39.547 12.368a2.6 2.6 0 0 1 0 3.677L19.96 35.632a2.6 2.6 0 0 1-3.677 0l-7.835-7.835a2.6 2.6 0 1 1 3.677-3.677l5.996 5.996L35.87 12.368a2.6 2.6 0 0 1 3.677 0Z"
      clipRule="evenodd"
    />
  </Svg>
);
