import { DialPad, FaceIdSvg, FingerPrintIcon } from 'assets/SVGs';
import { Platform } from 'react-native';
import {
  AUTH_METHOD_NAMES,
  AuthmethodTypes,
  AuthorizationMethodType,
} from './AuthorizationMethodsScreen.types';

export const AuthorizationMethodsScreenOptions: AuthorizationMethodType[] = [
  {
    methodName: AUTH_METHOD_NAMES.passcode as AuthmethodTypes,
    title: 'settings.passcode_title',
    description: 'settings.passcode_desc',
    icon: DialPad,
    requiresTrust: true,
  },
  ...(Platform.OS === 'ios'
    ? [
        {
          methodName: AUTH_METHOD_NAMES.faceId as AuthmethodTypes,
          title: 'settings.face_id_title',
          description: 'settings.face_id_desc',
          icon: FaceIdSvg,
          requiresTrust: true,
        },
      ]
    : Platform.OS === 'android'
    ? [
        {
          methodName: AUTH_METHOD_NAMES.fingerPrint as AuthmethodTypes,
          title: 'settings.biometric_title',
          description: 'settingsbiometric_desc',
          icon: FingerPrintIcon,
          requiresTrust: true,
        },
      ]
    : []),
];
