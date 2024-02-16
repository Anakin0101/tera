import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

export const Plus = ({ color = '#A0226D', width = 14, height = 14, ...props }: SvgProps) => (
  <Svg width={width} height={height} viewBox="0 0 24 24" fill="none" {...props}>
    <Path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M12 4.41602C12.4418 4.41602 12.8 4.77419 12.8 5.21602V11.2005H18.7844C19.2263 11.2005 19.5844 11.5586 19.5844 12.0005C19.5844 12.4423 19.2263 12.8005 18.7844 12.8005H12.8V18.7849C12.8 19.2267 12.4418 19.5849 12 19.5849C11.5582 19.5849 11.2 19.2267 11.2 18.7849V12.8005H5.21553C4.7737 12.8005 4.41553 12.4423 4.41553 12.0005C4.41553 11.5586 4.7737 11.2005 5.21553 11.2005H11.2V5.21602C11.2 4.77419 11.5582 4.41602 12 4.41602Z"
      fill={color}
      fill-opacity="0.98"
    />
  </Svg>
);
