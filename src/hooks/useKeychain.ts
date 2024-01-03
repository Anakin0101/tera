import { useEffect, useState } from 'react';
import { getBiometricsAuthStatus, getLoginName, getPasscode } from 'utils/keychain';

type State = {
  loading: boolean | null;
  savedPasscode: string | null;
  savedBiometricStatus: boolean | null;
  savedLoginName: string | null;
};

export const useKeyChain = () => {
  const [keyChainData, setKeyChainData] = useState<State>({
    loading: true,
    savedPasscode: null,
    savedBiometricStatus: null,
    savedLoginName: null,
  });

  useEffect(() => {
    const fetchKeyChainData = async () => {
      const passcode = await getPasscode();
      const biometricAuth = await getBiometricsAuthStatus();
      const loginName = await getLoginName();

      setKeyChainData({
        loading: false,
        savedPasscode: passcode,
        savedBiometricStatus: biometricAuth,
        savedLoginName: loginName,
      });
    };

    fetchKeyChainData();
  }, []);

  return keyChainData;
};
