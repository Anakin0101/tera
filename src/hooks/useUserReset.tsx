import { useNavigation } from '@react-navigation/native';
import { ConfirmUserResetModal } from 'components/modals';
import { PASSWORD_LOGIN_SCREEN } from 'navigation/ScreenNames';
import { GuestStackScreenProps } from 'navigation/types';
import React from 'react';
import { useAppDispatch } from 'store/hooks/useAppDispatch';
import { setBiometricStatus, setPasscodeStatus } from 'store/slices/userInfo';
import { resetKeychainValues } from 'utils/logKeychainValues';
import { closeModal, openModal } from 'utils/modal';

export const useUserReset = () => {
  const { navigate } = useNavigation<GuestStackScreenProps<'PasswordLoginScreen'>>();
  const dispatch = useAppDispatch();

  const confirmUserReset = () => {
    resetKeychainValues();
    navigate(PASSWORD_LOGIN_SCREEN);
    dispatch(setBiometricStatus(null));
    dispatch(setPasscodeStatus(null));
    closeModal();
  };

  const resetUser = () => {
    openModal({
      element: <ConfirmUserResetModal confirm={confirmUserReset} cancel={closeModal} />,
      disablePanning: true,
    });
  };

  return {
    resetUser,
  };
};
