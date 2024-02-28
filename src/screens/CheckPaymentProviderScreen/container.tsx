import { useCallback, useEffect, useLayoutEffect, useMemo, useState } from 'react';
import {
  useAddBasketItemMutation,
  useDebtVerifyResultsMutation,
  useGetDebtVerifyBasketMutation,
} from 'services/apis/paymentsAPI/paymentsAPI';
import { getValue } from 'storage/index';
import { SELECTED_LANGUAGE } from 'storage/constants';
import {
  LanguageKeyForAPIEnum,
  LanguageKeys,
} from 'components/LanguageSwitcher/LanguageSwitcher.types';
import { DebtVerifyResult, PaymentFieldValue } from 'services/apis/paymentsAPI/paymentsAPI.types';
import { useNavigation, useRoute } from '@react-navigation/native';
import { MainStackRouteProps, MainStackScreenProps } from 'navigation/types';
import {
  CHOOSE_PAYMENT_ACCOUNT_SCREEN,
  MODAL_STACK,
  NEW_AUTOMATIC_PAYMENT_SCREEN,
  PAYMENT_SUCCESS_SCREEN,
} from 'navigation/ScreenNames';
import { SubscriberFieldsValue } from './CheckPaymentProviderScreen.types';
import { useKeyboard } from 'utils/useKeyboard';
import { openToast } from 'utils/toast';

export const useCheckProviderInfo = () => {
  const savedLanguage = getValue(SELECTED_LANGUAGE);
  const { navigate, setOptions } = useNavigation<MainStackScreenProps<'ModalStack'>>();

  const { params } = useRoute<MainStackRouteProps<'CheckPaymentProviderScreen'>>();
  const { providerItem, isAutomaticPayment, basket } = params || {};

  const { isKeyboardOpened } = useKeyboard();
  const [subscriberFieldsValue, setSubscriberFieldsValue] = useState<SubscriberFieldsValue>([]);
  const [debtVerifyInfo, setDebtVerifyInfo] = useState<DebtVerifyResult[]>([]);

  const [getDebtVerifyBasket, { data: debtVerifyBasketInfo, isLoading }] =
    useGetDebtVerifyBasketMutation();

  const [getDebtVerifyResults, { isLoading: isDebtVerifyLoading }] = useDebtVerifyResultsMutation();
  const [addBasketItem, { isLoading: isAddBasketItemLoading }] = useAddBasketItemMutation();

  const headerTitle = useMemo(() => {
    // Initialize title with an empty string
    let title = '';
    // Check if the selected language is 'geo'
    if (savedLanguage === LanguageKeys.geo) {
      // Use the Georgian name if available, otherwise use an empty string
      title = providerItem?.name?.ka || '';
    } else {
      // Use the English name if available, otherwise use an empty string
      title = providerItem?.name?.en || '';
    }
    // Return the calculated title
    return title;
  }, [providerItem?.name?.en, providerItem?.name?.ka, savedLanguage]);

  useLayoutEffect(() => {
    setOptions({
      title: headerTitle,
    });
  }, [setOptions, headerTitle]);

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
        if (res?.debtVerifyResults) {
          setDebtVerifyInfo(res?.debtVerifyResults);
        }
        if (isAutomaticPayment) {
          navigate(NEW_AUTOMATIC_PAYMENT_SCREEN, {
            providerItem,
            subscriberFieldsValue,
            debtVerifyResults: res?.debtVerifyResults || [],
          });
        }
      });
  };

  /**
   * Update values in array1 based on values from array2 using 'id'.
   * Append objects from array2 to array1 when there is no matching 'id' in array1.
   *
   * @param {Array} array1 - The array to be updated.
   * @param {Array} array2 - The array containing new values.
   * @returns {Array} The updated array1.
   */
  const updateArrayValuesById = (
    array1: Array<PaymentFieldValue>,
    array2: Array<PaymentFieldValue>,
  ) => {
    array2.forEach(({ id, value }) => {
      const index = array1.findIndex(obj => obj.id === id);

      if (index !== -1) {
        // If a matching object is found, update its value with the new value from array2
        array1[index].value = value;
      } else {
        // If no matching object is found, append the object from array2 to array1
        array1.push({ id, value });
      }
    });

    return array1;
  };

  /**
   * Generate an array of PaymentFieldValue based on debtVerifyResults, subscriberFieldsValue, and subscriberInputFieldsValue.
   *
   * @function
   * @param {Array<DebtVerifyResult>} debtVerifyResults - The array of debt verification results.
   * @param {SubscriberFieldsValue} subscriberFieldsValue - The array of subscriber fields' values.
   * @param {SubscriberFieldsValue} subscriberInputFieldsValue - The array of subscriber input fields' values.
   * @returns {Array<PaymentFieldValue>} The array of PaymentFieldValue with updated values.
   */
  const generatePaymentFieldValues = useCallback(() => {
    return (
      debtVerifyInfo?.flatMap(result =>
        (result.serviceFields || []).map(field => ({ id: field.id, value: field.value })),
      ) || []
    );
  }, [debtVerifyInfo]);

  const openChoosePaymentAccountScreenOnPress = useCallback(
    async (fieldValues: Array<PaymentFieldValue>) => {
      try {
        if (basket) {
          const filedValue: Array<PaymentFieldValue> = generatePaymentFieldValues();
          const resultArray = updateArrayValuesById(filedValue, subscriberFieldsValue);
          const newArr = updateArrayValuesById(resultArray, fieldValues);

          // TODO: any ვუწერ იმიტომ რომ ბექი არ აბრუნებს ზოგჯერ რესპონს, ვებშიც მსგავსად აქვთ ამ სერვისზე
          const addBasketResponse: any = await addBasketItem({
            basketId: Number(basket.id),
            debitAccountId: null,
            description: '',
            name: '',
            serviceId: providerItem?.id,
            fieldValues: newArr,
            culture:
              savedLanguage === LanguageKeys.geo
                ? LanguageKeyForAPIEnum.KA
                : LanguageKeyForAPIEnum.EN,
          });

          if (addBasketResponse?.error?.data?.detail) {
            openToast(addBasketResponse?.error?.data?.detail, 'error');
          } else {
            navigate(MODAL_STACK, {
              screen: PAYMENT_SUCCESS_SCREEN,
              params: { isBasketMode: true },
            });
          }
        } else {
          navigate(MODAL_STACK, {
            screen: CHOOSE_PAYMENT_ACCOUNT_SCREEN,
            params: {
              providerItem,
              debtVerifyBasketInfo,
              debtVerifyResults: debtVerifyInfo || [],
              subscriberFieldsValue,
            },
          });
        }
      } catch (ex) {
        console.warn('openChoosePaymentAccountScreenOnPress', ex);
      }
    },
    [
      basket,
      generatePaymentFieldValues,
      subscriberFieldsValue,
      addBasketItem,
      providerItem,
      savedLanguage,
      navigate,
      debtVerifyBasketInfo,
      debtVerifyInfo,
    ],
  );

  const clearDebtVerifyInfo = () => {
    if (debtVerifyInfo.length > 0) {
      setDebtVerifyInfo([]);
    }
  };

  return {
    debtVerifyBasketInfo,
    isLoading,
    isDebtVerifyLoading,
    getDebtVerifyResultsHandler,
    debtVerifyResults: debtVerifyInfo || [],
    subscriberFieldsValue,
    setSubscriberFieldsValue,
    isKeyboardOpened,
    providerItem,
    isAutomaticPayment,
    openChoosePaymentAccountScreenOnPress,
    basket,
    isAddBasketItemLoading,
    clearDebtVerifyInfo,
  };
};
