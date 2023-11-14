import { useNavigation } from '@react-navigation/native';
import { PASSCODE_LOGIN_SCREEN } from 'navigation/ScreenNames';
import { MainNavigationProps } from 'navigation/types';
import { SetStateAction, useEffect, useMemo, useState } from 'react';
import passcodeEvents, { PASSCODE_EVENTS_PASSCODE_VERIFIED } from 'utils/eventBus';
import { getPasscode, setPasscode } from 'utils/keychain';

export const usePasscode = () => {
  const [pinNumber, setPinNumber] = useState<string>('');
  const [savedPasscode, setSavedPasscode] = useState<SetStateAction<string | null>>('');
  const { goBack, navigate } = useNavigation<MainNavigationProps<'PasscodeLoginScreen'>>();

  //   checks whether passcode is set or not in keychain
  useEffect(() => {
    const checkPasscode = async () => {
      const passcode = await getPasscode();
      setSavedPasscode(passcode);
    };

    checkPasscode();
  }, []);

  //   sets passcode value to an empty string
  const clearPasscode = async () => {
    const result = await setPasscode('');
    if (result) {
      setSavedPasscode(null);
    }
  };

  //   handles verification of entered passcode, accepts callback fn
  const verifyPasscode = (onSuccess?: () => void) => {
    if (!onSuccess) {
      onSuccess = () => {};
    }

    passcodeEvents.on(PASSCODE_EVENTS_PASSCODE_VERIFIED, () => {
      goBack();
      onSuccess?.();
    });

    navigate(PASSCODE_LOGIN_SCREEN);
  };

  useEffect(() => {
    (async () => {
      if (pinNumber.length === 4) {
        if (savedPasscode === null || savedPasscode !== pinNumber) {
          setPinNumber('');
        } else {
          passcodeEvents.emit(PASSCODE_EVENTS_PASSCODE_VERIFIED);
        }
      }
    })();
  }, [pinNumber, savedPasscode]);

  const watchKeyboard = (value: number) => {
    if (value !== 10 && value !== 11) {
      if (pinNumber.length < 4) {
        setPinNumber(`${pinNumber}${value}`);
      }
    } else if (value === 10) {
      //   onFingerPrintPress(); there should be biometricPress
    } else if (value === 11 && pinNumber !== '') {
      setPinNumber(pinNumber.slice(0, pinNumber.length - 1));
    }
  };

  const passcodeLength = useMemo(() => pinNumber.length, [pinNumber]);

  return {
    isPasscodeSet: !!savedPasscode,
    verifyPasscode,
    watchKeyboard,
    passcodeLength,
    clearPasscode,
  };
};
