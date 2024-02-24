import { useCallback, useEffect, useMemo } from 'react';

import { useDebtVerifyBasketMutation } from 'services/apis';
import { getValue } from 'storage/index';
import { SELECTED_LANGUAGE } from 'storage/constants';
import {
  LanguageKeyForAPIEnum,
  LanguageKeys,
} from 'components/LanguageSwitcher/LanguageSwitcher.types';
import { BasketItem } from 'services/apis/paymentsAPI/paymentsAPI.types';

export const useCartPaymentItem = (basket: BasketItem) => {
  const savedLanguage = getValue(SELECTED_LANGUAGE);

  const [debtVerifyBasket, { data, isLoading, isSuccess }] = useDebtVerifyBasketMutation();

  const getDebtVerifyBasket = useCallback(() => {
    try {
      debtVerifyBasket({
        serviceId: basket.serviceId,
        fieldValues: basket.fieldValues || [],
        culture:
          savedLanguage === LanguageKeys.geo ? LanguageKeyForAPIEnum.KA : LanguageKeyForAPIEnum.EN,
      });
    } catch (ex) {
      console.warn('addBaskeetServiceOnPress', ex);
    }
  }, [basket.fieldValues, basket.serviceId, debtVerifyBasket, savedLanguage]);

  useEffect(() => {
    getDebtVerifyBasket();
  }, [getDebtVerifyBasket]);

  const debtVerifyResult = useMemo(() => data?.debtVerifyResults?.[0], [data?.debtVerifyResults]);

  return { debtVerifyResult, isLoading, isSuccess };
};
