import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

export const ChevronUp = (props: SvgProps) => (
  <Svg width={16} height={16} fill="none" {...props}>
    <Path
      fill="#FDFDFD"
      fillOpacity={0.98}
      fillRule="evenodd"
      d="M3.646 10.354a.5.5 0 0 0 .708 0L8 6.707l3.646 3.647a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 0 0 0 .708Z"
      clipRule="evenodd"
    />
  </Svg>
);
