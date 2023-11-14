import * as React from 'react';
import Svg, { G, Path, SvgProps } from 'react-native-svg';

export const DeleteKeyIcon = (props: SvgProps) => {
  return (
    <Svg width={32} height={32} viewBox="0 0 32 32" fill="none" {...props}>
      <G fill="#1C1C1C" fillOpacity={0.98}>
        <Path d="M15.214 13.525a.75.75 0 111.061-1.06l2.475 2.474 2.475-2.475a.75.75 0 111.06 1.061L19.811 16l2.474 2.475a.75.75 0 11-1.06 1.06l-2.475-2.474-2.475 2.474a.75.75 0 11-1.06-1.06L17.688 16l-2.475-2.475z" />
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12.121 8.379L4.5 16l7.621 7.621a3 3 0 002.122.879H24.5a3 3 0 003-3v-11a3 3 0 00-3-3H14.243a3 3 0 00-2.122.879zM24.5 23.2H14.243a1.7 1.7 0 01-1.203-.498L6.34 16l6.701-6.702a1.7 1.7 0 011.203-.498H24.5a1.7 1.7 0 011.7 1.7v11a1.7 1.7 0 01-1.7 1.7z"
        />
      </G>
    </Svg>
  );
};
