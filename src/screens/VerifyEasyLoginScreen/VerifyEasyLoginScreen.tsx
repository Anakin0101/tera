import React, { useEffect } from 'react';
import { Button } from 'components/Button/Button';
import { View } from 'react-native';
import PinKeyboard from 'components/PinKeyboard/PinKeyboard';
import { PinLine } from 'components/PinLine/PinLine';
import { useStyleTheme } from './VerifyEasyLoginScreen.styles';
import { Account } from 'components/index';
import passcodeEvents, { PASSCODE_EVENTS_PASSCODE_VERIFIED } from 'utils/eventBus';
import { useTranslation } from 'react-i18next';
import { useUserReset } from 'hooks';
import { useVerifyPasscode } from 'hooks/useVerifyPasscode';

export const VerifyEasyLoginScreen = () => {
  const styles = useStyleTheme();
  const { watchKeyboard, passcodeLength } = useVerifyPasscode();
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
        <Account />
        <Button.Secondary text={t('passAuth.change_user')} size="medium" onPress={resetUser} />
        <PinLine fillNumber={passcodeLength} style={styles.pinLine} />
      </>
      <PinKeyboard onPress={watchKeyboard} />
    </View>
  );
};
