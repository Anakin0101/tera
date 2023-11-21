import React, { FC, useEffect } from 'react';
import { Button } from 'components/Button/Button';
import { View } from 'react-native';
import PinKeyboard from 'components/PinKeyboard/PinKeyboard';
import { PinLine } from 'components/PinLine/PinLine';
import { useStyleTheme } from './PassCodeLoginScreen.styles';
import { Account } from 'components/index';
import passcodeEvents, { PASSCODE_EVENTS_PASSCODE_VERIFIED } from 'utils/eventBus';
import { withLoginScreen } from 'components/HOC';
import { PASSCODE_LOGIN_SCREEN } from 'navigation/ScreenNames';
import { useTranslation } from 'react-i18next';
import { useUserReset, usePasscode, useKeyChain } from 'hooks';

interface PasscodeLoginBaseProps {}

const PasscodeLoginScreenBase: FC<PasscodeLoginBaseProps> = () => {
  const styles = useStyleTheme();
  const { watchKeyboard, passcodeLength } = usePasscode();
  const { savedUserName } = useKeyChain();
  const { t } = useTranslation();
  const { resetUser } = useUserReset();

  useEffect(() => {
    return () => {
      passcodeEvents.off(PASSCODE_EVENTS_PASSCODE_VERIFIED);
    };
  }, []);

  return (
    <View style={styles.wrapper}>
      <>
        <Account user={savedUserName || ''} />
        <Button.Secondary text={t('passAuth.change_user')} size="medium" onPress={resetUser} />
        <PinLine fillNumber={passcodeLength} style={styles.pinLine} />
      </>
      <PinKeyboard onPress={watchKeyboard} />
    </View>
  );
};

export const PasscodeLoginScreen = withLoginScreen<
  PasscodeLoginBaseProps,
  typeof PASSCODE_LOGIN_SCREEN
>(PasscodeLoginScreenBase, PASSCODE_LOGIN_SCREEN);
