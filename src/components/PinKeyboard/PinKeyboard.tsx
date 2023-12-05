import React, { FC } from 'react';
import { Alert, View } from 'react-native';
import { NumericKey } from 'components/NumericKey/NumericKey';
import { DeleteKey } from 'components/DeleteKey/DeleteKey';
import { BiometricKey } from 'components/BiometricKey/BiometricKey';
import { PinKeyboardProps } from './PinKeyboard.types';
import { useStyleTheme } from './PinKeyboard.styles';
import { useAppSelector } from 'store/hooks/useAppSelector';
import { useBiometrics } from 'hooks/useBiometrics';
import { useLogin } from 'hooks/useLogin';

const PinKeyboard: FC<PinKeyboardProps> = ({ onPress }) => {
  const styles = useStyleTheme();
  const isBiometricSet = useAppSelector(state => state.userInfo.isBiometricSet);
  const { handleBiometricVerification } = useBiometrics();
  const { handlePasscodeSignIn } = useLogin();

  const handleBiometricAuth = () => {
    handleBiometricVerification(
      () => {
        handlePasscodeSignIn();
      },
      () => {
        Alert.alert('Biometric verification failed');
      },
    );
  };

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
        {isBiometricSet ? (
          <BiometricKey handleBiometricAuth={handleBiometricAuth} />
        ) : (
          <View style={styles.withoutFingerPrint} />
        )}
        <NumericKey onPress={onPress} pinNumber={0} />
        <DeleteKey onPress={onPress} />
      </View>
    </>
  );
};

export default PinKeyboard;
