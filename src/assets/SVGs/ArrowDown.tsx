import * as React from 'react';
import { Svg, Path, SvgProps } from 'react-native-svg';

export const ArrowDown = (props: SvgProps & { rotation?: number }) => {
  const { rotation = 0, ...restProps } = props;

  return (
    <Svg
      width={props.width ?? 12}
      height={props.height ?? 12}
      viewBox="0 0 12 12"
      fill="none"
      {...restProps}
    >
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M1.1 3.232a.9.9 0 011.272 0L6 6.86l3.628-3.628a.9.9 0 011.273 1.273L6.636 8.77a.9.9 0 01-1.272 0L1.099 4.505a.9.9 0 010-1.273z"
        fill={props.fill ?? '#1D1D1D'}
        fillOpacity={props.fill ? 1 : 0.4}
        transform={`rotate(${rotation} 6 6)`}
      />
    </Svg>
  );
};
