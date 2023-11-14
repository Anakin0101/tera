import { getCredentials, getPasscode, getPassword, clearCredentials } from './keychain';

// TODO - should be removed - testing purposes only!!
export const logAllKeychainValues = async () => {
  try {
    // Retrieve credentials
    const credentials = await getCredentials();
    console.warn('Generic Credentials:', credentials);

    // Retrieve password
    const password = await getPassword();
    console.warn('Password:', password);

    // Retrieve passcode
    const passcode = await getPasscode();
    console.warn('Passcode:', passcode);

    // Any other keychain values you've stored can be added similarly...
  } catch (error) {
    console.error('Error logging keychain values:', error);
  }
};

// TODO - should be removed - testing purposes only!!
export const clearAllKeyChainValues = async () => {
  try {
    clearCredentials();
  } catch (error) {
    console.error('Error logging keychain values:', error);
  }
};
