import { useNavigation } from '@react-navigation/native';
import { PASSWORD_LOGIN_SCREEN } from 'navigation/ScreenNames';
import { GuestStackScreenProps } from 'navigation/types';
import { resetKeychainValues } from 'utils/logKeychainValues';

export const useUserReset = () => {
  const { navigate } = useNavigation<GuestStackScreenProps<'PasswordLoginScreen'>>();

  const resetUser = () => {
    resetKeychainValues();
    navigate(PASSWORD_LOGIN_SCREEN);
  };

  return {
    resetUser,
  };
};
