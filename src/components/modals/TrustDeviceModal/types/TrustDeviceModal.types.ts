import { AuthorizationMethodType } from 'screens/AuthorizationMethodsScreen/AuthorizationMethodsScreen.types';

export type TrustDeviceModalProps = Partial<AuthorizationMethodType> & {
  openOTPModal?: () => void;
};
