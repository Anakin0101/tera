import * as React from 'react';
import Svg, { SvgProps, Path, Defs, ClipPath, G, Rect } from 'react-native-svg';

export const InsurancePension = (props: SvgProps) => (
  <Svg width="24" height="24" viewBox="0 0 24 24" {...props}>
    <Defs>
      <ClipPath id="clip-SPRK_default_preset_name_custom_1">
        <Rect width="24" height="24" />
      </ClipPath>
    </Defs>
    <G
      id="SPRK_default_preset_name_custom_1"
      data-name="SPRK_default_preset_name_custom – 1"
      clip-path="url(#clip-SPRK_default_preset_name_custom_1)"
    >
      <G id="Group_1" data-name="Group 1" transform="translate(-52.98)">
        <Path
          id="Path_1"
          data-name="Path 1"
          d="M60.608,18.8v2.012a2.346,2.346,0,0,0,2.213,1.81,2.134,2.134,0,0,0,2.012-1.81V12.332h7.554a4.063,4.063,0,0,0,1.534-.2,1.959,1.959,0,0,0,.855-1.868c-.195-2.2-3.046-6.207-5.69-7.615a9.87,9.87,0,0,0-8.3,0,11.828,11.828,0,0,0-5.374,5.23c-.776,1.552-.948,4.512,1.149,4.454s8.018,0,8.018,0"
          transform="translate(0 -0.222)"
          fill="none"
          stroke="#a0226d"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="1.8"
        />
        <Path
          id="Path_2"
          data-name="Path 2"
          d="M66.116,11.824A32.853,32.853,0,0,1,66.2,7.4c.2-3.205,1.512-5.677,4.335-5.738s3.677,3.372,3.726,5.862,0,4.3,0,4.3"
          transform="translate(-5.454 0)"
          fill="none"
          stroke="#a0226d"
          stroke-width="1.8"
        />
      </G>
    </G>
  </Svg>
);
