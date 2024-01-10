import { Alert } from 'react-native';
import { useDeleteTrustedDevicesMutation } from 'services/apis';
import { useAppSelector } from 'store/hooks/useAppSelector';

export const useDeleteTrustedDevices = () => {
  const [deleteTrustedDevices] = useDeleteTrustedDevicesMutation();
  const { userIp } = useAppSelector(state => state.deviceInfo);

  const handleDeleteTrustedDevices = async () => {
    try {
      const res = await deleteTrustedDevices({
        headers: {
          'X-Bank-UserIp': userIp,
        },
        ids: ['29ed27c5-c197-49cc-a655-9e9f9cf6608a'],
      });
      Alert.alert('Device has been removed from trusted devices', JSON.stringify(res));
      if (res && 'data' in res && res.data.success) {
        //    do something
      }
    } catch (error) {
      console.warn('Error in deleteTrustedDevices:', error);
    }
  };

  return { handleDeleteTrustedDevices };
};
