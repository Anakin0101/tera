import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

export const Fail = (props: SvgProps) => (
  <Svg width={40} height={40} fill="none" {...props}>
    <Path
      fill="#FDFDFD"
      fillOpacity={0.98}
      fillRule="evenodd"
      d="M8.98 8.98a1.44 1.44 0 0 1 2.036 0l8.783 8.783 8.783-8.784a1.44 1.44 0 0 1 2.037 2.037l-8.783 8.783 8.783 8.783a1.44 1.44 0 1 1-2.037 2.037L19.8 21.836l-8.783 8.783a1.44 1.44 0 1 1-2.037-2.037l8.784-8.783-8.784-8.783a1.44 1.44 0 0 1 0-2.037Z"
      clipRule="evenodd"
    />
  </Svg>
);
