import Biometrics from 'react-native-biometrics';
import { activateBiometricsAuth } from 'utils/keychain';

export const useBiometrics = () => {
  // initial activation
  const handleBiometricActivation = async (onActivationSuccess: () => void) => {
    try {
      const { available, biometryType } = await Biometrics.isSensorAvailable();
      if (available) {
        const simplePromptConfig = {
          promptMessage: 'biometric message',
          cancelButtonText: 'close',
        };

        switch (biometryType) {
          case Biometrics.Biometrics:
            simplePromptConfig.promptMessage = 'biometric message';
            break;
          case Biometrics.FaceID:
            simplePromptConfig.promptMessage = 'biometric message';
            break;
        }
        const { success } = await Biometrics.simplePrompt(simplePromptConfig);

        if (success) {
          await activateBiometricsAuth();
          onActivationSuccess?.();
        }
      } else {
        //alert here
      }
    } catch (e) {}
  };

  const handleBiometricVerification = async (onActivationSuccess: () => void) => {
    try {
      const { available, biometryType } = await Biometrics.isSensorAvailable();
      if (available) {
        const simplePromptConfig = {
          promptMessage: 'biometric message',
          cancelButtonText: 'close',
        };

        switch (biometryType) {
          case Biometrics.Biometrics:
            simplePromptConfig.promptMessage = 'biometric message';
            break;
          case Biometrics.FaceID:
            simplePromptConfig.promptMessage = 'biometric message';
            break;
        }
        const { success } = await Biometrics.simplePrompt(simplePromptConfig);

        if (success) {
          onActivationSuccess?.();
        }
      } else {
        //alert here
      }
    } catch (e) {}
  };

  return {
    handleBiometricActivation,
    handleBiometricVerification,
  };
};
