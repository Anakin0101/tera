import * as React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';

export const UserIcon = (props: SvgProps) => {
  return (
    <Svg width={22} height={22} viewBox="0 0 22 22" fill="none" {...props}>
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8.08 6.417a2.917 2.917 0 115.834 0 2.917 2.917 0 01-5.834 0zM10.997 2a4.417 4.417 0 100 8.833 4.417 4.417 0 000-8.833zM5.33 17.417A2.917 2.917 0 018.247 14.5h5.5a2.917 2.917 0 012.917 2.917c0 .598-.485 1.083-1.084 1.083H6.415a1.083 1.083 0 01-1.084-1.083zM8.247 13a4.417 4.417 0 00-4.417 4.417A2.583 2.583 0 006.414 20h9.167a2.583 2.583 0 002.583-2.583A4.417 4.417 0 0013.747 13h-5.5z"
        fill="#22282F"
      />
    </Svg>
  );
};
