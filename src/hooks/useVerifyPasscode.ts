import { useNavigation } from '@react-navigation/native';
import { MODAL_STACK, VERIFY_EASY_LOGIN_SCREEN } from 'navigation/ScreenNames';
import { MainStackScreenProps } from 'navigation/types';
import { useEffect, useMemo, useState } from 'react';
import { useAppDispatch } from 'store/hooks/useAppDispatch';
import { setPasscodeStatus } from 'store/slices/userInfo';
import passcodeEvents, { PASSCODE_EVENTS_PASSCODE_VERIFIED } from 'utils/eventBus';
import { clearPasscode, getPasscode } from 'utils/keychain';

export const useVerifyPasscode = () => {
  const [pinNumber, setPinNumber] = useState<string>('');
  const [savedPasscode, setSavedPasscode] = useState<string | null>('');
  const { navigate } = useNavigation<MainStackScreenProps<'ModalStack'>>();
  const dispatch = useAppDispatch();

  //   checks whether passcode is set or not in keychain
  useEffect(() => {
    const checkPasscode = async () => {
      const passcode = await getPasscode();
      dispatch(setPasscodeStatus(!!passcode));
      setSavedPasscode(passcode);
    };

    checkPasscode();
  }, [dispatch]);

  //   sets passcode value to an empty string
  const removePasscode = async () => {
    const result = await clearPasscode();
    if (result) {
      dispatch(setPasscodeStatus(null));
      setSavedPasscode(null);
    }
  };

  const verifyPasscode = (onSuccess?: () => void) => {
    const successHandler = () => {
      onSuccess?.();
      // Cleanup after handling success
      passcodeEvents.off(PASSCODE_EVENTS_PASSCODE_VERIFIED, successHandler);
    };

    // listen to an event
    passcodeEvents.on(PASSCODE_EVENTS_PASSCODE_VERIFIED, successHandler);

    navigate(MODAL_STACK, {
      screen: VERIFY_EASY_LOGIN_SCREEN,
    });
  };

  useEffect(() => {
    if (pinNumber.length === 4) {
      if (savedPasscode === null || savedPasscode !== pinNumber) {
        setPinNumber('');
      }
    }
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
    verifyPasscode,
    watchKeyboard,
    passcodeLength,
    removePasscode,
    pinNumber,
    savedPasscode,
  };
};
