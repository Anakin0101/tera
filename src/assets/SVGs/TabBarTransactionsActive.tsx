import * as React from 'react';
import Svg, { Circle, G, Path, SvgProps } from 'react-native-svg';
import { verticalScale } from 'utils/config';

export const TabBarTransactionsActive = (props: SvgProps) => (
  <Svg
    width={48}
    height={48}
    style={{ marginTop: verticalScale(16) }}
    viewBox="0 0 48 48"
    fill="none"
    {...props}
  >
    <Circle cx={24} cy={24} r={24} fill="#A0226D" />
    <G transform="translate(12, 12)">
      <Path
        d="M6.53 2.53a.75.75 0 00-1.06-1.06l-4 4a.75.75 0 000 1.06l4 4a.75.75 0 101.06-1.06L3.81 6.75H16a.75.75 0 000-1.5H3.81l2.72-2.72zM17.47 14.53a.75.75 0 111.06-1.06l4 4a.75.75 0 010 1.06l-4 4a.75.75 0 11-1.06-1.06l2.72-2.72H8a.75.75 0 010-1.5h12.19l-2.72-2.72z"
        fill="#FDFDFD"
        fillOpacity={0.98}
      />
    </G>
  </Svg>
);
