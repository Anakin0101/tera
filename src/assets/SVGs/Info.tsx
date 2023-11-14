import React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

export const Info = (props: SvgProps) => (
  <Svg width={20} height={20} viewBox="0 0 20 20" fill="none" {...props}>
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M10 3.25a6.75 6.75 0 100 13.5 6.75 6.75 0 000-13.5zM1.75 10a8.25 8.25 0 1116.5 0 8.25 8.25 0 01-16.5 0zM10 8.417a.75.75 0 01.75.75v4.166a.75.75 0 01-1.5 0V9.167a.75.75 0 01.75-.75zm0-.917a.833.833 0 100-1.667.833.833 0 000 1.667z"
      fill="#22282F"
    />
  </Svg>
);
