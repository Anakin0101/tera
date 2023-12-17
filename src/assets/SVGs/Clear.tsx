import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

export const Clear = (props: SvgProps) => (
  <Svg width={13} height={12} fill="none" {...props}>
    <Path
      fill="#A0226D"
      fillRule="evenodd"
      d="M1.803 1.305a.8.8 0 0 1 1.131 0L6.5 4.87l3.566-3.565a.8.8 0 0 1 1.131 1.131L7.631 6.002l3.566 3.565a.8.8 0 0 1-1.131 1.132L6.5 7.133 2.934 10.7a.8.8 0 0 1-1.131-1.132l3.566-3.565-3.566-3.566a.8.8 0 0 1 0-1.131Z"
      clipRule="evenodd"
    />
  </Svg>
);
