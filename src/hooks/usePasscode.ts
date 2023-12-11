import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { clearUsername, getPasscode, setPasscode } from 'utils/keychain';
import { resetUserCredentials, setPasscodeStatus, setPasscodeTries } from 'store/slices/userInfo';
import { useAppDispatch } from 'store/hooks/useAppDispatch';
import { useLogin } from './useLogin';
import { useAppSelector } from 'store/hooks/useAppSelector';
import { openToast } from 'utils/toast';
import { useNavigation } from '@react-navigation/native';
import { GuestStackScreenProps } from 'navigation/types';
import { PASSWORD_LOGIN_SCREEN } from 'navigation/ScreenNames';

export const usePasscode = () => {
  const { handlePasscodeSignIn } = useLogin();
  const dispatch = useAppDispatch();
  const { navigate } = useNavigation<GuestStackScreenProps<'PasswordLoginScreen'>>();
  const [pinNumber, setPinNumber] = useState<string>('');
  const [savedPasscode, setSavedPasscode] = useState<string | null>('');

  const tries = useRef<number>(0);
  const biometricAuthSet = useAppSelector(state => state.userInfo.isBiometricSet);
  const passcodeTries = useAppSelector(state => state.userInfo.passcodeTries);

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
  const clearPasscode = async () => {
    const result = await setPasscode('');
    if (result) {
      dispatch(setPasscodeStatus(null));
      setSavedPasscode(null);
    }
  };

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

  const handleWrongPasscode = useCallback(() => {
    dispatch(resetUserCredentials());
    clearUsername();
    navigate(PASSWORD_LOGIN_SCREEN);
  }, [dispatch, navigate]);

  /** Depending on number of tries, we show user different error messages
   * On the third try (if no previous try from Biometrics) we redirect user to PasswordLoginScreen
   * if Biometric was tried before, only two tries should remain
   * @returns function (openToast)
   */
  const getErrorMessage = useCallback(() => {
    tries.current += 1;
    dispatch(setPasscodeTries(passcodeTries + 1));

    if (tries.current === 1) {
      openToast('შეყვანილი მონაცემები არასწორია', 'error');
      return;
    }

    if (tries.current === 2) {
      if (biometricAuthSet) {
        openToast(
          'შეყვანილი მონაცემები არასწორია, გთხოვთ გაიაროთ ავტორიზაცია მომხმარებლითა და პაროლით',
          'error',
        );
        handleWrongPasscode();
      } else {
        openToast('შეყვანილი მონაცემები არასწორია', 'error');
      }
    } else if (tries.current === 3 && !biometricAuthSet) {
      openToast(
        'შეყვანილი მონაცემები არასწორია, გთხოვთ გაიაროთ ავტორიზაცია მომხმარებლითა და პაროლით',
        'error',
      );
      handleWrongPasscode();
    }
  }, [biometricAuthSet, dispatch, handleWrongPasscode, passcodeTries]);

  useEffect(() => {
    (async () => {
      if (pinNumber.length === 4) {
        if (savedPasscode === null || savedPasscode !== pinNumber) {
          getErrorMessage();
          setPinNumber('');
        } else {
          handlePasscodeSignIn?.();
        }
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pinNumber]);

  return {
    watchKeyboard,
    passcodeLength,
    clearPasscode,
    savedPasscode,
  };
};
