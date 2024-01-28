import * as React from 'react';
import Svg, { Path, SvgProps, Circle } from 'react-native-svg';

export const FailedSvg = ({ width, height, ...props }: SvgProps) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 80 80" fill="none" {...props}>
      <Circle cx={40} cy={40} r={40} fill="#E22D20" />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M28.98 28.98a1.44 1.44 0 012.037 0l8.784 8.784 8.783-8.783a1.44 1.44 0 012.036 2.036l-8.783 8.784 8.783 8.783a1.44 1.44 0 11-2.036 2.036L39.8 41.837l-8.784 8.783a1.44 1.44 0 01-2.036-2.036l8.783-8.783-8.783-8.784a1.44 1.44 0 010-2.036z"
        fill="#FDFDFD"
        fillOpacity={0.98}
      />
    </Svg>
  );
};
