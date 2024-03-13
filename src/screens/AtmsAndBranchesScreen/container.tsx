import { useGetAtmsMutation, useGetServiceCentersMutation } from 'services/apis';
import { AtmsResponse, ServiceCentersResponse } from 'services/apis/profileAPI/profileAPI.types';
import { useCallback } from 'react';
import { Alert, Linking, NativeModules, Platform } from 'react-native';
import { openModal } from 'utils/modal';
import { LocationSettingsModal } from 'components/AtmsAndBranches';
import React from 'react';

export const useAtmsAndBranches = <T extends AtmsResponse | ServiceCentersResponse>() => {
  const [
    getServiceCenters,
    { data: serviceCenters, isLoading: isServiceCentersLoading, error: serviceCentersError },
  ] = useGetServiceCentersMutation();
  const [getAtms, { data: atms, isLoading: isAtmsLoading, error: atmsError }] =
    useGetAtmsMutation();

  const fetchBranches = useCallback(() => {
    getServiceCenters();
  }, [getServiceCenters]);

  const fetchAtms = useCallback(() => {
    getAtms();
  }, [getAtms]);

  const handleOpenDetails = useCallback((item: T) => {
    Alert.alert('Details', `Item ID: ${item.id}`);
  }, []);

  const handleOpenSettings = () => {
    Platform.OS === 'ios'
      ? Linking.openURL('app-settings:')
      : NativeModules.OpenSettingsModule.openMainSettings();
  };

  const openLocationSettings = () => {
    openModal({
      element: <LocationSettingsModal handlePress={handleOpenSettings} />,
    });
  };

  return {
    serviceCentersError,
    atmsError,
    handleOpenDetails,
    isServiceCentersLoading,
    isAtmsLoading,
    serviceCenters,
    atms,
    fetchBranches,
    fetchAtms,
    openLocationSettings,
  };
};
