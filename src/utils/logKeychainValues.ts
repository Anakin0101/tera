import {
  getPasscode,
  getPassword,
  clearCredentials,
  getBiometricsAuthStatus,
  getLoginName,
} from './keychain';

// TODO - should be removed - testing purposes only!!
export const logAllKeychainValues = async () => {
  try {
    // Retrieve password
    const password = await getPassword();

    // Retrieve passcode
    const passcode = await getPasscode();

    // Retrieve biometric auth status
    const biometricAuthStatus = await getBiometricsAuthStatus();

    const loginName = await getLoginName();

    console.warn({
      password,
      passcode,
      biometricAuthStatus,
      loginName,
    });

    // Any other keychain values you've stored can be added similarly...
  } catch (error) {
    console.warn('Error logging keychain values:', error);
  }
};

// TODO - should be removed - testing purposes only!!
export const resetKeychainValues = async () => {
  try {
    const val = await clearCredentials();
    return val;
  } catch (error) {
    console.warn('Error logging keychain values:', error);
    return false;
  }
};
