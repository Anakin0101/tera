import React from 'react';
import Svg, { SvgProps, Path, G, Rect } from 'react-native-svg';

export const AutomaticPayment = (props: SvgProps) => (
  <Svg width="20" height="22" viewBox="0 0 20 22" {...props}>
    <G transform="translate(-599 -373)">
      <Path
        d="M5,1.8A3.2,3.2,0,0,0,1.8,5V15A3.2,3.2,0,0,0,5,18.2H15A3.2,3.2,0,0,0,18.2,15V5A3.2,3.2,0,0,0,15,1.8H5M5,0H15a5,5,0,0,1,5,5V15a5,5,0,0,1-5,5H5a5,5,0,0,1-5-5V5A5,5,0,0,1,5,0Z"
        transform="translate(599 375)"
        fill="#a0226d"
      />
      <Rect width="1.8" height="5" rx="0.9" transform="translate(604 373)" fill="#fff" />
      <Path
        d="M.9,0a.9.9,0,0,1,.9.9V4.1A.9.9,0,1,1,0,4.1V.9A.9.9,0,0,1,.9,0Z"
        transform="translate(604 373)"
        fill="#a0226d"
      />
      <Rect width="1.8" height="5" rx="0.9" transform="translate(612 373)" fill="#fff" />
      <Path
        d="M.9,0a.9.9,0,0,1,.9.9V4.1A.9.9,0,1,1,0,4.1V.9A.9.9,0,0,1,.9,0Z"
        transform="translate(612 373)"
        fill="#a0226d"
      />
      <Rect width="11" height="1.8" rx="0.9" transform="translate(603 380)" fill="#fff" />
      <Path
        d="M.9,0h9.2a.9.9,0,0,1,0,1.8H.9A.9.9,0,0,1,.9,0Z"
        transform="translate(603 380)"
        fill="#a0226d"
      />
      <Rect width="5" height="1.8" rx="0.9" transform="translate(610 389)" fill="#fff" />
      <Path
        d="M.9,0H4.1a.9.9,0,1,1,0,1.8H.9A.9.9,0,1,1,.9,0Z"
        transform="translate(610 389)"
        fill="#a0226d"
      />
    </G>
  </Svg>
);
