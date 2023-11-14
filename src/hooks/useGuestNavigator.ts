import { useEffect, useState } from 'react';
import { APP_LAUNCHED } from 'storage/constants';
import { setValue, storageKeys } from 'storage/index';
import { useKeyChain } from './useKeychain';
import { GuestStackParamList } from 'navigation/types';
import {
  ONBOARDING_SCREEN,
  PASSWORD_LOGIN_SCREEN,
  PASSWORD_ONLY_LOGIN_SCREEN,
} from 'navigation/ScreenNames';
import { usePasscode } from './usePasscode';
import { useLogin } from './useLogin';

export const useGuestNavigator = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [, setIsFirstLaunch] = useState(false);
  const { loading: keyChainLoading, savedPasscode, savedUserName } = useKeyChain();
  const [initialRoute, setInitialRoute] =
    useState<keyof GuestStackParamList>(PASSWORD_LOGIN_SCREEN);
  const { verifyPasscode } = usePasscode();
  const { handlePasscodeSignIn } = useLogin();

  useEffect(() => {
    const fetchInitialData = async () => {
      const isLaunchedBefore = storageKeys().includes(APP_LAUNCHED);

      if (!isLaunchedBefore) {
        await setValue(APP_LAUNCHED, true);
        setIsFirstLaunch(true);
        setInitialRoute(ONBOARDING_SCREEN);
      } else if (savedPasscode) {
        verifyPasscode(() => {
          handlePasscodeSignIn();
        });
      } else if (!savedPasscode && savedUserName) {
        setInitialRoute(PASSWORD_ONLY_LOGIN_SCREEN);
      }

      if (!keyChainLoading) {
        setLoading(false);
      }
    };

    fetchInitialData();
  }, [handlePasscodeSignIn, keyChainLoading, savedPasscode, savedUserName, verifyPasscode]);

  return {
    loading,
    initialRoute: initialRoute as keyof GuestStackParamList,
  };
};
