import * as React from 'react';
import Svg, { SvgProps, Path, Circle } from 'react-native-svg';

export const Warning = (props: SvgProps) => (
  <Svg width="80" height="80" viewBox="0 0 80 80" fill="none" {...props}>
    <Circle cx="40" cy="40" r="40" fill="#FFC423" />
    <Path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M60 40C60 51.0457 51.0457 60 40 60C28.9543 60 20 51.0457 20 40C20 28.9543 28.9543 20 40 20C51.0457 20 60 28.9543 60 40ZM40 30.5C40.8284 30.5 41.5 31.1716 41.5 32V42C41.5 42.8284 40.8284 43.5 40 43.5C39.1716 43.5 38.5 42.8284 38.5 42V32C38.5 31.1716 39.1716 30.5 40 30.5ZM40 50C41.1046 50 42 49.1046 42 48C42 46.8954 41.1046 46 40 46C38.8954 46 38 46.8954 38 48C38 49.1046 38.8954 50 40 50Z"
      fill="#FDFDFD"
      fill-opacity="0.98"
    />
  </Svg>
);
