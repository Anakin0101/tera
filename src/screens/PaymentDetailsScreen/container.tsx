import React from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';

import { usePayServiceMutation } from 'services/apis/paymentsAPI/paymentsAPI';
import { getValue } from 'storage/index';
import { SELECTED_LANGUAGE } from 'storage/constants';
import {
  LanguageKeyForAPIEnum,
  LanguageKeys,
} from 'components/LanguageSwitcher/LanguageSwitcher.types';
import { PayRequestBody, PaymentFieldValue } from 'services/apis/paymentsAPI/paymentsAPI.types';
import { openToast } from 'utils/toast';
import { MainStackRouteProps, MainStackScreenProps } from 'navigation/types';
import { MODAL_STACK, PAYMENT_ERROR_SCREEN, PAYMENT_SUCCESS_SCREEN } from 'navigation/ScreenNames';
import { updateArrayValuesById } from 'utils/paymentUtils';
import { closeModal, openModal } from 'utils/modal';
import { OTPModal } from 'components/modals';

export const usePayService = () => {
  const savedLanguage = getValue(SELECTED_LANGUAGE);
  const { navigate } = useNavigation<MainStackScreenProps<'ModalStack'>>();
  const { params } = useRoute<MainStackRouteProps<'PaymentDetailsScreen'>>();
  const {
    providerItem,
    debtVerifyResults,
    selectedAccount,
    subscriberFieldsValue,
    subscriberInputFieldsValue,
    debtVerifyBasketInfo,
  } = params || {};

  const [getPaymentServices, { isLoading }] = usePayServiceMutation();

  /**
   * Generate an array of PaymentFieldValue based on debtVerifyResults, subscriberFieldsValue, and subscriberInputFieldsValue.
   *
   * @function
   * @param {Array<DebtVerifyResult>} debtVerifyResults - The array of debt verification results.
   * @param {SubscriberFieldsValue} subscriberFieldsValue - The array of subscriber fields' values.
   * @param {SubscriberFieldsValue} subscriberInputFieldsValue - The array of subscriber input fields' values.
   * @returns {Array<PaymentFieldValue>} The array of PaymentFieldValue with updated values.
   */
  const generatePaymentFieldValues = () => {
    return debtVerifyResults.flatMap(result =>
      (result.serviceFields || []).map(field => ({ id: field.id, value: field.value })),
    );
  };

  /**
   * Perform a payment service operation.
   *
   * @param {boolean} sendOtp - Indicates whether to send an OTP.
   * @param {string | null} otp - The OTP to be used.
   */
  const paymentService = async (sendOtp: boolean, otp: string | null) => {
    try {
      // Generate payment field values
      const filedValue: Array<PaymentFieldValue> = generatePaymentFieldValues();

      // Update field values based on subscriber fields and input fields
      const resultArray = updateArrayValuesById(filedValue, subscriberFieldsValue);
      const newArr = updateArrayValuesById(resultArray, subscriberInputFieldsValue);

      // Prepare the payment request body
      const request: PayRequestBody = {
        otp: otp,
        payments: [
          {
            serviceId: providerItem.id,
            basketItemDescription: '',
            basketItemName: '',
            fieldValues: newArr,
            saveIntoBasketId: null,
          },
        ],
        isTeraBytes: false,
        accountId: selectedAccount.accountId,
        sendOtp: sendOtp,
        culture:
          savedLanguage === LanguageKeys.geo ? LanguageKeyForAPIEnum.KA : LanguageKeyForAPIEnum.EN,
      };

      // Make the payment services API call
      const response = await getPaymentServices(request);

      // Handle API response
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
      } else if (response) {
        if (sendOtp) {
          // Open OTP modal if OTP is being sent
          openOtpModal();
        } else {
          // Navigate to payment success screen
          navigate(MODAL_STACK, {
            screen: PAYMENT_SUCCESS_SCREEN,
            params: {
              providerItem,
              subscriberInputFieldsValue,
            },
          });
        }
      }
    } catch (err) {
      console.warn('error=> payService >>>', err);
      navigate(PAYMENT_ERROR_SCREEN);
    }
  };

  /**
   * Initiates the payment service with or without OTP based on the provider's OTP requirement.
   */
  const payService = () => {
    paymentService(providerItem.otpRequired, null);
  };

  /**
   * Opens the OTP modal for user input and triggers the payment service when the OTP is finished.
   */
  const openOtpModal = () => {
    openModal({
      element: (
        <OTPModal
          onFinished={code => {
            closeModal();
            paymentService(false, code);
          }}
        />
      ),
      disableDynamicSizing: true,
      disablePanning: true,
    });
  };

  return {
    isLoading,
    payService,
    providerItem,
    debtVerifyResults,
    selectedAccount,
    subscriberFieldsValue,
    subscriberInputFieldsValue,
    debtVerifyBasketInfo,
  };
};
