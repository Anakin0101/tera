import * as React from 'react';
import Svg, { SvgProps, Rect, Path } from 'react-native-svg';

export const Add = (props: SvgProps) => (
  <Svg width={56} height={56} fill="none" {...props}>
    <Rect width={56} height={56} fill="#FEFEFE" rx={28} />
    <Path
      fill="#A0226D"
      fillRule="evenodd"
      d="M28 21.25a.75.75 0 0 1 .75.75v5.25H34a.75.75 0 0 1 0 1.5h-5.25V34a.75.75 0 0 1-1.5 0v-5.25H22a.75.75 0 0 1 0-1.5h5.25V22a.75.75 0 0 1 .75-.75Z"
      clipRule="evenodd"
    />
  </Svg>
);
