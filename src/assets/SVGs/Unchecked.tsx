import React from 'react';
import Svg, { SvgProps, Rect } from 'react-native-svg';

export const Unchecked = (props: SvgProps) => (
  <Svg width={18} height={18} fill="none" {...props}>
    <Rect width={17} height={17} x={0.5} y={0.5} stroke="#1D1D1D" strokeOpacity={0.2} rx={3.5} />
  </Svg>
);
