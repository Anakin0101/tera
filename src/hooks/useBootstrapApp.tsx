import { useEffect } from 'react';
import DeviceInfo from 'react-native-device-info';
import { setDeviceInfo, setDeviceSupportsBiometricAuth } from 'store/slices/deviceInfo';
import { useAppDispatch } from 'store/hooks/useAppDispatch';
import { useBiometrics } from './useBiometrics';

export const useBootstrapApp = () => {
  const dispatch = useAppDispatch();
  const { biometricAuthAvailable } = useBiometrics();

  useEffect(() => {
    const fetchDeviceInfo = async () => {
      const deviceId = await DeviceInfo.getUniqueId();
      const userAgent = await DeviceInfo.getUserAgent();
      const osType = await DeviceInfo.getBaseOs();
      const userIp = await DeviceInfo.getIpAddress();

      dispatch(setDeviceInfo({ deviceId, userAgent, osType, userIp }));
    };

    fetchDeviceInfo();
  }, [dispatch]);

  useEffect(() => {
    dispatch(setDeviceSupportsBiometricAuth(biometricAuthAvailable));
  }, [biometricAuthAvailable, dispatch]);
};
