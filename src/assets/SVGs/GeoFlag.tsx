import React from 'react';
import Svg, { SvgProps, G, Path, Mask, Rect } from 'react-native-svg';

export const GeoFlag = (props: SvgProps) => (
  <Svg width={19} height={18} viewBox="0 0 19 18" fill="none" {...props}>
    <Mask id="a" maskUnits="userSpaceOnUse" x={0} y={0} width={19} height={18}>
      <Rect x={0.5} width={18} height={18} rx={9} fill="#C4C4C4" />
    </Mask>
    <G mask="url(#a)">
      <Path d="M24.497 0H-5.505v18h30.002V0z" fill="#fff" />
      <Path
        d="M-5.505 0v1.4L2.163 6h2.332l-10-6zm13.2 0v7.2h-13.2v3.598h13.2V18h3.6v-7.203h13.202V7.2H11.296V0h-3.6zm14.469 0l-9.669 5.8V6h2l10-6h-2.331zM4.47 12l-9.975 6h2.332l9.668-5.8V12H4.47zm10.026 0l10 6v-1.399l-7.667-4.6h-2.333z"
        fill="#C8102E"
      />
      <Path
        d="M-1.995 0l8.49 5.1V0h-8.49zm14.491 0v5.101L20.998 0h-8.502zm-18 2.1V6H.996l-6.502-3.9zm30 0l-6.5 3.9h6.5V2.1zm-30 9.9v3.902L.995 12h-6.5zm23.502 0l6.499 3.946V12h-6.5zm-5.502.9V18H21l-8.503-5.1zm-6 0L-2.006 18h8.502v-5.1z"
        fill="#012169"
      />
    </G>
  </Svg>
);
