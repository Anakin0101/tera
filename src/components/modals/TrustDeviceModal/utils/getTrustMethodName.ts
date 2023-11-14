import {
  AUTH_METHOD_NAMES,
  AuthmethodTypes,
} from 'screens/AuthorizationMethodsScreen/AuthorizationMethodsScreen.types';

/**
 *
 * @returns translation key, which will then build the sentence.
 * e.g Face ID - ის დასაყენებლად ... / პასკოდის დასაყენებლად / Finger Print - ის დასაყენებლად
 */
export const getTrustMethodName = (methodName: AuthmethodTypes) => {
  switch (methodName) {
    case AUTH_METHOD_NAMES.passcode:
      return 'trustDevice.passcode_s';
    case AUTH_METHOD_NAMES.faceId:
      return 'trustDevice.faceId_s';
    case AUTH_METHOD_NAMES.fingerPrint:
      return 'trustDevice.fingerprint_s';
  }
};
