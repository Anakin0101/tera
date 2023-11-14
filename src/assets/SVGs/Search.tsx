import React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

export const Search = (props: SvgProps) => (
  <Svg width={20} height={20} viewBox="0 0 20 20" fill="none" {...props}>
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M2.417 9.167a6.75 6.75 0 1113.5 0 6.75 6.75 0 01-13.5 0zm6.75-8.25a8.25 8.25 0 105.28 14.59l2.523 2.524a.75.75 0 001.061-1.06l-2.524-2.525A8.25 8.25 0 009.167.916z"
      fill="#22272F"
    />
  </Svg>
);
