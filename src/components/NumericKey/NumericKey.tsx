import React, { FC } from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { useStyleTheme } from './NumericKey.styles';
import { NUmericKeyProps } from './NumericKey.types';

export const NumericKey: FC<NUmericKeyProps> = ({ onPress, pinNumber }) => {
  const styles = useStyleTheme();
  return (
    <TouchableOpacity style={styles.pinItem} onPress={() => onPress(pinNumber)}>
      <Text style={styles.pinItemText}>{pinNumber.toString()}</Text>
    </TouchableOpacity>
  );
};
