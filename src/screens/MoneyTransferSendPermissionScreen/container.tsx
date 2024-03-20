import { useCallback, useState } from 'react';
import { Linking } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

import { MainStackRouteProps, MainStackScreenProps } from 'navigation/types';
import { PROD_URLS } from 'services/constants/urls';
import { MONEY_TRANSFER_SEND_DETAILS_SCREEN } from 'navigation/ScreenNames';

export const useMoneyTransferSendPermission = () => {
  const { navigate } = useNavigation<MainStackScreenProps<'ModalStack'>>();
  const { params } = useRoute<MainStackRouteProps<'MoneyTransferSendPermissionScreen'>>();
  const {
    providerItem,
    selectedCountry,
    selectedCity,
    mtPoint,
    firstName,
    lastName,
    transferSendPrepareResponse,
    selectedAccount,
  } = params || {};

  const [termsAndConditionsAccepted, setTermsAndConditionsAccepted] = useState<boolean>(false);

  const onSubmit = useCallback(() => {
    const navParams = {
      providerItem,
      selectedCountry,
      selectedCity,
      mtPoint,
      firstName,
      lastName,
      transferSendPrepareResponse,
      selectedAccount,
    };
    navigate(MONEY_TRANSFER_SEND_DETAILS_SCREEN, navParams);
  }, [
    firstName,
    lastName,
    mtPoint,
    navigate,
    providerItem,
    selectedCity,
    selectedCountry,
    transferSendPrepareResponse,
    selectedAccount,
  ]);

  const openTermsAndConditions = () => {
    try {
      Linking.openURL(PROD_URLS.TERMS_URL);
    } catch (e) {
      console.warn('openTermsAndConditions', e);
    }
  };

  return {
    onSubmit,
    termsAndConditionsAccepted,
    setTermsAndConditionsAccepted,
    openTermsAndConditions,
  };
};
