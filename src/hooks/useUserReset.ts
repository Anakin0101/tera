import { useNavigation } from '@react-navigation/native';
import { PASSWORD_LOGIN_SCREEN } from 'navigation/ScreenNames';
import { GuestStackScreenProps } from 'navigation/types';
import { useAppDispatch } from 'store/hooks/useAppDispatch';
import { setBiometricStatus, setPasscodeStatus } from 'store/slices/userInfo';
import { resetKeychainValues } from 'utils/logKeychainValues';

export const useUserReset = () => {
  const { navigate } = useNavigation<GuestStackScreenProps<'PasswordLoginScreen'>>();
  const dispatch = useAppDispatch();

  const resetUser = () => {
    resetKeychainValues();
    navigate(PASSWORD_LOGIN_SCREEN);
    dispatch(setBiometricStatus(null));
    dispatch(setPasscodeStatus(null));
  };

  return {
    resetUser,
  };
};
