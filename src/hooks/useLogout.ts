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

export const useLogout = () => {
  const [logoutUser] = useLogoutUserMutation();
  const { userIp, deviceToken } = useAppSelector(state => state.deviceInfo);
  const dispatch = useAppDispatch();
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
      dispatch(setPostponeEasyLogin(false));
      dispatch(setAccessToken(''));
      dispatch(resetUserProfileInfo());
      replace(GUEST_NAVIGATOR, { screen: initialRoute });
    }
  }, [logoutUser, userIp, deviceToken, dispatch, replace, initialRoute]);

  return { handleLogout };
};
