import { useCallback, useEffect, useState } from 'react';
import Biometrics from 'react-native-biometrics';
import { useAppDispatch } from 'store/hooks/useAppDispatch';
import { setBiometricStatus } from 'store/slices/userInfo';
import { setBiometricsAuth, getBiometricsAuthStatus, clearBiometricsAuth } from 'utils/keychain';

export const useBiometrics = () => {
  const [biometricAuthAvailable, setBiometricAuthAvailable] = useState<boolean | null>(null);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const checkBiometrics = async () => {
      const value = await getBiometricsAuthStatus();
      dispatch(setBiometricStatus(value));
    };

    checkBiometrics();
  }, [dispatch]);

  const isBiometricSupported = useCallback(async () => {
    const { available } = await Biometrics.isSensorAvailable();
    setBiometricAuthAvailable(available);
    return available;
  }, []);

  useEffect(() => {
    isBiometricSupported();
  }, [isBiometricSupported]);

  const checkBiometricSensor = async () => {
    const { available, biometryType, error } = await Biometrics.isSensorAvailable();
    if (error) {
      console.error('Biometric auth may not be supported:', error);
      return false;
    }

    if (available && biometryType) {
      const promptMessageMap = {
        [Biometrics.Biometrics]: 'biometric message for TouchID Android',
        [Biometrics.TouchID]: 'biometric message for TouchID iOS only',
        [Biometrics.FaceID]: 'biometric message for FaceID iOS only',
      };

      return {
        promptMessage: promptMessageMap[biometryType] || 'biometric message',
        cancelButtonText: 'close',
      };
    }
    return null;
  };

  const handleBiometricPrompt = async (
    onSuccess?: () => void,
    onError?: () => void,
    isActivation?: boolean,
  ) => {
    const simplePromptConfig = await checkBiometricSensor();
    if (!simplePromptConfig) {
      return;
    }

    try {
      const { success } = await Biometrics.simplePrompt(simplePromptConfig);
      if (success) {
        if (isActivation) {
          await setBiometricsAuth(true);
        }
        onSuccess?.();
      }
    } catch (e) {
      console.error('Biometric prompt error:', e);
      onError?.();
    }
  };

  // initial activation
  const handleBiometricActivation = (
    onActivationSuccess?: () => void,
    onActivationError?: () => void,
  ) => {
    handleBiometricPrompt(onActivationSuccess, onActivationError, true);
  };

  //   We use verification, when the biometric auth is already set in keychain and we just want to log the user in
  const handleBiometricVerification = (
    onActivationSuccess?: () => void,
    onActivationError?: () => void,
  ) => {
    handleBiometricPrompt(onActivationSuccess, onActivationError, false);
  };

  //   REMOVES BIOMETRIC AUTH FROM KEYCHAIN
  const clearBiometrics = async () => {
    const result = await clearBiometricsAuth();
    if (result) {
      dispatch(setBiometricStatus(null));
    }
  };

  return {
    handleBiometricActivation,
    handleBiometricVerification,
    biometricAuthAvailable,
    clearBiometrics,
  };
};
