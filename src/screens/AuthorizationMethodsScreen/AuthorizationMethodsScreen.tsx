import React from 'react';
import { View } from 'react-native';
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

export const AuthorizationMethodsScreen = () => {
  const styles = useStyleTheme();
  const { navigate } = useNavigation<MainNavigationProps<'DashboardScreen'>>();
  const { t } = useTranslation();
  const { isTrusted } = useAppSelector(state => state.deviceInfo.isDeviceTrusted);
  const { openOTPModal } = useTrustDeviceModal();

  const handleNewPasscodeSet = () => {
    if (isTrusted) {
      navigate(CREATE_PASSCODE_SCREEN);
    } else {
      openModal({
        title: t('trustDevice.heading'),
        element: <TrustDeviceModal methodName={'passcode'} openOTPModal={openOTPModal} />,
      });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <AuthorizationMethodPasscode handleSetNewPasscode={handleNewPasscodeSet} />
      </View>
    </View>
  );
};
