import React, { FC } from 'react';
import { View } from 'react-native';
import { PinLineProps } from './PinLine.types';
import { useStyleTheme } from './PinLine.styles';

export const PinLine: FC<PinLineProps> = ({ style, fillNumber }) => {
  const styles = useStyleTheme();
  const pinList = Array.from(Array(4).keys());

  return (
    <View style={[styles.pinContent, style]}>
      {pinList.map(item => (
        <View style={[styles.pinItem, fillNumber > item && styles.filled]} key={item} />
      ))}
    </View>
  );
};
