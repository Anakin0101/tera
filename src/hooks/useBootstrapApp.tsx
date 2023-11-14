// hooks/useAppInitialization.ts

import { useState, useEffect } from 'react';
import { setValue, storageKeys } from 'storage/index';
import { APP_LAUNCHED } from 'storage/constants';
import { useAppSelector } from 'store/hooks/useAppSelector';
import { useNavigationContainerRef } from '@react-navigation/native';
import DeviceInfo from 'react-native-device-info';
import { setDeviceInfo } from 'store/slices/deviceInfo';
import { useAppDispatch } from 'store/hooks/useAppDispatch';

export const useBootstrapApp = () => {
  const navigationRef = useNavigationContainerRef();
  const [loading, setLoading] = useState(true);
  const [isFirstLaunch, setIsFirstLaunch] = useState(false);
  const { accessToken } = useAppSelector(state => state.userInfo);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchDeviceInfo = async () => {
      const deviceId = await DeviceInfo.getUniqueId();
      const userAgent = await DeviceInfo.getUserAgent();
      const osType = await DeviceInfo.getBaseOs();
      const userIp = await DeviceInfo.getIpAddress();
      //   const deviceToken = await DeviceInfo.getDeviceToken();

      dispatch(setDeviceInfo({ deviceId, userAgent, osType, userIp }));
    };

    fetchDeviceInfo();
  }, [dispatch]);

  useEffect(() => {
    const fetchInitialData = async () => {
      const isLaunchedBefore = storageKeys().includes(APP_LAUNCHED);

      if (!isLaunchedBefore) {
        await setValue(APP_LAUNCHED, true);
        setIsFirstLaunch(true);
      }

      setLoading(false);
    };

    fetchInitialData();
  }, []);

  return {
    loading,
    isFirstLaunch,
    isAuth: !!accessToken,
    navigationRef,
  };
};
