import KeyChain, { Result } from 'react-native-keychain';

const LOGIN_NAME_SERVICE = 'loginNameService';
const PASSCODE_SERVICE = 'passcodeService';
const PASSWORD_SERVICE = 'passwordService';
const BIOMETRIC_AUTH_SERVICE = 'biometricAuthService';

export const setLoginName = async (loginName: string): Promise<boolean | Result> => {
  try {
    return await KeyChain.setGenericPassword('loginName', loginName, {
      service: LOGIN_NAME_SERVICE,
    });
  } catch (error) {
    console.warn('Error setting login name:', error);
    return false;
  }
};

export const getLoginName = async (): Promise<string | null> => {
  try {
    const credentials = await KeyChain.getGenericPassword({ service: LOGIN_NAME_SERVICE });
    if (credentials && credentials.username === 'loginName') {
      return credentials.password;
    }
    return null;
  } catch (error) {
    console.warn('Error fetching login name:', error);
    return null;
  }
};

export const clearLoginName = async (): Promise<boolean | Result> => {
  try {
    return await KeyChain.resetGenericPassword({ service: LOGIN_NAME_SERVICE });
  } catch (error) {
    console.warn('Error clearing login name:', error);
    return false;
  }
};

export const setPassword = async (password: string): Promise<boolean | Result> => {
  try {
    return await KeyChain.setGenericPassword('password', password, {
      service: PASSWORD_SERVICE,
    });
  } catch (error) {
    console.warn('Error setting password:', error);
    return false;
  }
};

export const getPassword = async (): Promise<string | null> => {
  try {
    const credentials = await KeyChain.getGenericPassword({ service: PASSWORD_SERVICE });
    if (credentials && credentials.password) {
      return credentials.password;
    }
    return null;
  } catch (error) {
    console.warn('Error fetching password:', error);
    return null;
  }
};

export const setPasscode = async (passcode: string): Promise<boolean | Result> => {
  try {
    return await KeyChain.setGenericPassword('passcode', passcode, {
      service: PASSCODE_SERVICE,
    });
  } catch (error) {
    console.warn('Error setting passcode:', error);
    return false;
  }
};

export const clearPasscode = async (): Promise<boolean | Result> => {
  try {
    return await KeyChain.resetGenericPassword({ service: PASSCODE_SERVICE });
  } catch (error) {
    console.warn('Error setting passcode:', error);
    return false;
  }
};

export const getPasscode = async (): Promise<string | null> => {
  try {
    const credentials = await KeyChain.getGenericPassword({ service: PASSCODE_SERVICE });
    if (credentials && credentials.password) {
      return credentials.password;
    }
    return null;
  } catch (error) {
    console.warn('Error fetching passcode:', error);
    return null;
  }
};

export const setBiometricsAuth = async (value: boolean): Promise<boolean | Result> => {
  try {
    return await KeyChain.setGenericPassword('biometric-auth-status', String(value), {
      service: BIOMETRIC_AUTH_SERVICE,
    });
  } catch (error) {
    console.warn('Error activating biometric authentication:', error);
    return false;
  }
};

export const clearBiometricsAuth = async (): Promise<boolean | Result> => {
  try {
    return await KeyChain.resetGenericPassword({ service: BIOMETRIC_AUTH_SERVICE });
  } catch (error) {
    console.warn('Error activating biometric authentication:', error);
    return false;
  }
};

export const getBiometricsAuthStatus = async (): Promise<boolean | null> => {
  try {
    const credentials = await KeyChain.getGenericPassword({ service: BIOMETRIC_AUTH_SERVICE });
    if (credentials && credentials.username === 'biometric-auth-status') {
      return credentials.password !== 'false';
    } else {
      return null;
    }
  } catch (error) {
    console.warn('Error retrieving biometric authentication status:', error);
    return null;
  }
};

export const clearCredentials = async (): Promise<boolean> => {
  try {
    await KeyChain.resetGenericPassword();
    await KeyChain.resetGenericPassword({ service: PASSWORD_SERVICE });
    await clearLoginName();
    await clearPasscode();
    await clearBiometricsAuth();
    return true;
  } catch (error) {
    console.warn('Error clearing credentials:', error);
    return false;
  }
};
