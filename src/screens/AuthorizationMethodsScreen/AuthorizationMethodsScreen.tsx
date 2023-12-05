import React from 'react';
import { Alert, View } from 'react-native';
import { useStyleTheme } from './AuthorizationMethodsScreen.styles';
import { AuthorizationMethodPasscode } from 'components/AuthorizationMethod/AuthorizationMethodPasscode/AuthorizationMethodPasscode';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { TrustDeviceModal } from 'components/modals';
import { openModal } from 'utils/modal';
import { useAppSelector } from 'store/hooks/useAppSelector';
import { useTrustDeviceModal } from 'components/modals/TrustDeviceModal/hooks/useTrustDeviceModal';
import { CREATE_PASSCODE_SCREEN } from 'navigation/ScreenNames';
import { AuthorizationMethodBiometrics } from 'components/AuthorizationMethod/AuthorizationMethodBiometrics/AuthorizationMethodBiometrics';
import { useBiometrics } from 'hooks';
import { ModalStackScreenProps } from 'navigation/types';
import { useAppDispatch } from 'store/hooks/useAppDispatch';
import { setBiometricStatus, setIsBiometricBeingSet } from 'store/slices/userInfo';
import { openToast } from 'utils/toast';

export const AuthorizationMethodsScreen = () => {
  const styles = useStyleTheme();
  const { navigate } = useNavigation<ModalStackScreenProps<'CreatePasscodeScreen'>>();

  const { t } = useTranslation();
  const { isTrusted } = useAppSelector(state => state.deviceInfo.isDeviceTrusted);
  const { openOTPModal } = useTrustDeviceModal();
  const { handleBiometricActivation } = useBiometrics();
  const isPasscodeSet = useAppSelector(state => state.userInfo.isPasscodeSet);
  const dispatch = useAppDispatch();
  const { deviceSupportsBiometricAuth } = useAppSelector(state => state.deviceInfo);

  const handleSetNewPasscode = () => {
    dispatch(setIsBiometricBeingSet(false));
    if (isTrusted) {
      navigate(CREATE_PASSCODE_SCREEN);
    } else {
      openModal({
        title: t('trustDevice.heading'),
        element: <TrustDeviceModal methodName={'passcode'} openOTPModal={openOTPModal} />,
      });
    }
  };

  const handleSetBiometrics = () => {
    dispatch(setIsBiometricBeingSet(true));
    if (isTrusted) {
      if (isPasscodeSet) {
        handleBiometricActivation(
          () => {
            dispatch(setBiometricStatus(true));
            openToast(t('passcode.easy_login_success'), 'success');
            dispatch(setIsBiometricBeingSet(false));
          },
          () => {
            Alert.alert('error!!!');
            dispatch(setIsBiometricBeingSet(false));
          },
        );
      } else {
        navigate(CREATE_PASSCODE_SCREEN);
      }
    } else {
      openModal({
        title: t('trustDevice.heading'),
        element: <TrustDeviceModal methodName={'biometrics'} openOTPModal={openOTPModal} />,
      });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <AuthorizationMethodPasscode handleSetNewPasscode={handleSetNewPasscode} />
        {deviceSupportsBiometricAuth && (
          <AuthorizationMethodBiometrics handleSetBiometrics={handleSetBiometrics} />
        )}
      </View>
    </View>
  );
};
