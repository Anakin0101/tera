import React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

export const Swap = (props: SvgProps) => (
  <Svg width={24} height={24} fill="none" {...props}>
    <Path
      fill="#A0226D"
      fillRule="evenodd"
      d="M7.53 3.53a.75.75 0 0 0-1.06-1.06l-4 4a.75.75 0 0 0 0 1.06l4 4a.75.75 0 0 0 1.06-1.06L4.81 7.75H17a.75.75 0 0 0 0-1.5H4.81l2.72-2.72Zm8.94 10a.75.75 0 1 1 1.06-1.06l4 4a.75.75 0 0 1 0 1.06l-4 4a.75.75 0 1 1-1.06-1.06l2.72-2.72H7a.75.75 0 0 1 0-1.5h12.19l-2.72-2.72Z"
      clipRule="evenodd"
    />
  </Svg>
);
