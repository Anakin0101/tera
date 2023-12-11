import { useNavigation } from '@react-navigation/native';
import { ConfirmUserResetModal } from 'components/modals';
import { PASSWORD_LOGIN_SCREEN } from 'navigation/ScreenNames';
import { GuestStackScreenProps } from 'navigation/types';
import React from 'react';
import { Alert, Keyboard } from 'react-native';
import { useAppDispatch } from 'store/hooks/useAppDispatch';
import {
  resetUserCredentials,
  setBiometricStatus,
  setPasscodeStatus,
  setUserameStatus,
} from 'store/slices/userInfo';
import { resetKeychainValues } from 'utils/logKeychainValues';
import { closeModal, openModal } from 'utils/modal';

export const useUserReset = () => {
  const { navigate } = useNavigation<GuestStackScreenProps<'PasswordLoginScreen'>>();
  const dispatch = useAppDispatch();

  const confirmUserReset = async () => {
    const result = await resetKeychainValues();
    if (result) {
      dispatch(setBiometricStatus(null));
      dispatch(setPasscodeStatus(null));
      dispatch(setUserameStatus(null));
      dispatch(resetUserCredentials());
      closeModal();
      navigate(PASSWORD_LOGIN_SCREEN);
    } else {
      Alert.alert('Could not change user');
    }
  };

  const resetUser = () => {
    if (Keyboard.isVisible()) {
      Keyboard.dismiss();
    }
    openModal({
      element: <ConfirmUserResetModal confirm={confirmUserReset} cancel={closeModal} />,
      disablePanning: true,
    });
  };

  return {
    resetUser,
  };
};
