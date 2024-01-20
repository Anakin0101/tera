import React from 'react';
import Svg, { SvgProps, Path, Circle, Rect, G, Defs, ClipPath } from 'react-native-svg';

export const CartIcon = (props: SvgProps) => (
  <Svg width="24" height="23" viewBox="0 0 24 23" {...props}>
    <Defs>
      <ClipPath id="b">
        <Rect width="24" height="23" />
      </ClipPath>
    </Defs>
    <G id="a" clip-path="url(#b)">
      <Rect width="24" height="23" fill="#fff" />
      <Path
        d="M.964,1.716H3.018a4.416,4.416,0,0,1,2.9,2.771c.622,2.15,1.813,5.853,1.813,5.853s.894,2.046,2.214,2.1,7.814.186,8.534,0,1.4-.57,1.891-2.1c.127-.394.156-.357.411-.984a8.667,8.667,0,0,0,.754-2.487c-.02-.837-.171-2.434-2.735-2.383s-12.882,0-12.882,0"
        transform="translate(0.424 -0.051)"
        fill="none"
        stroke="#a0226d"
        stroke-linejoin="round"
        stroke-width="1.8"
      />
      <G
        transform="translate(16.076 15.843)"
        fill="none"
        stroke="#a0226d"
        stroke-linejoin="round"
        stroke-width="1.7"
      >
        <Circle cx="2.942" cy="2.942" r="2.942" stroke="none" />
        <Circle cx="2.942" cy="2.942" r="2.092" fill="none" />
      </G>
      <Path
        d="M11.554,12.522l-3.3.1H7s-2.409.259-2.46,1.942,1.709,2.253,2.9,2.227c1.009-.022,10.565-.007,13.771,0H19.139"
        transform="translate(1.277 -0.09)"
        fill="none"
        stroke="#a0226d"
        stroke-linejoin="round"
        stroke-width="1.8"
      />
      <G
        transform="translate(8.229 15.843)"
        fill="none"
        stroke="#a0226d"
        stroke-linejoin="round"
        stroke-width="1.7"
      >
        <Circle cx="2.942" cy="2.942" r="2.942" stroke="none" />
        <Circle cx="2.942" cy="2.942" r="2.092" fill="none" />
      </G>
    </G>
  </Svg>
);
