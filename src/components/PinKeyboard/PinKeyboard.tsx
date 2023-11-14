import React, { FC } from 'react';
import { View } from 'react-native';
import { NumericKey } from 'components/NumericKey/NumericKey';
import { DeleteKey } from 'components/DeleteKey/DeleteKey';
import { BiometricKey } from 'components/BiometricKey/BiometricKey';
import { PinKeyboardProps } from './PinKeyboard.types';
import { useStyleTheme } from './PinKeyboard.styles';

const PinKeyboard: FC<PinKeyboardProps> = ({ onPress, withoutFingerprint }) => {
  const styles = useStyleTheme();
  const numericKeyRows: Array<Array<number>> = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
  ];

  return (
    <>
      {numericKeyRows.map((row, rowIndex) => (
        <View key={rowIndex} style={styles.pinRow}>
          {row.map((number, index) => (
            <NumericKey key={index} onPress={onPress} pinNumber={number} />
          ))}
        </View>
      ))}
      <View style={[styles.pinRow, styles.lastRow]}>
        {withoutFingerprint ? (
          <View style={styles.withoutFingerPrint} />
        ) : (
          <BiometricKey onPress={onPress} />
        )}
        <NumericKey onPress={onPress} pinNumber={0} />
        <DeleteKey onPress={onPress} />
      </View>
    </>
  );
};

export default PinKeyboard;
