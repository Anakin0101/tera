import React, { useCallback } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { OTPModal } from 'components/modals';
import { ModalStackRouteProps, ModalStackScreenProps } from 'navigation/types';
import { useAddAutomaticPaymentMutation } from 'services/apis';
import { closeModal, openModal } from 'utils/modal';
import { getValue } from 'storage/index';
import { SELECTED_LANGUAGE } from 'storage/constants';
import {
  LanguageKeyForAPIEnum,
  LanguageKeys,
} from 'components/LanguageSwitcher/LanguageSwitcher.types';
import { getISOString } from 'utils/formatDate';
import { PAYMENT_SUCCESS_SCREEN } from 'navigation/ScreenNames';
import { AutoPaymentReq } from 'services/apis/paymentsAPI/paymentsAPI.types';
import { AutoPaymentTypeEnum } from 'services/apis/productsAPI/productsAPI.types';

const savedLanguage = getValue(SELECTED_LANGUAGE);

export const useNewAutomaticPaymentDetails = () => {
  const { params } = useRoute<ModalStackRouteProps<'NewAutomaticPaymentDetailsScreen'>>();
  const { debtVerifyResults, providerItem, automaticPaymentForm, subscriberFieldsValue } =
    params || {};
  const [addAutoPayment] = useAddAutomaticPaymentMutation();
  const { navigate } = useNavigation<ModalStackScreenProps<'PaymentSuccessScreen'>>();

  const addAutomaticPayment = useCallback(() => {
    addAutoPayment({
      sendOtp: true,
    });

    const request: AutoPaymentReq = {
      sendOtp: false,
      name: automaticPaymentForm.title,
      startDate: getISOString(automaticPaymentForm.startDate),
      serviceId: providerItem.id,
      type: automaticPaymentForm.paymentMethod?.type,
      debtVerifyFieldValues: subscriberFieldsValue,
      accountId: automaticPaymentForm.account?.accountId,
      culture:
        savedLanguage === LanguageKeys.geo ? LanguageKeyForAPIEnum.KA : LanguageKeyForAPIEnum.EN,
    };

    if (automaticPaymentForm.paymentDate) {
      request.payDay = automaticPaymentForm.paymentDate;
    }

    if (automaticPaymentForm.endDate) {
      request.endDate = getISOString(automaticPaymentForm.endDate);
    }

    if (automaticPaymentForm.paymentMethod?.type === AutoPaymentTypeEnum.FixedAmount) {
      request.fixedAmount = parseFloat(automaticPaymentForm.amount);
    } else {
      request.maxAmount = parseFloat(automaticPaymentForm.amount);
    }

    openModal({
      element: (
        <OTPModal
          onFinished={code => {
            if (code === '000000') {
              addAutoPayment(request)
                .unwrap()
                .then(() => {
                  closeModal();
                  navigate(PAYMENT_SUCCESS_SCREEN, {
                    providerItem,
                    amount: parseFloat(automaticPaymentForm.amount),
                  });
                });
            }
          }}
        />
      ),
      disableDynamicSizing: true,
      disablePanning: true,
    });
  }, [addAutoPayment, automaticPaymentForm, navigate, providerItem, subscriberFieldsValue]);

  return {
    debtVerifyResults,
    providerItem,
    automaticPaymentForm,
    addAutomaticPayment,
    savedLanguage,
  };
};
