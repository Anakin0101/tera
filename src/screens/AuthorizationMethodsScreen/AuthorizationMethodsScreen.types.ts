import { SvgProps } from 'react-native-svg';

export const AUTH_METHOD_NAMES = {
  sms: 'sms',
  passcode: 'passcode',
  fingerPrint: 'fingerPrint',
  faceId: 'faceId',
};

export type AuthmethodTypes = keyof typeof AUTH_METHOD_NAMES;

export type AuthorizationMethodType = {
  methodName: AuthmethodTypes;
  title: string;
  description: string;
  icon: (props: SvgProps) => React.JSX.Element;
  requiresTrust: boolean;
};
