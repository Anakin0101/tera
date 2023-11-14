import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

export const CheckCircle = (props: SvgProps) => (
  <Svg width={24} height={24} fill="none" {...props}>
    <Path
      fill="#43B64B"
      fillRule="evenodd"
      d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10Zm4.53-12.47a.75.75 0 0 0-1.06-1.06L11 12.94l-1.47-1.47a.75.75 0 0 0-1.06 1.06l2 2a.75.75 0 0 0 1.06 0l5-5Z"
      clipRule="evenodd"
    />
  </Svg>
);
