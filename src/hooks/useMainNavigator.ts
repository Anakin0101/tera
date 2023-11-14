import { useCallback, useEffect } from 'react';
import { useLazyGetTrustedDevicesQuery } from 'services/apis';
import { useAppDispatch } from 'store/hooks/useAppDispatch';
import { useAppSelector } from 'store/hooks/useAppSelector';
import { setIsDeviceTrusted } from 'store/slices/deviceInfo';

export const useMainNavigator = () => {
  const [getTrustedDevices, { data, isLoading, error }] = useLazyGetTrustedDevicesQuery();
  const { userIp, deviceToken } = useAppSelector(state => state.deviceInfo);
  const dispatch = useAppDispatch();

  useEffect(() => {
    getTrustedDevices({
      headers: {
        'X-Bank-UserIp': userIp,
        'X-Bank-DeviceToken': deviceToken,
      },
    });
  }, [deviceToken, getTrustedDevices, userIp]);

  const getIsDeviceTrusted = useCallback(() => {
    const device = data?.devices.find(item => item.isCurrentDevice);
    if (device) {
      dispatch(
        setIsDeviceTrusted({
          isTrusted: !!device,
          isLoading,
          error,
        }),
      );
    }
  }, [data?.devices, dispatch, error, isLoading]);

  useEffect(() => {
    getIsDeviceTrusted();
  }, [getIsDeviceTrusted]);

  return {};
};
