import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

export const Branch = (props: SvgProps) => (
  <Svg width={22} height={20} viewBox="0 0 22 20" fill="none" {...props}>
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M10.07.819c.58-.29 1.261-.29 1.84 0l8.379 4.189c1.845.922 1.188 3.703-.875 3.703H2.567c-2.063 0-2.72-2.78-.875-3.703L10.07.819zm8.908 5.835L10.99 2.66 3.002 6.654h15.976zM.702 17.97c0-.568.46-1.029 1.029-1.029h2.057V10.77a1.029 1.029 0 112.058 0v6.173h4.116V10.77a1.029 1.029 0 112.057 0v6.173h4.116V10.77a1.029 1.029 0 112.057 0v6.173h2.058a1.029 1.029 0 110 2.058H1.73c-.568 0-1.028-.46-1.028-1.029z"
      fill="#6E6E6E"
      stroke="#fff"
      strokeWidth={0.490061}
      strokeLinejoin="round"
    />
  </Svg>
);
