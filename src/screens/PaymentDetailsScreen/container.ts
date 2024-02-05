import { usePayServiceMutation } from 'services/apis/paymentsAPI/paymentsAPI';
import { getValue } from 'storage/index';
import { SELECTED_LANGUAGE } from 'storage/constants';
import {
  LanguageKeyForAPIEnum,
  LanguageKeys,
} from 'components/LanguageSwitcher/LanguageSwitcher.types';
import { PayRequestBody, PaymentFieldValue } from 'services/apis/paymentsAPI/paymentsAPI.types';
import { openToast } from 'utils/toast';

export const usePayService = () => {
  const savedLanguage = getValue(SELECTED_LANGUAGE);

  const [getPaymentServices, { isLoading }] = usePayServiceMutation();

  const payService = async (
    accountId: number,
    serviceId: number,
    fieldValues: Array<PaymentFieldValue>,
  ) => {
    try {
      const request: PayRequestBody = {
        otp: null,
        payments: [
          {
            serviceId,
            basketItemDescription: '',
            basketItemName: '',
            fieldValues,
            saveIntoBasketId: null,
          },
        ],
        isTeraBytes: false,
        accountId,
        sendOtp: false,
        culture:
          savedLanguage === LanguageKeys.geo ? LanguageKeyForAPIEnum.KA : LanguageKeyForAPIEnum.EN,
      };
      const response = await getPaymentServices(request);

      if ('error' in response) {
        if ('data' in response.error) {
          // Use type assertion to inform TypeScript about the structure
          const errorData = response.error.data as {
            detail?: string;
          };

          if (errorData.detail) {
            openToast(errorData.detail, 'error');
          }
          return;
        }
      }
      return response;
    } catch (err) {
      console.warn('error=> payService >>>', err);
      return err;
    }
  };

  return {
    isLoading,
    payService,
  };
};
