import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

export const List = (props: SvgProps) => (
  <Svg width={24} height={24} fill="none" {...props}>
    <Path
      fill="#A0226D"
      fillRule="evenodd"
      d="M3.75 5a1.25 1.25 0 1 1 2.5 0 1.25 1.25 0 0 1-2.5 0ZM5 2.25a2.75 2.75 0 1 0 0 5.5 2.75 2.75 0 0 0 0-5.5ZM10.25 5a.75.75 0 0 1 .75-.75h10a.75.75 0 0 1 0 1.5H11a.75.75 0 0 1-.75-.75Zm.75 6.25a.75.75 0 0 0 0 1.5h10a.75.75 0 0 0 0-1.5H11Zm0 7a.75.75 0 0 0 0 1.5h10a.75.75 0 0 0 0-1.5H11Zm-6-7.5a1.25 1.25 0 1 0 0 2.5 1.25 1.25 0 0 0 0-2.5ZM2.25 12a2.75 2.75 0 1 1 5.5 0 2.75 2.75 0 0 1-5.5 0Zm1.5 7a1.25 1.25 0 1 1 2.5 0 1.25 1.25 0 0 1-2.5 0ZM5 16.25a2.75 2.75 0 1 0 0 5.5 2.75 2.75 0 0 0 0-5.5Z"
      clipRule="evenodd"
    />
  </Svg>
);
