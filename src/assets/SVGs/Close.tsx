import React from 'react';
import Svg, { SvgProps, G, Path, Defs, ClipPath } from 'react-native-svg';

export const Close = (props: SvgProps) => (
  <Svg width={16} height={16} fill="none" {...props}>
    <G clipPath="url(#a)">
      <Path
        fill="#1D1D1D"
        fillOpacity={0.84}
        fillRule="evenodd"
        d="M1.08 1.08a.9.9 0 0 1 1.273 0L8 6.727l5.647-5.647a.9.9 0 0 1 1.273 1.273L9.273 8l5.647 5.647a.9.9 0 0 1-1.273 1.273L8 9.273 2.353 14.92a.9.9 0 1 1-1.273-1.273L6.727 8 1.08 2.353a.9.9 0 0 1 0-1.273Z"
        clipRule="evenodd"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 0h16v16H0z" />
      </ClipPath>
    </Defs>
  </Svg>
);
