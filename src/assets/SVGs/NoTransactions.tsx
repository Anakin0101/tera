import * as React from 'react';
import Svg, { Path, Rect } from 'react-native-svg';

export const NoTransactions = () => (
  <Svg width="56" height="56" viewBox="0 0 56 56" fill="none">
    <Rect width="56" height="56" rx="10" fill="#F9F1F6" />
    <Path d="M10 16H10.9394" stroke="white" strokeWidth="4" strokeLinecap="round" />
    <Path d="M10 40H10.9394" stroke="white" strokeWidth="4" strokeLinecap="round" />
    <Path d="M10 28H10.9394" stroke="white" strokeWidth="4" strokeLinecap="round" />
    <Path d="M18.4546 16H41" stroke="white" strokeWidth="4" strokeLinecap="round" />
    <Path d="M18.4546 40H41" stroke="white" strokeWidth="4" strokeLinecap="round" />
    <Path d="M18.4546 28H41" stroke="white" strokeWidth="4" strokeLinecap="round" />
  </Svg>
);
