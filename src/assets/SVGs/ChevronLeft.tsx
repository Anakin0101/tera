import * as React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';

export const ChevronLeft = (props: SvgProps) => {
  return (
    <Svg width={24} height={25} viewBox="0 0 24 25" fill="none" {...props}>
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M14.53 6.345a.75.75 0 010 1.06l-4.868 4.869c-.207.207-.33.33-.414.43a.63.63 0 00-.072.097.25.25 0 000 .148.63.63 0 00.072.098c.084.099.207.222.414.429l4.868 4.869a.75.75 0 11-1.06 1.06L8.6 14.537l-.018-.019c-.182-.182-.35-.35-.478-.5a1.774 1.774 0 01-.355-.602 1.75 1.75 0 010-1.082c.08-.246.217-.439.355-.602.128-.15.296-.318.478-.5l.018-.019 4.869-4.868a.75.75 0 011.06 0z"
        fill="#1D1D1D"
        fillOpacity={0.84}
      />
    </Svg>
  );
};
