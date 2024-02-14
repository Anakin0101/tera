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
import { PaymentFieldValue } from 'services/apis/paymentsAPI/paymentsAPI.types';
import { useNavigation, useRoute } from '@react-navigation/native';
import { MainStackRouteProps, ModalStackScreenProps } from 'navigation/types';
import { NEW_AUTOMATIC_PAYMENT_SCREEN } from 'navigation/ScreenNames';
import { SubscriberFieldsValue } from './CheckPaymentProviderScreen.types';
import { useKeyboard } from 'utils/useKeyboard';

export const useCheckProviderInfo = () => {
  const savedLanguage = getValue(SELECTED_LANGUAGE);
  const { navigate } = useNavigation<ModalStackScreenProps<'NewAutomaticPaymentScreen'>>();
  const { params } = useRoute<MainStackRouteProps<'CheckPaymentProviderScreen'>>();
  const { providerItem, isAutomaticPayment } = params || {};

  const { isKeyboardOpened } = useKeyboard();
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

  const getDebtVerifyResultsHandler = (fieldValues: Array<PaymentFieldValue>) => {
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
    isKeyboardOpened,
    providerItem,
    isAutomaticPayment,
  };
};
