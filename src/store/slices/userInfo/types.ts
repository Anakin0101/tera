import { LogoutAPIResponseType } from 'services/apis/authAPI/authAPI.types';

export type UserInfoStateProps = {
  accessToken: string;
  refreshToken: string;
  deviceToken: string;
  ignoreEasyLogin: boolean;
  postponeEasyLogin: boolean;
  logoutStatus: LogoutAPIResponseType | undefined;
  otpCode?: string;
  otpCodeErrorTimes: number;
  isPasscodeSet: boolean | undefined;
  isBiometricSet: boolean | undefined;
  passcodeTries: number;
  isBiometricBeingSet: boolean | undefined;
  shouldSaveUsername: boolean | undefined;
};

export type SupportedAuthMethodsType = {
  passcode?: boolean;
  biometrics?: boolean;
};
