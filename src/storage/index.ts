import { MMKV } from 'react-native-mmkv';

export const storage = new MMKV();

// Generic function to set a value in MMKV storage
export const setValue = (key: string, value: string | boolean) => {
  storage.set(key, value);
};

// Generic function to get a value from MMKV storage
export const getValue = (key: string) => {
  return storage.getString(key);
};

export const storageKeys = () => {
  return storage.getAllKeys();
};

export const removeValue = (key: string) => {
  return storage.delete(key);
};

export const clearStorage = () => {
  return storage.clearAll();
};

/**
 *
 * @param keyToKeep - string
 * Clears storage but keyToKeep
 */
export const clearStorageExceptOne = (keyToKeep: string) => {
  const keys = storage.getAllKeys();

  keys.forEach(key => {
    if (key !== keyToKeep) {
      storage.delete(key);
    }
  });
};

/**
 *
 * @param keysToKeep array of strings
 * Clears storage except keysToKeep
 */
export const clearStorageExceptKeys = (keysToKeep: string[]) => {
  const allKeys = storage.getAllKeys();

  allKeys.forEach(key => {
    if (!keysToKeep.includes(key)) {
      storage.delete(key);
    }
  });
};
