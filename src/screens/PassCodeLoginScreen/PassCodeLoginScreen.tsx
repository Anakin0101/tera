import React, { FC, useCallback, useEffect } from 'react';
import { Button } from 'components/Button/Button';
import { Alert, View } from 'react-native';
import PinKeyboard from 'components/PinKeyboard/PinKeyboard';
import { PinLine } from 'components/PinLine/PinLine';
import { useStyleTheme } from './PassCodeLoginScreen.styles';
import { Account } from 'components/index';
import { withLoginScreen } from 'components/HOC';
import { PASSCODE_LOGIN_SCREEN } from 'navigation/ScreenNames';
import { useTranslation } from 'react-i18next';
import { useUserReset, usePasscode, useKeyChain, useLogin, useBiometrics } from 'hooks';
import { useAppSelector } from 'store/hooks/useAppSelector';

interface PasscodeLoginBaseProps {}

const PasscodeLoginScreenBase: FC<PasscodeLoginBaseProps> = () => {
  const styles = useStyleTheme();
  const { watchKeyboard, passcodeLength } = usePasscode();
  const { savedUserName } = useKeyChain();
  const { t } = useTranslation();
  const { resetUser } = useUserReset();
  const logoutStatus = useAppSelector(state => state.userInfo.logoutStatus);
  const { handlePasscodeSignIn } = useLogin();
  const { handleBiometricVerification } = useBiometrics();

  const handleBiometricAuth = useCallback(() => {
    handleBiometricVerification(
      () => {
        handlePasscodeSignIn();
      },
      () => {
        Alert.alert('Biometric verification failed');
      },
    );
  }, [handleBiometricVerification, handlePasscodeSignIn]);

  useEffect(() => {
    if (logoutStatus?.success) {
      return;
    } else {
      handleBiometricAuth();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [logoutStatus?.success]);

  return (
    <View style={styles.wrapper}>
      <View style={styles.innerTopContainer}>
        <Account user={savedUserName || ''} />
        <Button.Secondary text={t('passAuth.change_user')} size="medium" onPress={resetUser} />
        <PinLine fillNumber={passcodeLength} style={styles.pinLine} />
      </View>
      <View style={styles.pinContainer}>
        <PinKeyboard onPress={watchKeyboard} />
      </View>
    </View>
  );
};

export const PasscodeLoginScreen = withLoginScreen<
  PasscodeLoginBaseProps,
  typeof PASSCODE_LOGIN_SCREEN
>(PasscodeLoginScreenBase, PASSCODE_LOGIN_SCREEN);
