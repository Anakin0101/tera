import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

export const Done = (props: SvgProps) => (
  <Svg width={40} height={40} fill="none" {...props}>
    <Path
      fill="#FDFDFD"
      fillOpacity={0.98}
      fillRule="evenodd"
      d="M32.438 10.694a2.08 2.08 0 0 1 0 2.942L16.77 29.305a2.08 2.08 0 0 1-2.941 0L7.56 23.037a2.08 2.08 0 1 1 2.942-2.941l4.797 4.796 14.198-14.198a2.08 2.08 0 0 1 2.941 0Z"
      clipRule="evenodd"
    />
  </Svg>
);
