import { useNavigation } from '@react-navigation/native';
import { ConfirmUserResetModal } from 'components/modals';
import { PASSWORD_LOGIN_SCREEN } from 'navigation/ScreenNames';
import { GuestStackScreenProps } from 'navigation/types';
import React from 'react';
import { Alert, Keyboard } from 'react-native';
import { resetKeychainValues } from 'utils/logKeychainValues';
import { closeModal, openModal } from 'utils/modal';

export const useUserReset = () => {
  const { navigate } = useNavigation<GuestStackScreenProps<'PasswordLoginScreen'>>();

  const confirmUserReset = async () => {
    const result = await resetKeychainValues();
    if (result) {
      closeModal();
      navigate(PASSWORD_LOGIN_SCREEN, {
        clearStorage: true,
      });
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
