import * as React from 'react';
import Svg, { Circle, Path, SvgProps } from 'react-native-svg';

export const SuccessTransaction = (props: SvgProps) => {
  return (
    <Svg width={80} height={80} viewBox="0 0 80 80" fill="none" {...props}>
      <Circle cx={40} cy={40} r={40} fill="#43B64B" />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M55.548 28.37a2.6 2.6 0 010 3.678L35.962 51.634a2.6 2.6 0 01-3.677 0L24.451 43.8a2.6 2.6 0 113.676-3.677l5.996 5.996L51.871 28.37a2.6 2.6 0 013.677 0z"
        fill="#FDFDFD"
        fillOpacity={0.98}
      />
    </Svg>
  );
};
