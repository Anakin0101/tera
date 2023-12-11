import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

export const TabBarProfile = (props: SvgProps) => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
    <Path
      d="M2.25 6A.75.75 0 013 5.25h18a.75.75 0 010 1.5H3A.75.75 0 012.25 6zM2.25 12a.75.75 0 01.75-.75h18a.75.75 0 010 1.5H3a.75.75 0 01-.75-.75zM3 17.25a.75.75 0 000 1.5h18a.75.75 0 000-1.5H3z"
      fill="#1D1D1D"
      fillOpacity={0.4}
    />
  </Svg>
);
