import { useEffect, useState } from 'react';
import { getBiometricsAuthStatus, getPasscode } from 'utils/keychain';

type State = {
  loading: boolean | null;
  savedPasscode: string | null;
  savedBiometricStatus: boolean | null;
};

export const useKeyChain = () => {
  const [keyChainData, setKeyChainData] = useState<State>({
    loading: true,
    savedPasscode: null,
    savedBiometricStatus: null,
  });

  useEffect(() => {
    const fetchKeyChainData = async () => {
      const passcode = await getPasscode();
      const biometricAuth = await getBiometricsAuthStatus();

      setKeyChainData({
        loading: false,
        savedPasscode: passcode,
        savedBiometricStatus: biometricAuth,
      });
    };

    fetchKeyChainData();
  }, []);

  return keyChainData;
};
