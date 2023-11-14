export type DeviceInfoStateProps = {
  deviceId: string | null;
  userAgent: string | null;
  osType: string | null;
  userIp: string | null;
  deviceToken: string | null;
  isDeviceTrusted: {
    isTrusted: boolean | null;
    isLoading: boolean | null;
    error: boolean | null;
  };
};
