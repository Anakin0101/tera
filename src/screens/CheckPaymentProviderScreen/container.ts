import { useEffect, useState } from 'react';
import {
  useDebtVerifyResultsMutation,
  useGetDebtVerifyBasketMutation,
} from 'services/apis/paymentsAPI/paymentsAPI';
import { getValue } from 'storage/index';
import { SELECTED_LANGUAGE } from 'storage/constants';
import {
  LanguageKeyForAPIEnum,
  LanguageKeys,
} from 'components/LanguageSwitcher/LanguageSwitcher.types';
import { PaymentFieldValue, Provider } from 'services/apis/paymentsAPI/paymentsAPI.types';
import { useNavigation } from '@react-navigation/native';
import { ModalStackScreenProps } from 'navigation/types';
import { NEW_AUTOMATIC_PAYMENT_SCREEN } from 'navigation/ScreenNames';
import { SubscriberFieldsValue } from './CheckPaymentProviderScreen.types';

export const useCheckProviderInfo = (providerItem: Provider) => {
  const savedLanguage = getValue(SELECTED_LANGUAGE);
  const { navigate } = useNavigation<ModalStackScreenProps<'NewAutomaticPaymentScreen'>>();
  const [subscriberFieldsValue, setSubscriberFieldsValue] = useState<SubscriberFieldsValue>([]);

  const [getDebtVerifyBasket, { data: debtVerifyBasketInfo, isLoading }] =
    useGetDebtVerifyBasketMutation();

  const [getDebtVerifyResults, { data: debtVerifyInfo, isLoading: isDebtVerifyLoading }] =
    useDebtVerifyResultsMutation();

  useEffect(() => {
    getDebtVerifyBasket({
      serviceId: providerItem?.id,
      culture:
        savedLanguage === LanguageKeys.geo ? LanguageKeyForAPIEnum.KA : LanguageKeyForAPIEnum.EN,
    });
  }, [getDebtVerifyBasket, providerItem?.id, savedLanguage]);

  const getDebtVerifyResultsHandler = (
    fieldValues: Array<PaymentFieldValue>,
    isAutomaticPayment?: boolean,
  ) => {
    getDebtVerifyResults({
      fieldValues,
      serviceId: providerItem?.id,
      culture:
        savedLanguage === LanguageKeys.geo ? LanguageKeyForAPIEnum.KA : LanguageKeyForAPIEnum.EN,
    })
      .unwrap()
      .then(res => {
        if (isAutomaticPayment) {
          navigate(NEW_AUTOMATIC_PAYMENT_SCREEN, {
            providerItem,
            subscriberFieldsValue,
            debtVerifyResults: res?.debtVerifyResults || [],
          });
        }
      });
  };

  return {
    debtVerifyBasketInfo,
    isLoading,
    isDebtVerifyLoading,
    getDebtVerifyResultsHandler,
    debtVerifyResults: debtVerifyInfo?.debtVerifyResults || [],
    subscriberFieldsValue,
    setSubscriberFieldsValue,
  };
};
