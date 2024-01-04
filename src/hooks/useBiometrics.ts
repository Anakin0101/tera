import { useCallback, useEffect, useState } from 'react';
import { AppState, Platform } from 'react-native';
import Biometrics from 'react-native-biometrics';
import { useAppDispatch } from 'store/hooks/useAppDispatch';
import { setBiometricStatus } from 'store/slices/userInfo';
import { setBiometricsAuth, getBiometricsAuthStatus, clearBiometricsAuth } from 'utils/keychain';
import { closeModal } from 'utils/modal';

export const useBiometrics = () => {
  const dispatch = useAppDispatch();
  const [deviceSupportsBiometricAuth, setDeviceSupportsBiometricAuth] = useState<boolean | null>(
    null,
  );
  const [isBiometricAuthIsEnabled, setIsBiometricAuthIsEnabled] = useState<boolean | null>(null);

  // if device supports biometric auth option
  const isBiometricSupportedByHardware = useCallback(async () => {
    const response = await Biometrics.isSensorAvailable();
    const isHardwareSupported = response.isHardwareSupported;

    setDeviceSupportsBiometricAuth(isHardwareSupported);
    return isHardwareSupported;
  }, []);

  // if biometric auth is enabled for the app
  const isBiometricEnabledOnSmartphone = useCallback(async () => {
    const { available } = await Biometrics.isSensorAvailable();

    setIsBiometricAuthIsEnabled(available);
    return available;
  }, []);

  useEffect(() => {
    const checkBiometrics = async () => {
      const value = await getBiometricsAuthStatus();
      dispatch(setBiometricStatus(value));
    };

    checkBiometrics();
  }, [dispatch]);

  useEffect(() => {
    isBiometricSupportedByHardware();
    isBiometricEnabledOnSmartphone();

    const subscription = AppState.addEventListener('change', nextAppState => {
      if (nextAppState === 'active' && Platform.OS === 'android') {
        closeModal();
        isBiometricSupportedByHardware();
        isBiometricEnabledOnSmartphone();
      }
    });

    return () => subscription.remove();
  }, [isBiometricEnabledOnSmartphone, isBiometricSupportedByHardware]);

  const checkBiometricSensor = async () => {
    const { available, biometryType, error } = await Biometrics.isSensorAvailable();

    if (error) {
      console.error('Biometric auth may not be supported:', error);
      return false;
    }

    if (Platform.OS === 'android' && biometryType === Biometrics.FaceID) {
      return null;
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
    onError?: (e?: string) => void,
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
      onError?.(String(e));
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
    onActivationError?: (e?: string) => void,
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
    clearBiometrics,
    deviceSupportsBiometricAuth,
    isBiometricAuthIsEnabled,
  };
};
