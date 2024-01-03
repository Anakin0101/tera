export type LoginAPIResponseType = {
  accessToken: string | null;
  authContext?: any;
  authMethod: string;
  authorized: boolean;
  blocked: boolean;
  channelData: any;
  error: any;
  hasDigipass: boolean;
  isAdult: boolean;
  isSelect: boolean;
  mustChangePassword: boolean;
  otpRequired: boolean;
  pending: boolean;
  refreshToken: string | null;
  success: boolean;
};

export type LoginAPIRequestType = {
  loginName: string;
  password: string;
  headers?: Record<string, any>;
};
export type LoginByRefreshTokenAPIResponseType = {
  accessToken: string | null;
  refreshToken: string | null;
  renewCredintials?: boolean;
  isBlocked?: boolean;
  otpRequired?: boolean;
  authMethod?: unknown;
  authorized?: boolean;
  authContext?: unknown;
  success?: boolean;
  error?: string;
  pending?: boolean;
  channelData?: unknown;
};

export type LoginByRefreshTokenAPIRequestType = {
  refreshToken: string;
  headers?: Record<string, any>;
};

export type AddTrustedDeviceAPIResponseType = {
  accessToken: string | null;
  refreshToken: string | null;
  deviceToken: string;
  success: boolean;
  error: any;
  pending: boolean;
  channelData: any;
};

export type AddTrustedDeviceAPIRequestType = {
  body?: Record<string, any>;
  headers?: Record<string, any>;
};

export type DeleteTrustedDeviceAPIResponseType = {
  success: boolean;
  error: unknown;
  pending: boolean;
  channelData: unknown;
};
export type DeleteTrustedDeviceAPIRequestType = {};

// logout
export type LogoutAPIResponseType = {
  success: boolean;
  error: unknown;
  pending: boolean;
  channelData: unknown;
};
export type LogoutAPIRequestType = {};

// getTrustedDevices

export type DeviceObjectType = {
  description: string;
  id: string;
  isCurrentDevice: boolean;
  lastConnectionIp: string | null;
  lastConnectionTimeUtc: string;
  osType: 'Android' | 'Other'; // assuming these are the only two possible values
  trustTimeUtc: string;
};
export type GetTrustedDevicesAPIResponseType = {
  channelData: null;
  devices: DeviceObjectType[];
  error: null;
  pending: boolean;
  success: boolean;
};

export type GetTrustedDevicesAPIRequestType = {
  headers?: Record<string, any>;
};

export type RefreshTokenAPIResponse = {
  accessToken: string;
  refreshToken: string;
};
