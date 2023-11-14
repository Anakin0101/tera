import { useLogoutUserMutation } from 'services/apis';
import { useAppSelector } from 'store/hooks/useAppSelector';

export const useLogout = () => {
  const [logoutUser] = useLogoutUserMutation();
  const { userIp, deviceToken } = useAppSelector(state => state.deviceInfo);

  const handleLogout = async () => {
    try {
      await logoutUser({
        headers: {
          'X-Bank-UserIp': userIp,
          'X-Bank-DeviceToken': deviceToken,
        },
      });
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return { handleLogout };
};
