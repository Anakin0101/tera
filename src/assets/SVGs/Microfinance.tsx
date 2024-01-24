import * as React from 'react';
import Svg, { SvgProps, Path, Defs, ClipPath, Rect, G, Line } from 'react-native-svg';

export const Microfinance = (props: SvgProps) => (
  <Svg width="24" height="24" viewBox="0 0 24 24" {...props}>
    <Defs>
      <ClipPath id="clip-SPRK_default_preset_name_custom_2">
        <Rect width="24" height="24" />
      </ClipPath>
    </Defs>
    <G
      id="SPRK_default_preset_name_custom_2"
      data-name="SPRK_default_preset_name_custom – 2"
      clip-path="url(#clip-SPRK_default_preset_name_custom_2)"
    >
      <G id="Group_2" data-name="Group 2" transform="translate(-59.457 -0.5)">
        <Line
          id="Line_1"
          data-name="Line 1"
          y2="21"
          transform="translate(71.5 2)"
          fill="none"
          stroke="#a0226d"
          stroke-linecap="round"
          stroke-width="1.8"
        />
        <Path
          id="Path_4"
          data-name="Path 4"
          d="M77.344,8.529s-.231-4.055-3.532-4.107-5.062,0-5.062,0-3.009.484-3.059,3.094.684,2.828,1.117,3.209,8.061,3.088,8.47,3.291a3.456,3.456,0,0,1,2.066,3.078c-.05,1.958-1.4,3.6-2.762,3.706s-4.809,0-4.809,0-4.164-.386-4.2-4.083"
          fill="none"
          stroke="#a0226d"
          stroke-linecap="round"
          stroke-width="1.8"
        />
      </G>
    </G>
  </Svg>
);
