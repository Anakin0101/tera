import * as React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';

export const TinyChevron = (props: SvgProps) => {
  return (
    <Svg width={10} height={10} viewBox="0 0 10 10" fill="none" {...props}>
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2.693.915a.75.75 0 011.06 0l3.554 3.554a.75.75 0 010 1.06L3.753 9.083a.75.75 0 11-1.06-1.06l3.023-3.024-3.023-3.023a.75.75 0 010-1.061z"
        fill="#A0226D"
      />
    </Svg>
  );
};
