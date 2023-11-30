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
import { useLogin } from './useLogin';
import { useAppSelector } from 'store/hooks/useAppSelector';

export const useGuestNavigator = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [, setIsFirstLaunch] = useState(false);
  const { loading: keyChainLoading, savedPasscode, savedUserName } = useKeyChain();
  const [initialRoute, setInitialRoute] =
    useState<keyof GuestStackParamList>(PASSWORD_LOGIN_SCREEN);
  const { handlePasscodeSignIn } = useLogin();
  const refreshToken = useAppSelector(state => state.userInfo.refreshToken);
  const passcodeTries = useAppSelector(state => state.userInfo.passcodeTries);

  useEffect(() => {
    const fetchInitialData = async () => {
      const isLaunchedBefore = storageKeys().includes(APP_LAUNCHED);

      if (!isLaunchedBefore) {
        await setValue(APP_LAUNCHED, true);
        setIsFirstLaunch(true);
        setInitialRoute(ONBOARDING_SCREEN);
      } else if (savedPasscode && refreshToken && passcodeTries < 3) {
        // TODO - DO NOT DELETE
        // verifyPasscode(() => {
        //   handlePasscodeSignIn();
        // }, false);
        setInitialRoute(PASSCODE_LOGIN_SCREEN);
      } else if (!savedPasscode && savedUserName) {
        setInitialRoute(PASSWORD_ONLY_LOGIN_SCREEN);
      }

      if (!keyChainLoading) {
        setLoading(false);
      }
    };

    fetchInitialData();
  }, [
    handlePasscodeSignIn,
    keyChainLoading,
    passcodeTries,
    refreshToken,
    savedPasscode,
    savedUserName,
  ]);

  return {
    loading,
    initialRoute: initialRoute as keyof GuestStackParamList,
  };
};
