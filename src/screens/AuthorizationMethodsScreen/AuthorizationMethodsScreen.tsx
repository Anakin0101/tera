import React from 'react';
import { Alert, View } from 'react-native';
import { useStyleTheme } from './AuthorizationMethodsScreen.styles';
import { AuthorizationMethodPasscode } from 'components/AuthorizationMethod/AuthorizationMethodPasscode/AuthorizationMethodPasscode';
import { useNavigation } from '@react-navigation/native';
import { MainNavigationProps } from 'navigation/types';
import { useTranslation } from 'react-i18next';
import { TrustDeviceModal } from 'components/modals';
import { openModal } from 'utils/modal';
import { useAppSelector } from 'store/hooks/useAppSelector';
import { useTrustDeviceModal } from 'components/modals/TrustDeviceModal/hooks/useTrustDeviceModal';
import { CREATE_PASSCODE_SCREEN } from 'navigation/ScreenNames';
import { AuthorizationMethodBiometrics } from 'components/AuthorizationMethod/AuthorizationMethodBiometrics/AuthorizationMethodBiometrics';
import { useBiometrics } from 'hooks';

export const AuthorizationMethodsScreen = () => {
  const styles = useStyleTheme();
  const { navigate } = useNavigation<MainNavigationProps<'DashboardScreen'>>();
  const { t } = useTranslation();
  const { isTrusted } = useAppSelector(state => state.deviceInfo.isDeviceTrusted);
  const { openOTPModal } = useTrustDeviceModal();
  const { handleBiometricActivation } = useBiometrics();
  const isPasscodeSet = useAppSelector(state => state.userInfo.isPasscodeSet);

  const handleSetNewPasscode = () => {
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
    if (isTrusted) {
      if (isPasscodeSet) {
        handleBiometricActivation(
          () => Alert.alert('success!!!'),
          () => Alert.alert('error!!!'),
        );
      } else {
        // TODO - check when passcode is set, we need to handleBiometricActivation then
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
        <AuthorizationMethodBiometrics handleSetBiometrics={handleSetBiometrics} />
      </View>
    </View>
  );
};
