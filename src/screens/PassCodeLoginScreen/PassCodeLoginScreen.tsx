import React, { FC, useEffect } from 'react';
import { Button } from 'components/Button/Button';
import { View } from 'react-native';
import PinKeyboard from 'components/PinKeyboard/PinKeyboard';
import { PinLine } from 'components/PinLine/PinLine';
import { useStyleTheme } from './PassCodeLoginScreen.styles';
import { Account } from 'components/index';
import passcodeEvents, { PASSCODE_EVENTS_PASSCODE_VERIFIED } from 'utils/eventBus';
import { usePasscode } from 'hooks/usePasscode';
import { withLoginScreen } from 'components/HOC';
import { PASSCODE_LOGIN_SCREEN } from 'navigation/ScreenNames';
import { storage } from 'storage/index';

interface PasscodeLoginBaseProps {}

const PasscodeLoginScreenBase: FC<PasscodeLoginBaseProps> = () => {
  const styles = useStyleTheme();
  const { watchKeyboard, passcodeLength } = usePasscode();

  useEffect(() => {
    return () => {
      passcodeEvents.off(PASSCODE_EVENTS_PASSCODE_VERIFIED);
    };
  }, []);

  //   TODO - temp
  const clearAll = () => {
    storage.clearAll();
  };

  return (
    <View style={styles.wrapper}>
      <>
        <Account user="Slick Studio" />
        <Button.Secondary text="მომხმარებლის შეცვლა" size="medium" onPress={clearAll} />
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
