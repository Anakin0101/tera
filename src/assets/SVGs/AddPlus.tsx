import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

export const AddPlus = (props: SvgProps) => (
  <Svg width={24} height={24} fill="none" {...props}>
    <Path
      fill="#FDFDFD"
      fillOpacity={0.98}
      fillRule="evenodd"
      d="M12 4.416a.8.8 0 0 1 .8.8V11.2h5.984a.8.8 0 1 1 0 1.6H12.8v5.985a.8.8 0 0 1-1.6 0V12.8H5.216a.8.8 0 0 1 0-1.6H11.2V5.216a.8.8 0 0 1 .8-.8Z"
      clipRule="evenodd"
    />
  </Svg>
);
