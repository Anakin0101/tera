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
  const { goBack, navigate } = useNavigation<MainStackScreenProps<'ModalStack'>>();
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

  //   handles verification of entered passcode, accepts callback fn
  const verifyPasscode = (onSuccess?: () => void, shouldGoBack?: boolean) => {
    if (!onSuccess) {
      onSuccess = () => {};
    }

    passcodeEvents.on(PASSCODE_EVENTS_PASSCODE_VERIFIED, () => {
      if (shouldGoBack) {
        goBack();
      }
      onSuccess?.();
    });

    navigate(MODAL_STACK, {
      screen: VERIFY_EASY_LOGIN_SCREEN,
    });
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
    verifyPasscode,
    watchKeyboard,
    passcodeLength,
    removePasscode,
  };
};
