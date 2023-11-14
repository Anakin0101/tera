import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

export const Error = (props: SvgProps) => (
  <Svg width={24} height={26} fill="none" {...props}>
    <Path
      fill="#E22D20"
      fillRule="evenodd"
      d="M22 13c0 5.983-4.477 10.833-10 10.833S2 18.983 2 13C2 7.017 6.477 2.167 12 2.167S22 7.017 22 13ZM12 7.917a.75.75 0 0 1 .75.75v5.416a.75.75 0 0 1-1.5 0V8.667a.75.75 0 0 1 .75-.75Zm0 10.5c.552 0 1-.485 1-1.084 0-.598-.448-1.083-1-1.083s-1 .485-1 1.083c0 .599.448 1.084 1 1.084Z"
      clipRule="evenodd"
    />
  </Svg>
);
