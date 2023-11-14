import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

export const FullStar = (props: SvgProps) => (
  <Svg width={14} height={14} fill="none" {...props}>
    <Path
      fill="#FFC423"
      fillRule="evenodd"
      d="M7.468.938a.522.522 0 0 0-.936 0l-1.63 3.321-3.228.475a.522.522 0 0 0-.292.886l2.42 2.412-.81 3.572a.522.522 0 0 0 .747.58L7 10.504l3.261 1.68a.522.522 0 0 0 .748-.58l-.811-3.572 2.42-2.412a.522.522 0 0 0-.292-.886L9.098 4.26 7.468.938Z"
      clipRule="evenodd"
    />
  </Svg>
);
