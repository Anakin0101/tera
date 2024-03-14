import * as React from 'react';
import Svg, { SvgProps, Circle, G, Rect, Defs, LinearGradient, Stop } from 'react-native-svg';

export const OfferPercent = (props: SvgProps) => (
  <Svg width={48} height={48} fill="none" {...props} viewBox="0,0,62,62">
    <Circle cx={31} cy={31} r={31} fill="#43B64B" />
    <Circle cx={31} cy={31} r={30.3} stroke="url(#a)" strokeOpacity={0.14} strokeWidth={1.4} />
    <G filter="url(#b)">
      <Circle cx={25.5} cy={20.5} r={4.5} fill="#fff" />
    </G>
    <G filter="url(#c)">
      <Circle cx={38.5} cy={39.5} r={4.5} fill="#fff" />
    </G>
    <G filter="url(#d)">
      <Rect
        width={29.22}
        height={6.727}
        x={18.379}
        y={38.855}
        fill="#fff"
        rx={3.363}
        transform="rotate(-45 18.379 38.855)"
      />
    </G>
    <Defs>
      <LinearGradient id="a" x1={60} x2={5.5} y1={6} y2={55.5} gradientUnits="userSpaceOnUse">
        <Stop stopColor="#fff" />
        <Stop offset={1} stopColor="#999" />
      </LinearGradient>
    </Defs>
  </Svg>
);
