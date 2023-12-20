import * as React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';

export const Invoice = (props: SvgProps) => {
  return (
    <Svg width={22} height={22} viewBox="0 0 22 22" fill="none" {...props}>
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M15.655 3.753a2.917 2.917 0 00-4.124 0l-6.482 6.482a4.75 4.75 0 106.717 6.717l7.13-7.13a.75.75 0 011.06 1.06l-7.13 7.13a6.25 6.25 0 11-8.838-8.838l6.482-6.482a4.417 4.417 0 116.246 6.246l-6.482 6.482a2.583 2.583 0 01-3.653-3.653l6.482-6.482a.75.75 0 011.06 1.06l-6.482 6.482a1.083 1.083 0 001.533 1.532l6.481-6.481a2.917 2.917 0 000-4.125z"
        fill="#1C1C1C"
        fillOpacity={0.98}
      />
    </Svg>
  );
};
