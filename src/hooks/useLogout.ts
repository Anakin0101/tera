import { useLogoutUserMutation } from 'services/apis';
import { useAppDispatch } from 'store/hooks/useAppDispatch';
import { useAppSelector } from 'store/hooks/useAppSelector';
import { resetUserProfileInfo, setAccessToken, setPostponeEasyLogin } from 'store/slices/userInfo';

export const useLogout = () => {
  const [logoutUser] = useLogoutUserMutation();
  const { userIp, deviceToken } = useAppSelector(state => state.deviceInfo);
  const dispatch = useAppDispatch();

  const handleLogout = async () => {
    try {
      const response = await logoutUser({
        headers: {
          'X-Bank-UserIp': userIp,
          'X-Bank-DeviceToken': deviceToken,
        },
      });

      if ('data' in response && response.data) {
        dispatch(setPostponeEasyLogin(false));
        dispatch(setAccessToken(''));
        dispatch(resetUserProfileInfo());
      }
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return { handleLogout };
};
