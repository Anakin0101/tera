import * as React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';

export const ConvertSvg = (props: SvgProps) => {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16.47 20.47a.75.75 0 101.06 1.06l4-4a.75.75 0 000-1.06l-4-4a.75.75 0 10-1.06 1.06l2.72 2.72H7a.75.75 0 000 1.5h12.19l-2.72 2.72zm-8.94-10a.75.75 0 11-1.06 1.06l-4-4a.75.75 0 010-1.06l4-4a.75.75 0 011.06 1.06L4.81 6.25H17a.75.75 0 010 1.5H4.81l2.72 2.72z"
        fill="#A0226D"
      />
    </Svg>
  );
};
