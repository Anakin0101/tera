import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import { GetUserInfoAPIResponseType } from 'services/apis/authAPI/authAPI.types';

export type UserInfoStateProps = {
  accessToken: string;
  refreshToken: string;
  deviceToken: string;
  ignoreEasyLogin: boolean;
  postponeEasyLogin: boolean;
  userProfileInfo: {
    loading?: any;
    error?: FetchBaseQueryError;
    profileInfo: GetUserInfoAPIResponseType | null;
  };
  isLoggingOut: boolean;
  otpCode?: string;
  isPasscodeSet: boolean | undefined;
  isBiometricSet: boolean | undefined;
  passcodeTries: number;
};

export type SupportedAuthMethodsType = {
  passcode?: boolean;
  biometrics?: boolean;
};
