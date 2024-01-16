import { useNavigation } from '@react-navigation/native';
import { GUEST_NAVIGATOR } from 'navigation/ScreenNames';
import { RoutesGenericProp } from 'navigation/types';
import { useLogoutUserMutation } from 'services/apis';
import { useAppDispatch } from 'store/hooks/useAppDispatch';
import { useAppSelector } from 'store/hooks/useAppSelector';
import { resetUserProfileInfo } from 'store/slices/profile';
import { setAccessToken, setPostponeEasyLogin } from 'store/slices/userInfo';
import { useGuestNavigator } from './useGuestNavigator';
import { useCallback } from 'react';
import { setValue, storageKeys } from 'storage/index';
import { USER_LOGGED_OUT } from 'storage/constants';

export const useLogout = () => {
  const [logoutUser] = useLogoutUserMutation();
  const { userIp, deviceToken } = useAppSelector(state => state.deviceInfo);
  const dispatch = useAppDispatch();
  const userHasLoggedOut = storageKeys().includes(USER_LOGGED_OUT);
  const { replace } = useNavigation<RoutesGenericProp<'guestNavigator'>>();
  const { initialRoute } = useGuestNavigator();

  const handleLogout = useCallback(async () => {
    try {
      await logoutUser({
        headers: {
          'X-Bank-UserIp': userIp,
          'X-Bank-DeviceToken': deviceToken,
        },
      });
    } catch (error) {
      console.warn('Error during logout:', error);
    } finally {
      if (!userHasLoggedOut) {
        setValue(USER_LOGGED_OUT, true);
      }
      dispatch(setPostponeEasyLogin(false));
      dispatch(setAccessToken(''));
      dispatch(resetUserProfileInfo());
      replace(GUEST_NAVIGATOR, { screen: initialRoute });
    }
  }, [logoutUser, userIp, deviceToken, userHasLoggedOut, dispatch, replace, initialRoute]);

  return { handleLogout };
};
