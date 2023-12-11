import {
  GetUserInfoAPIResponseType,
  LogoutAPIResponseType,
} from 'services/apis/authAPI/authAPI.types';

export type UserInfoStateProps = {
  accessToken: string;
  refreshToken: string;
  deviceToken: string;
  ignoreEasyLogin: boolean;
  postponeEasyLogin: boolean;
  userProfileInfo: GetUserInfoAPIResponseType | undefined;
  logoutStatus: LogoutAPIResponseType | undefined;
  otpCode?: string;
  isPasscodeSet: boolean | undefined;
  isBiometricSet: boolean | undefined;
  isUsernameSet: boolean | undefined;
  passcodeTries: number;
  isBiometricBeingSet: boolean | undefined;
};

export type SupportedAuthMethodsType = {
  passcode?: boolean;
  biometrics?: boolean;
};
