import { Alert } from 'react-native';
import { useLogoutUserMutation } from 'services/apis';
import { USER_LOGGED_OUT } from 'storage/constants';
import { setValue, storageKeys } from 'storage/index';
import { useAppDispatch } from 'store/hooks/useAppDispatch';
import { useAppSelector } from 'store/hooks/useAppSelector';
import { resetUserProfileInfo } from 'store/slices/profile';
import { setAccessToken, setPostponeEasyLogin } from 'store/slices/userInfo';

export const useLogout = () => {
  const [logoutUser] = useLogoutUserMutation();
  const { userIp, deviceToken } = useAppSelector(state => state.deviceInfo);
  const dispatch = useAppDispatch();
  const userHasLoggedOut = storageKeys().includes(USER_LOGGED_OUT);

  const handleLogout = async () => {
    try {
      const response = await logoutUser({
        headers: {
          'X-Bank-UserIp': userIp,
          'X-Bank-DeviceToken': deviceToken,
        },
      });

      if ('data' in response && response.data) {
        if (!userHasLoggedOut) {
          setValue(USER_LOGGED_OUT, true);
        }
        dispatch(setPostponeEasyLogin(false));
        dispatch(setAccessToken(''));
        dispatch(resetUserProfileInfo());
      } else {
        Alert.alert('Error happened during logout: ', JSON.stringify(response));
      }
    } catch (error) {
      Alert.alert('Error happened during logout: ', JSON.stringify(error));
      console.error('Error during logout:', error);
    }
  };

  return { handleLogout };
};
