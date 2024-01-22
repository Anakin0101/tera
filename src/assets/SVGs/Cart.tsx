import React from 'react';
import Svg, { SvgProps, Path, Ellipse, Rect, G, Defs, ClipPath } from 'react-native-svg';

export const CartIcon = (props: SvgProps) => (
  <Svg width="24" height="24" viewBox="0 0 24 24" {...props}>
    <Defs>
      <ClipPath id="a">
        <Rect width="24" height="23" transform="translate(0 0.099)" />
      </ClipPath>
      <ClipPath id="c">
        <Rect width="24" height="24" />
      </ClipPath>
    </Defs>
    <G id="b" clip-path="url(#c)">
      <Rect width="24" height="24" fill="#fff" />
      <G transform="translate(0 0.901)" clip-path="url(#a)">
        <Rect width="24" height="23" transform="translate(0 0.099)" fill="#fff" />
        <Path
          d="M1.035,1.716H3.018A4.424,4.424,0,0,1,5.918,4.5c.622,2.159,1.813,5.878,1.813,5.878s.894,2.055,2.214,2.109,7.814.187,8.534,0,1.4-.572,1.891-2.109c.127-.4.156-.359.411-.988a8.732,8.732,0,0,0,.754-2.5c-.02-.841-.171-2.444-2.735-2.393s-12.882,0-12.882,0"
          transform="translate(0.424 -0.044)"
          fill="none"
          stroke="#a0226d"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
        />
        <G
          transform="translate(16.076 15.911)"
          fill="none"
          stroke="#a0226d"
          stroke-linejoin="round"
          stroke-width="2"
        >
          <Ellipse cx="2.942" cy="2.955" rx="2.942" ry="2.955" stroke="none" />
          <Ellipse cx="2.942" cy="2.955" rx="1.942" ry="1.955" fill="none" />
        </G>
        <Path
          d="M17.286,12.528l-9.037.093H7s-2.409.26-2.46,1.95,1.709,2.263,2.9,2.237c1.009-.022,10.565-.007,13.771,0H19.139"
          transform="translate(1.277 -0.037)"
          fill="none"
          stroke="#a0226d"
          stroke-linejoin="round"
          stroke-width="2"
        />
        <G
          transform="translate(8.229 15.911)"
          fill="none"
          stroke="#a0226d"
          stroke-linejoin="round"
          stroke-width="2"
        >
          <Ellipse cx="2.942" cy="2.955" rx="2.942" ry="2.955" stroke="none" />
          <Ellipse cx="2.942" cy="2.955" rx="1.942" ry="1.955" fill="none" />
        </G>
      </G>
    </G>
  </Svg>
);
