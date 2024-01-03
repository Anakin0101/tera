import React, { FC, useCallback, useEffect } from 'react';
import { Button } from 'components/Button/Button';
import { View } from 'react-native';
import PinKeyboard from 'components/PinKeyboard/PinKeyboard';
import { PinLine } from 'components/PinLine/PinLine';
import { useStyleTheme } from './PassCodeLoginScreen.styles';
import { Account } from 'components/index';
import { withLoginScreen } from 'components/HOC';
import { PASSCODE_LOGIN_SCREEN } from 'navigation/ScreenNames';
import { useTranslation } from 'react-i18next';
import { useUserReset, usePasscode, useLogin, useBiometrics } from 'hooks';
import { useAppSelector } from 'store/hooks/useAppSelector';
import { useEnableBiometricsPrompt } from 'hooks/useEnableBiometricsPrompt';
import { openToast } from 'utils/toast';
import { storageKeys } from 'storage/index';
import { USER_LOGGED_OUT } from 'storage/constants';

interface PasscodeLoginBaseProps {}

const PasscodeLoginScreenBase: FC<PasscodeLoginBaseProps> = () => {
  const styles = useStyleTheme();
  const { watchKeyboard, passcodeLength } = usePasscode();
  const { t } = useTranslation();
  const { resetUser } = useUserReset();
  const logoutStatus = useAppSelector(state => state.userInfo.logoutStatus);
  const { handlePasscodeSignIn } = useLogin();
  const { handleBiometricVerification } = useBiometrics();
  const { deviceSupportsBiometricAuth, isBiometricAuthIsEnabled } = useAppSelector(
    state => state.deviceInfo,
  );
  const { openBiometricSensorModal } = useEnableBiometricsPrompt();
  const biometricAuthSet = useAppSelector(state => state.userInfo.isBiometricSet);
  const userHasLoggedOut = storageKeys().includes(USER_LOGGED_OUT);

  const handleBiometricAuthOnLoad = useCallback(() => {
    handleBiometricVerification(
      () => {
        handlePasscodeSignIn();
      },
      (e?: string) => {
        openToast(String(e), 'error');
      },
    );
  }, [handleBiometricVerification, handlePasscodeSignIn]);

  useEffect(() => {
    if (userHasLoggedOut) {
      return;
    } else {
      handleBiometricAuthOnLoad();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [logoutStatus]);

  const handleBiometricAuth = () => {
    if (deviceSupportsBiometricAuth !== false) {
      if (isBiometricAuthIsEnabled !== false) {
        handleBiometricVerification(
          () => {
            handlePasscodeSignIn();
          },
          (e?: string) => {
            openToast(String(e), 'error');
          },
        );
      } else {
        openBiometricSensorModal();
      }
    }
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.innerTopContainer}>
        <Account />
        <Button.Secondary text={t('passAuth.change_user')} size="medium" onPress={resetUser} />
        <PinLine fillNumber={passcodeLength} style={styles.pinLine} />
      </View>
      <View style={styles.pinContainer}>
        <PinKeyboard
          onPress={watchKeyboard}
          handleBiometricAuth={handleBiometricAuth}
          showBiometricKey={deviceSupportsBiometricAuth !== false && biometricAuthSet}
        />
      </View>
    </View>
  );
};

export const PasscodeLoginScreen = withLoginScreen<
  PasscodeLoginBaseProps,
  typeof PASSCODE_LOGIN_SCREEN
>(PasscodeLoginScreenBase, PASSCODE_LOGIN_SCREEN);
