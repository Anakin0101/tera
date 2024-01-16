import React from 'react';
import { Alert, SafeAreaView, View } from 'react-native';
import { PasscodeInput } from 'components/PasscodeInput/PasscodeInput';
import { useStyleTheme } from './CreatePasscodeScreen.styles';
import { useCreatePasscode } from './hooks/useCreatePasscode';
import { openToast } from 'utils/toast';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import { ModalStackScreenProps } from 'navigation/types';
import { useTrustDeviceModal } from 'components/modals/TrustDeviceModal/hooks/useTrustDeviceModal';
import { useBiometrics } from 'hooks/useBiometrics';
import { setBiometricStatus } from 'store/slices/userInfo';
import { useAppDispatch } from 'store/hooks/useAppDispatch';
import { useAppSelector } from 'store/hooks/useAppSelector';

export const CreatePasscodeScreen = () => {
  const { t } = useTranslation();
  const { goBack } = useNavigation<ModalStackScreenProps<'CreatePasscodeScreen'>>();
  const { handleOTPVerification } = useTrustDeviceModal();
  const { handleBiometricActivation } = useBiometrics();
  const dispatch = useAppDispatch();
  const isBiometricBeingSet = useAppSelector(state => state.userInfo.isBiometricBeingSet);
  const { isTrusted } = useAppSelector(state => state.deviceInfo.isDeviceTrusted);

  const successCallBack = () => {
    if (!isTrusted) {
      handleOTPVerification();
    }
    if (isBiometricBeingSet) {
      handleBiometricActivation(
        () => {
          dispatch(setBiometricStatus(true));
          goBack();
          openToast(t('passcode.easy_login_success'), 'success');
        },
        () => {
          dispatch(setBiometricStatus(false));
          Alert.alert('Biometrics setup error!');
        },
      );
    } else {
      goBack();
      openToast(t('passcode.easy_login_success'), 'success');
    }
  };

  const styles = useStyleTheme();
  const { onRepeatPasscodePress, onPasscodePress, valueLength, view } =
    useCreatePasscode(successCallBack);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.wrapper}>
        {view === 'SetPasscode' && (
          <PasscodeInput
            title="passcode.setPasscodeTitle"
            label="passcode.setPasscodeDescription"
            onPasscodeChange={onPasscodePress}
            valueLength={valueLength}
          />
        )}
        {view === 'RepeatPasscode' && (
          <PasscodeInput
            title="passcode.repeatPasscodeTitle"
            label="passcode.setPasscodeDescription"
            onPasscodeChange={onRepeatPasscodePress}
            valueLength={valueLength}
          />
        )}
      </View>
    </SafeAreaView>
  );
};
