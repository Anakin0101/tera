import React from 'react';
import Svg, { SvgProps, Path, Defs, ClipPath, Rect, G } from 'react-native-svg';

export const ParkingAndFines = (props: SvgProps) => (
  <Svg width="24" height="24" viewBox="0 0 24 24" {...props}>
    <Defs>
      <ClipPath id="a">
        <Rect width="24" height="23" />
      </ClipPath>
      <ClipPath id="c">
        <Rect width="24" height="24" />
      </ClipPath>
    </Defs>
    <G id="b" clip-path="url(#c)">
      <Rect width="24" height="24" fill="#fff" />
      <G transform="translate(0 1)" clip-path="url(#a)">
        <Rect width="24" height="23" fill="#fff" />
        <Path
          d="M81.641,21.594s-11.9-.119-12.455-.107c-.725.038-3.437-.191-3.374-3.7.078-4.344-.094-14.2-.094-14.2L69.265,5.52l3.578-2.062,3.281,2.063,3.688-1.937s-.141,15.3-.078,16.078.8,1.984,1.906,1.938a2.252,2.252,0,0,0,2.219-2.031c.047-1.156,0-7.031,0-7.031H79.985"
          transform="translate(-62 -1)"
          fill="none"
          stroke="#a0226d"
          stroke-linejoin="round"
          stroke-width="2"
        />
        <Path
          d="M68.9,31.64h3.625"
          transform="translate(-61.028 -24)"
          fill="none"
          stroke="#a0226d"
          stroke-linecap="round"
          stroke-width="2"
        />
        <Path
          d="M68.9,31.64h2.578"
          transform="translate(-57.982 -20)"
          fill="none"
          stroke="#a0226d"
          stroke-linecap="round"
          stroke-width="2"
        />
        <Path
          d="M68.9,31.64h2.578"
          transform="translate(-57.982 -16)"
          fill="none"
          stroke="#a0226d"
          stroke-linecap="round"
          stroke-width="2"
        />
        <Path
          d="M68.9,31.64h.031"
          transform="translate(-61.044 -20)"
          fill="none"
          stroke="#a0226d"
          stroke-linecap="round"
          stroke-width="1.8"
        />
        <Path
          d="M68.9,31.64h.031"
          transform="translate(-61.075 -16)"
          fill="none"
          stroke="#a0226d"
          stroke-linecap="round"
          stroke-width="2"
        />
      </G>
    </G>
  </Svg>
);
