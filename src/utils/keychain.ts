import KeyChain, { Result } from 'react-native-keychain';

const USERNAME_SERVICE = 'usernameService';
const PASSCODE_SERVICE = 'passcodeService';
const PASSWORD_SERVICE = 'passwordService';
const BIOMETRIC_AUTH_SERVICE = 'biometricAuthService';

export const setUsername = async (username: string): Promise<boolean | Result> => {
  try {
    return await KeyChain.setGenericPassword('username', username, {
      service: USERNAME_SERVICE,
    });
  } catch (error) {
    console.error('Error setting username:', error);
    return false;
  }
};

export const clearUsername = async (): Promise<boolean | Result> => {
  try {
    return await KeyChain.resetGenericPassword({ service: USERNAME_SERVICE });
  } catch (error) {
    console.error('Error setting passcode:', error);
    return false;
  }
};

export const getUserName = async (): Promise<string | null> => {
  try {
    const credentials = await KeyChain.getGenericPassword({ service: USERNAME_SERVICE });
    if (credentials && credentials.password) {
      return credentials.password;
    }
    return null;
  } catch (error) {
    console.error('Error fetching username from Keychain:', error);
    return null;
  }
};

export const setPassword = async (password: string): Promise<boolean | Result> => {
  try {
    return await KeyChain.setGenericPassword('password', password, {
      service: PASSWORD_SERVICE,
    });
  } catch (error) {
    console.error('Error setting password:', error);
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
    console.error('Error fetching password:', error);
    return null;
  }
};

export const setPasscode = async (passcode: string): Promise<boolean | Result> => {
  try {
    return await KeyChain.setGenericPassword('passcode', passcode, {
      service: PASSCODE_SERVICE,
    });
  } catch (error) {
    console.error('Error setting passcode:', error);
    return false;
  }
};

export const clearPasscode = async (): Promise<boolean | Result> => {
  try {
    return await KeyChain.resetGenericPassword({ service: PASSCODE_SERVICE });
  } catch (error) {
    console.error('Error setting passcode:', error);
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
    console.error('Error fetching passcode:', error);
    return null;
  }
};

export const setBiometricsAuth = async (value: boolean): Promise<boolean | Result> => {
  try {
    return await KeyChain.setGenericPassword('biometric-auth-status', String(value), {
      service: BIOMETRIC_AUTH_SERVICE,
    });
  } catch (error) {
    console.error('Error activating biometric authentication:', error);
    return false;
  }
};

export const clearBiometricsAuth = async (): Promise<boolean | Result> => {
  try {
    return await KeyChain.resetGenericPassword({ service: BIOMETRIC_AUTH_SERVICE });
  } catch (error) {
    console.error('Error activating biometric authentication:', error);
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
    console.error('Error retrieving biometric authentication status:', error);
    return null;
  }
};

export const clearCredentials = async (): Promise<boolean> => {
  try {
    await KeyChain.resetGenericPassword();
    await KeyChain.resetGenericPassword({ service: USERNAME_SERVICE });
    await KeyChain.resetGenericPassword({ service: PASSCODE_SERVICE });
    await KeyChain.resetGenericPassword({ service: PASSWORD_SERVICE });
    await KeyChain.resetGenericPassword({ service: BIOMETRIC_AUTH_SERVICE });
    return true;
  } catch (error) {
    console.error('Error clearing credentials:', error);
    return false;
  }
};
