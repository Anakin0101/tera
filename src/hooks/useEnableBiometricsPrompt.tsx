import React from 'react';
import { EasyLoginModal } from 'components/modals';
import { openModal } from 'utils/modal';
import { Linking, Platform, NativeModules } from 'react-native';

export const useEnableBiometricsPrompt = () => {
  const handleOpenSettings = () => {
    Platform.OS === 'ios'
      ? Linking.openSettings()
      : NativeModules.OpenSettingsModule.openMainSettings();
  };

  const openBiometricModal = () => {
    openModal({
      element: (
        <EasyLoginModal
          handlePress={handleOpenSettings}
          description={'easylogin.enable_from_settings'}
          primaryButtonText="Settings"
        />
      ),
    });
  };

  return {
    openBiometricSensorModal: openBiometricModal,
  };
};
