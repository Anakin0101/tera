import React from 'react';
import Svg, { SvgProps, Path, Defs, G, ClipPath, Mask, Rect } from 'react-native-svg';

export const GeoFlag = (props: SvgProps) => (
  <Svg width={18} height={18} viewBox="0 0 18 18" fill="none" {...props}>
    <Mask id="a" maskUnits="userSpaceOnUse" x={0} y={0} width={18} height={18}>
      <Rect width={18} height={18} rx={9} fill="#C4C4C4" />
    </Mask>
    <G mask="url(#a)">
      <Path d="M18 0H0v18h18V0z" fill="#fff" />
      <G clipPath="url(#clip0_77_2573)">
        <Path d="M0 0h18v18H0V0z" fill="#fff" />
        <Path
          d="M7.267 0h3.466v18H7.267V0zM0 7.2h18v3.6H0V7.2zM1.024 1.759c.404.055.814.055 1.219 0a9.713 9.713 0 000 3.682 4.508 4.508 0 00-1.22 0 9.713 9.713 0 000-3.682z"
          fill="red"
        />
        <Path
          d="M3 3a3.725 3.725 0 000 1 7.857 7.857 0 00-3 0 3.725 3.725 0 000-1c.99.193 2.01.193 3 0zM15.757 1.759c.405.055.815.055 1.22 0a9.711 9.711 0 000 3.682 4.508 4.508 0 00-1.22 0 9.711 9.711 0 000-3.682z"
          fill="red"
        />
        <Path
          d="M18.14 2.967a5.04 5.04 0 000 1.266 8.686 8.686 0 00-3.547 0c.053-.42.053-.846 0-1.266a8.686 8.686 0 003.547 0zM1.024 12.559c.404.055.814.055 1.219 0a9.713 9.713 0 000 3.682 4.506 4.506 0 00-1.22 0 9.713 9.713 0 000-3.682z"
          fill="red"
        />
        <Path
          d="M3.406 13.767c-.053.42-.053.846 0 1.266a8.69 8.69 0 00-3.546 0c.053-.42.053-.846 0-1.266a8.686 8.686 0 003.546 0zM15.757 12.559c.405.055.815.055 1.22 0a9.711 9.711 0 000 3.682 4.507 4.507 0 00-1.22 0 9.711 9.711 0 000-3.682z"
          fill="red"
        />
        <Path
          d="M18.14 13.767c-.053.42-.053.846 0 1.266a8.69 8.69 0 00-3.547 0c.053-.42.053-.846 0-1.266a8.686 8.686 0 003.547 0z"
          fill="red"
        />
      </G>
    </G>
    <Defs>
      <ClipPath id="clip0_77_2573">
        <Path fill="#fff" transform="translate(-.53)" d="M0 0H19.0658V18H0z" />
      </ClipPath>
    </Defs>
  </Svg>
);
