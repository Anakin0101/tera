import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

export const ATM = (props: SvgProps) => (
  <Svg width={20} height={18} viewBox="0 0 20 18" fill="none" {...props}>
    <Path
      d="M12.208 16.085v.1h1.03c.795 0 1.477-.647 1.477-1.444V3.547h1.724V14.74c0 1.738-1.452 3.159-3.2 3.159h-6.54a3.143 3.143 0 01-3.137-3.16V3.548h1.723V14.74c0 .79.614 1.444 1.415 1.444h3.785V3.547h1.723v12.538zm-3.462-2.398H7.023v-2.48h1.723v2.48zM2.468.1H17.47C18.795.1 19.9 1.17 19.9 2.486v4.212c0 1.087-.684 2.002-1.723 2.292V2.486c0-.38-.343-.671-.708-.671h-15c-.38 0-.646.304-.646.67V8.99C.783 8.7.1 7.785.1 6.698V2.486A2.368 2.368 0 012.468.1z"
      fill="#6E6E6E"
      stroke="#fff"
      strokeWidth={0.2}
    />
  </Svg>
);
