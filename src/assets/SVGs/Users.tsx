import * as React from 'react';
import Svg, { SvgProps, Rect, Path } from 'react-native-svg';

export const Users = (props: SvgProps) => (
  <Svg width={56} height={56} fill="none" {...props}>
    <Rect width={56} height={56} fill="#FEFEFE" rx={28} />
    <Path
      fill="#A0226D"
      fillRule="evenodd"
      d="M20.75 23a3.25 3.25 0 1 1 6.5 0 3.25 3.25 0 0 1-6.5 0ZM24 18.25a4.75 4.75 0 1 0 0 9.5 4.75 4.75 0 0 0 0-9.5Zm6 0a.75.75 0 0 0 0 1.5 3.25 3.25 0 0 1 0 6.5.75.75 0 0 0 0 1.5 4.75 4.75 0 1 0 0-9.5Zm-8 13.5A3.25 3.25 0 0 0 18.75 35c0 .69.56 1.25 1.25 1.25h8c.69 0 1.25-.56 1.25-1.25A3.25 3.25 0 0 0 26 31.75h-4ZM17.25 35A4.75 4.75 0 0 1 22 30.25h4A4.75 4.75 0 0 1 30.75 35 2.75 2.75 0 0 1 28 37.75h-8A2.75 2.75 0 0 1 17.25 35ZM32 30.25a.75.75 0 0 0 0 1.5h2A3.25 3.25 0 0 1 37.25 35c0 .69-.56 1.25-1.25 1.25h-4a.75.75 0 0 0 0 1.5h4A2.75 2.75 0 0 0 38.75 35 4.75 4.75 0 0 0 34 30.25h-2Z"
      clipRule="evenodd"
    />
    <Rect width={55} height={55} x={0.5} y={0.5} stroke="#1D1D1D" strokeOpacity={0.05} rx={27.5} />
  </Svg>
);
