import { useEffect } from 'react';
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

export const useCheckProviderInfo = (serviceId: number) => {
  const savedLanguage = getValue(SELECTED_LANGUAGE);

  const [getDebtVerifyBasket, { data: debtVerifyBasketInfo, isLoading }] =
    useGetDebtVerifyBasketMutation();

  const [getDebtVerifyResults, { data: debtVerifyInfo, isLoading: isDebtVerifyLoading }] =
    useDebtVerifyResultsMutation();

  useEffect(() => {
    getDebtVerifyBasket({
      serviceId,
      culture:
        savedLanguage === LanguageKeys.geo ? LanguageKeyForAPIEnum.KA : LanguageKeyForAPIEnum.EN,
    });
  }, [getDebtVerifyBasket, savedLanguage, serviceId]);

  const getDebtVerifyResultsHandler = (fieldValues: Array<PaymentFieldValue>) => {
    getDebtVerifyResults({
      fieldValues,
      serviceId,
      culture:
        savedLanguage === LanguageKeys.geo ? LanguageKeyForAPIEnum.KA : LanguageKeyForAPIEnum.EN,
    });
  };

  return {
    debtVerifyBasketInfo,
    isLoading,
    isDebtVerifyLoading,
    getDebtVerifyResultsHandler,
    debtVerifyResults: debtVerifyInfo?.debtVerifyResults || [],
  };
};
