import React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

export const Key = (props: SvgProps) => (
  <Svg width={22} height={22} viewBox="0 0 22 22" fill="none" {...props}>
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M18.864 2.22a.75.75 0 010 1.06l-.387.387 2.22 2.22a.75.75 0 010 1.06l-3.208 3.208a.75.75 0 01-1.061 0l-2.22-2.22-3.527 3.528a5.333 5.333 0 11-1.06-1.06l4.057-4.058 3.208-3.209.917-.916a.75.75 0 011.06 0zm-3.595 4.655l1.69 1.69 2.147-2.148-1.69-1.69-2.147 2.148zm-8.852 3.958a3.833 3.833 0 100 7.667 3.833 3.833 0 000-7.667z"
      fill="#22282F"
    />
  </Svg>
);
