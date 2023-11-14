import * as React from 'react';
import Svg, { SvgProps, G, Path } from 'react-native-svg';

export const CheckShield = (props: SvgProps) => (
  <Svg width={59} height={60} fill="none" {...props}>
    <G filter="url(#a)">
      <Path
        fill="#43B64B"
        d="M28.687 52.11a2.49 2.49 0 0 0 2.31.008C50.38 41.812 51.84 21.52 51.847 15.75a2.385 2.385 0 0 0-1.43-2.186l-19.393-8.69a2.426 2.426 0 0 0-1.962-.005L9.73 13.394a2.39 2.39 0 0 0-1.438 2.147c-.107 5.741.963 26.086 20.394 36.57Z"
      />
    </G>
    <G filter="url(#b)">
      <Path
        fill="#fff"
        fillRule="evenodd"
        d="M42.076 18.473a3.014 3.014 0 0 1 .012 4.262L29.49 35.405a3.014 3.014 0 0 1-4.173.098l-5.85-5.361a3.014 3.014 0 0 1 4.073-4.443l3.716 3.405 10.558-10.618a3.014 3.014 0 0 1 4.262-.013Z"
        clipRule="evenodd"
      />
    </G>
  </Svg>
);
