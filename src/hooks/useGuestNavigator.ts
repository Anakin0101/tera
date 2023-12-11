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

export const useGuestNavigator = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [, setIsFirstLaunch] = useState(false);
  const { loading: keyChainLoading } = useKeyChain();
  const [initialRoute, setInitialRoute] =
    useState<keyof GuestStackParamList>(PASSWORD_LOGIN_SCREEN);
  const refreshToken = useAppSelector(state => state.userInfo.refreshToken);
  const passcodeTries = useAppSelector(state => state.userInfo.passcodeTries);
  const isPasscodeSet = useAppSelector(state => state.userInfo.isPasscodeSet);
  const isUsernameSet = useAppSelector(state => state.userInfo.isUsernameSet);
  const isLaunchedBefore = storageKeys().includes(APP_LAUNCHED);

  useEffect(() => {
    const fetchInitialData = async () => {
      if (!keyChainLoading) {
        setLoading(false);
      }

      if (!isLaunchedBefore) {
        await setValue(APP_LAUNCHED, true);
        setIsFirstLaunch(true);
        setInitialRoute(ONBOARDING_SCREEN);
      } else if (isPasscodeSet && refreshToken && passcodeTries < 3) {
        // TODO - DO NOT DELETE
        // verifyPasscode(() => {
        //   handlePasscodeSignIn();
        // }, false);
        setInitialRoute(PASSCODE_LOGIN_SCREEN);
      } else if (!isPasscodeSet && isUsernameSet) {
        setInitialRoute(PASSWORD_ONLY_LOGIN_SCREEN);
      } else {
        setInitialRoute(PASSWORD_LOGIN_SCREEN);
      }
    };

    fetchInitialData();
  }, [
    keyChainLoading,
    passcodeTries,
    refreshToken,
    isPasscodeSet,
    isUsernameSet,
    isLaunchedBefore,
  ]);

  return {
    loading,
    initialRoute: initialRoute as keyof GuestStackParamList,
  };
};
