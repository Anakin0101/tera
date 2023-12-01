import { useNavigation } from '@react-navigation/native';
import { PASSCODE_LOGIN_SCREEN, PASSWORD_LOGIN_SCREEN } from 'navigation/ScreenNames';
import { GuestStackScreenProps } from 'navigation/types';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import passcodeEvents, { PASSCODE_EVENTS_PASSCODE_VERIFIED } from 'utils/eventBus';
import { getPasscode, setPasscode } from 'utils/keychain';
import { openToast } from 'utils/toast';
import { delayedNavigation } from 'utils/navigationUtils';
import { setPasscodeStatus, setPasscodeTries } from 'store/slices/userInfo';
import { useAppDispatch } from 'store/hooks/useAppDispatch';
import { useAppSelector } from 'store/hooks/useAppSelector';

export const usePasscode = () => {
  const [pinNumber, setPinNumber] = useState<string>('');
  const [savedPasscode, setSavedPasscode] = useState<string | null>('');
  const { goBack, navigate } =
    useNavigation<GuestStackScreenProps<'PasscodeLoginScreen' | 'PasswordLoginScreen'>>();
  const tries = useRef<number>(0);
  const biometricAuthSet = useAppSelector(state => state.userInfo.isBiometricSet);
  const dispatch = useAppDispatch();
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
      setSavedPasscode(null);
      dispatch(setPasscodeStatus(null));
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

    navigate(PASSCODE_LOGIN_SCREEN);
  };

  /**
   * Depending on number of tries, we show user different error messages
   * On the third try (if no previous try from Biometrics) we redirect user to PasswordLoginScreen
   * if Biometric was tried before, only two tries should remain
   * @returns function (openToast)
   */
  //   const getErrorMessage = () => {
  //     dispatch(setPasscodeTries(passcodeTries + 1));

  //     if (passcodeTries === 1) {
  //       openToast('შეყვანილი მონაცემები არასწორია', 'error');
  //       return;
  //     }

  //     if (passcodeTries === 2) {
  //       if (biometricAuthSet) {
  //         openToast(
  //           'შეყვანილი მონაცემები არასწორია, გთხოვთ გაიაროთ ავტორიზაცია მომხმარებლითა და პაროლით',
  //           'error',
  //         );
  //         delayedNavigation(() => navigate(PASSWORD_LOGIN_SCREEN), 2000);
  //       } else {
  //         openToast('შეყვანილი მონაცემები არასწორია', 'error');
  //       }
  //     } else if (passcodeTries === 3 && !biometricAuthSet) {
  //       openToast(
  //         'შეყვანილი მონაცემები არასწორია, გთხოვთ გაიაროთ ავტორიზაცია მომხმარებლითა და პაროლით',
  //         'error',
  //       );
  //       delayedNavigation(() => navigate(PASSWORD_LOGIN_SCREEN), 2000);
  //     }
  //   };

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
        delayedNavigation(() => navigate(PASSWORD_LOGIN_SCREEN), 2000);
      } else {
        openToast('შეყვანილი მონაცემები არასწორია', 'error');
      }
    } else if (tries.current === 3 && !biometricAuthSet) {
      openToast(
        'შეყვანილი მონაცემები არასწორია, გთხოვთ გაიაროთ ავტორიზაცია მომხმარებლითა და პაროლით',
        'error',
      );
      delayedNavigation(() => navigate(PASSWORD_LOGIN_SCREEN), 2000);
    }
  }, [biometricAuthSet, dispatch, navigate, passcodeTries]);

  useEffect(() => {
    (async () => {
      if (pinNumber.length === 4) {
        if (savedPasscode === null || savedPasscode !== pinNumber) {
          getErrorMessage();
          setPinNumber('');
        } else {
          passcodeEvents.emit(PASSCODE_EVENTS_PASSCODE_VERIFIED);
        }
      }
    })();
  }, [pinNumber, savedPasscode, getErrorMessage]);

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
    clearPasscode,
  };
};
