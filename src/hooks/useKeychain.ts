import { useEffect, useState } from 'react';
import { getBiometricsAuthStatus, getPasscode, getUserName } from 'utils/keychain';

export const useKeyChain = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [savedUserName, setSavedUserName] = useState<string | null | undefined>();
  const [savedPasscode, setSavedPasscode] = useState<string | null | undefined>();
  const [savedBiometricStatus, setSavedBiometricStatus] = useState<boolean | null | undefined>();

  useEffect(() => {
    const fetchKeyChainData = async () => {
      const username = await getUserName();
      setSavedUserName(username);
      const passcode = await getPasscode();
      setSavedPasscode(passcode);
      const biometricAuth = await getBiometricsAuthStatus();
      setSavedBiometricStatus(biometricAuth);
      setLoading(false);
    };

    fetchKeyChainData();
  }, []);
  return {
    loading,
    savedUserName,
    savedPasscode,
    savedBiometricStatus,
  };
};
