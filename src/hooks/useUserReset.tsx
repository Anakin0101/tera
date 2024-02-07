import { StackActions } from '@react-navigation/native';
import { ConfirmUserResetModal } from 'components/modals';
import { PASSWORD_LOGIN_SCREEN } from 'navigation/ScreenNames';
import { NavigationRef } from 'navigation/index';
import React from 'react';
import { Alert, Keyboard } from 'react-native';
import { resetStateAction } from 'store/actions/reset';
import { useAppDispatch } from 'store/hooks/useAppDispatch';
import { debounce } from 'utils/debounce';
import { resetKeychainValues } from 'utils/logKeychainValues';
import { closeModal, openModal } from 'utils/modal';

export const useUserReset = () => {
  const dispatch = useAppDispatch();

  //   because of navigation async state, we need to debounce user reset
  const handleResetState = debounce(() => {
    dispatch(resetStateAction());
  }, 1000);

  const confirmUserReset = async () => {
    const result = await resetKeychainValues();
    if (result) {
      closeModal();
      if (NavigationRef.current) {
        NavigationRef.current.dispatch(StackActions.replace(PASSWORD_LOGIN_SCREEN));
        handleResetState();
      }
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
