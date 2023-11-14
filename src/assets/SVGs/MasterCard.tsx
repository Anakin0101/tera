import * as React from 'react';
import Svg, { SvgProps, G, Circle } from 'react-native-svg';

export const MasterCard = (props: SvgProps) => (
  <Svg width={24} height={24} viewBox="0 0 24 24" {...props}>
    <G fill="none" fillRule="evenodd">
      <Circle cx={7} cy={12} r={7} fill="#EA001B" />
      <Circle cx={17} cy={12} r={7} fill="#FFA200" fillOpacity={0.8} />
    </G>
  </Svg>
);
