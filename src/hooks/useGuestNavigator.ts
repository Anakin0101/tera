import { useEffect, useState } from 'react';
import { APP_LAUNCHED } from 'storage/constants';
import { setValue, storageKeys } from 'storage/index';
import { useKeyChain } from './useKeychain';
import { GuestStackParamList } from 'navigation/types';
import {
  ONBOARDING_SCREEN,
  PASSCODE_LOGIN_SCREEN,
  PASSWORD_LOGIN_SCREEN,
  PASSWORD_ONLY_LOGIN_SCREEN,
} from 'navigation/ScreenNames';
import { useAppSelector } from 'store/hooks/useAppSelector';
import { resetKeychainValues } from 'utils/logKeychainValues';
import { closeModal } from 'utils/modal';

export const useGuestNavigator = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [, setIsFirstLaunch] = useState(false);
  const { loading: keyChainLoading, savedLoginName, savedPasscode } = useKeyChain();
  const [initialRoute, setInitialRoute] =
    useState<keyof GuestStackParamList>(PASSWORD_LOGIN_SCREEN);
  const refreshToken = useAppSelector(state => state.userInfo.refreshToken);
  const passcodeTries = useAppSelector(state => state.userInfo.passcodeTries);
  const shouldSaveUsername = useAppSelector(state => state.userInfo.shouldSaveUsername);
  const isLaunchedBefore = storageKeys().includes(APP_LAUNCHED);

  //   If auto-logout happens and the modal had been opened, on guest navigator - any screen - modal must be closed
  useEffect(() => {
    closeModal();
  }, []);

  useEffect(() => {
    const fetchInitialData = async () => {
      if (!keyChainLoading) {
        setLoading(false);
      }

      if (!isLaunchedBefore) {
        setValue(APP_LAUNCHED, true);
        resetKeychainValues();
        setIsFirstLaunch(true);
        setInitialRoute(ONBOARDING_SCREEN);
      } else if (savedPasscode && refreshToken && passcodeTries < 3) {
        // TODO - DO NOT DELETE
        // verifyPasscode(() => {
        //   handlePasscodeSignIn();
        // }, false);
        setInitialRoute(PASSCODE_LOGIN_SCREEN);
      } else if (!savedPasscode && !!savedLoginName && shouldSaveUsername) {
        setInitialRoute(PASSWORD_ONLY_LOGIN_SCREEN);
      }
    };

    fetchInitialData();
  }, [
    keyChainLoading,
    passcodeTries,
    refreshToken,
    savedLoginName,
    shouldSaveUsername,
    isLaunchedBefore,
    savedPasscode,
  ]);

  return {
    loading,
    initialRoute: initialRoute as keyof GuestStackParamList,
  };
};
