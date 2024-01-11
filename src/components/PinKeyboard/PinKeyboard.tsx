import React, { FC } from 'react';
import { View } from 'react-native';
import { NumericKey } from 'components/NumericKey/NumericKey';
import { DeleteKey } from 'components/DeleteKey/DeleteKey';
import { BiometricKey } from 'components/BiometricKey/BiometricKey';
import { PinKeyboardProps } from './PinKeyboard.types';
import { useStyleTheme } from './PinKeyboard.styles';

const PinKeyboard: FC<PinKeyboardProps> = ({ onPress, handleBiometricAuth, showBiometricKey }) => {
  const styles = useStyleTheme();

  const numericKeyRows: Array<Array<number>> = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
  ];

  return (
    <View style={styles.container}>
      {numericKeyRows.map((row, rowIndex) => (
        <View key={rowIndex} style={styles.pinRow}>
          {row.map((number, index) => (
            <NumericKey key={index} onPress={onPress} pinNumber={number} />
          ))}
        </View>
      ))}
      <View style={[styles.pinRow, styles.lastRow]}>
        {showBiometricKey ? (
          <BiometricKey handleBiometricAuth={handleBiometricAuth} />
        ) : (
          <View style={styles.withoutFingerPrint} />
        )}
        <NumericKey onPress={onPress} pinNumber={0} />
        <DeleteKey onPress={onPress} />
      </View>
    </View>
  );
};

export default PinKeyboard;
