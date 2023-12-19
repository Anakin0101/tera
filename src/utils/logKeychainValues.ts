import { getPasscode, getPassword, clearCredentials, getBiometricsAuthStatus } from './keychain';

// TODO - should be removed - testing purposes only!!
export const logAllKeychainValues = async () => {
  try {
    // Retrieve password
    const password = await getPassword();

    // Retrieve passcode
    const passcode = await getPasscode();

    // Retrieve biometric auth status
    const biometricAuthStatus = await getBiometricsAuthStatus();

    console.warn({
      password,
      passcode,
      biometricAuthStatus,
    });

    // Any other keychain values you've stored can be added similarly...
  } catch (error) {
    console.error('Error logging keychain values:', error);
  }
};

// TODO - should be removed - testing purposes only!!
export const resetKeychainValues = async () => {
  try {
    const val = await clearCredentials();
    return val;
  } catch (error) {
    console.error('Error logging keychain values:', error);
    return false;
  }
};
