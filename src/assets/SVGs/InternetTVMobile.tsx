import React from 'react';
import Svg, { SvgProps, Path, Defs, ClipPath, Rect, G } from 'react-native-svg';

export const InternetTVMobile = (props: SvgProps) => (
  <Svg width="24" height="23" viewBox="0 0 24 23" {...props}>
    <Defs>
      <ClipPath id="b">
        <Rect width="24" height="23" />
      </ClipPath>
    </Defs>
    <G id="a" clip-path="url(#b)">
      <Rect width="24" height="23" fill="#fff" />
      <Path
        d="M69.274,2.883l4,3.137,3.715-2.835L78.046,2.4"
        transform="translate(-61.303 -1.172)"
        fill="none"
        stroke="#a0226d"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="1.8"
      />
      <Path
        d="M73.145,6.282h4.561s3.7-.044,3.76,3.249,0,7.053,0,7.053.057,3.636-4.452,3.655-8.146-.076-8.146-.076-3.864.114-4.016-3.277,0-6.839,0-6.839a3.36,3.36,0,0,1,3.5-3.618C72.108,6.315,73.145,6.282,73.145,6.282Z"
        transform="translate(-61 -1.433)"
        fill="none"
        stroke="#a0226d"
        stroke-width="1.8"
      />
      <Path
        d="M69.8,21.348l-1.25,2.141"
        transform="translate(-61.254 -2.449)"
        fill="none"
        stroke="#a0226d"
        stroke-linecap="round"
        stroke-width="1.8"
      />
      <Path
        d="M77.878,21.25l1.286,2.49"
        transform="translate(-61.882 -2.442)"
        fill="none"
        stroke="#a0226d"
        stroke-linecap="round"
        stroke-width="1.8"
      />
    </G>
  </Svg>
);
