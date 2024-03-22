import React, { useEffect } from 'react';
import { Alert, View } from 'react-native';
import PinKeyboard from 'components/PinKeyboard/PinKeyboard';
import { PinLine } from 'components/PinLine/PinLine';
import { useStyleTheme } from './VerifyEasyLoginScreen.styles';
import { useBiometrics } from 'hooks';
import { useVerifyPasscode } from 'hooks/useVerifyPasscode';
import { useAppSelector } from 'store/hooks/useAppSelector';
import { useNavigation } from '@react-navigation/native';
import { MainStackScreenProps } from 'navigation/types';
import passcodeEvents, { PASSCODE_EVENTS_PASSCODE_VERIFIED } from 'utils/eventBus';

export const VerifyEasyLoginScreen = () => {
  const styles = useStyleTheme();
  const { watchKeyboard, passcodeLength, pinNumber, savedPasscode } = useVerifyPasscode();
  const biometricAuthSet = useAppSelector(state => state.userInfo.isBiometricSet);
  const { handleBiometricVerification } = useBiometrics();
  const { goBack } = useNavigation<MainStackScreenProps<'ModalStack'>>();
  const { deviceSupportsBiometricAuth, isBiometricAuthIsEnabled } = useAppSelector(
    state => state.deviceInfo,
  );

  useEffect(() => {
    if (biometricAuthSet) {
      handleBiometricVerification(
        () => {
          // fire an event
          passcodeEvents.emit(PASSCODE_EVENTS_PASSCODE_VERIFIED);
          goBack();
        },
        () => {
          Alert.alert('error');
        },
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [biometricAuthSet]);

  useEffect(() => {
    if (passcodeLength === 4 && pinNumber === savedPasscode) {
      // fire an event
      passcodeEvents.emit(PASSCODE_EVENTS_PASSCODE_VERIFIED);
      goBack();
    }
  }, [goBack, passcodeLength, pinNumber, savedPasscode]);

  const showBiometricKey =
    isBiometricAuthIsEnabled && deviceSupportsBiometricAuth && biometricAuthSet;

  return (
    <View style={styles.wrapper}>
      <PinLine fillNumber={passcodeLength} style={styles.pinLine} />

      {/* // eslint-disable-next-line react-native/no-inline-styles */}
      <View style={styles.pinKeyboardContainer}>
        <PinKeyboard onPress={watchKeyboard} showBiometricKey={showBiometricKey} />
      </View>
    </View>
  );
};
