import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

export const Budget = (props: SvgProps) => (
  <Svg width={24} height={22} fill="none" {...props}>
    <Path
      fill="#A0226D"
      fillRule="evenodd"
      stroke="#fff"
      strokeLinejoin="round"
      strokeWidth={0.5}
      d="M11 1.236a2.237 2.237 0 0 1 2 0l9.107 4.554c2.006 1.002 1.292 4.025-.95 4.025H2.843c-2.242 0-2.956-3.023-.95-4.025L11 1.236Zm9.683 6.342L12 3.237 3.317 7.578h17.366ZM.816 19.881c0-.618.5-1.118 1.118-1.118h2.237v-6.71a1.118 1.118 0 1 1 2.237 0v6.71h4.474v-6.71a1.118 1.118 0 1 1 2.236 0v6.71h4.474v-6.71a1.118 1.118 0 1 1 2.237 0v6.71h2.236a1.118 1.118 0 1 1 0 2.236H1.936c-.618 0-1.119-.5-1.119-1.118Z"
      clipRule="evenodd"
    />
  </Svg>
);
