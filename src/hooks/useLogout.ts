import { useLogoutUserMutation } from 'services/apis';
import { useAppDispatch } from 'store/hooks/useAppDispatch';
import { useAppSelector } from 'store/hooks/useAppSelector';
import { resetUserProfileInfo } from 'store/slices/profile';
import { setAccessToken, setPostponeEasyLogin } from 'store/slices/userInfo';
import { useCallback } from 'react';
import { NavigationRef } from 'navigation/index';
import { GUEST_NAVIGATOR } from 'navigation/ScreenNames';
import { CommonActions } from '@react-navigation/native';

export const useLogout = () => {
  const [logoutUser] = useLogoutUserMutation();
  const { userIp, deviceToken } = useAppSelector(state => state.deviceInfo);
  const dispatch = useAppDispatch();

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
      if (NavigationRef?.current) {
        NavigationRef.current.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: GUEST_NAVIGATOR }],
          }),
        );
      }
    }
  }, [logoutUser, userIp, deviceToken, dispatch]);

  return { handleLogout };
};
