import React, { FC } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { useStyleTheme } from './NumericKey.styles';
import { NUmericKeyProps } from './NumericKey.types';

export const NumericKey: FC<NUmericKeyProps> = ({ onPress, pinNumber }) => {
  const styles = useStyleTheme();
  return (
    <TouchableOpacity
      style={styles.pinItem}
      onPress={() => onPress(pinNumber)}
      hitSlop={{
        top: 10,
        bottom: 10,
        left: 30,
        right: 30,
      }}
    >
      <Text style={styles.pinItemText}>{pinNumber.toString()}</Text>
    </TouchableOpacity>
  );
};
