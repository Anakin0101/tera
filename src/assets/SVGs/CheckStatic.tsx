import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { Colors } from 'theme/Variables';

export const CheckStatic = ({ fillColor = Colors.checkColor }) => (
  <Svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M13.7484 3.69231C14.1389 4.08283 14.1389 4.716 13.7484 5.10652L6.54675 12.3082C6.15622 12.6987 5.52306 12.6987 5.13253 12.3082L2.25188 9.4275C1.86135 9.03698 1.86135 8.40381 2.25188 8.01329C2.6424 7.62276 3.27557 7.62276 3.66609 8.01329L5.83964 10.1868L12.3342 3.69231C12.7247 3.30178 13.3579 3.30178 13.7484 3.69231Z"
      fill={fillColor}
    />
  </Svg>
);
