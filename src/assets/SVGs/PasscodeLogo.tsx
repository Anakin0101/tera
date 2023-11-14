import * as React from 'react';
import Svg, { Circle, Path, SvgProps } from 'react-native-svg';

export const PasscodeLogo = (props: SvgProps) => {
  return (
    <Svg width={114} height={114} viewBox="0 0 114 114" fill="none" {...props}>
      <Circle cx={57} cy={57} r={57} fill="#fff" />
      <Circle cx={57} cy={57} r={56.5} stroke="#1D1D1D" strokeOpacity={0.05} />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M43 40.5a2.5 2.5 0 100 5 2.5 2.5 0 000-5zM37.5 43a5.5 5.5 0 1111 0 5.5 5.5 0 01-11 0zM43 54.5a2.5 2.5 0 100 5 2.5 2.5 0 000-5zM37.5 57a5.5 5.5 0 1111 0 5.5 5.5 0 01-11 0zm17-14a2.5 2.5 0 115 0 2.5 2.5 0 01-5 0zm2.5-5.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zm0 17a2.5 2.5 0 100 5 2.5 2.5 0 000-5zM51.5 57a5.5 5.5 0 1111 0 5.5 5.5 0 01-11 0zm3 14a2.5 2.5 0 115 0 2.5 2.5 0 01-5 0zm2.5-5.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zm14-25a2.5 2.5 0 100 5 2.5 2.5 0 000-5zM65.5 43a5.5 5.5 0 1111 0 5.5 5.5 0 01-11 0zm3 14a2.5 2.5 0 115 0 2.5 2.5 0 01-5 0zm2.5-5.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11z"
        fill="#A0226D"
      />
    </Svg>
  );
};

export default PasscodeLogo;
