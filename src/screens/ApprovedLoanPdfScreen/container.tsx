import { useCallback, useMemo, useState } from 'react';
import React from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import {
  ACTIVATE_LOAN_SUCCESS_SCREEN,
  APPROVED_LOAN_PDF_SCREEN,
  MODAL_STACK,
} from 'navigation/ScreenNames';
import { MainStackScreenProps, ModalStackRouteProps } from 'navigation/types';
import { OTPModal } from 'components/modals';
import { closeModal, openModal } from 'utils/modal';

const schedule = 'products.printloanschedules.419d5530-011d-4705-8012-6ca7e446d9e5.pdf';
const history = 'products.printloanpayments.778aaf65-e2fb-4320-b85c-596a4ee4a863.pdf';

export const useApproveLoanPdf = () => {
  const { push, navigate } = useNavigation<MainStackScreenProps<'ModalStack'>>();
  const { params } = useRoute<ModalStackRouteProps<'ApprovedLoanPdfScreen'>>();
  const { isLastStep } = params || {};
  const [isChecked, setIsChecked] = useState(false);

  const navigateTo = useCallback(() => {
    push(MODAL_STACK, {
      screen: APPROVED_LOAN_PDF_SCREEN,
      params: { isLastStep: true },
    });
  }, [push]);

  const navigateToFinish = useCallback(() => {
    navigate(MODAL_STACK, {
      screen: ACTIVATE_LOAN_SUCCESS_SCREEN,
    });
  }, [navigate]);

  const onFinished = useCallback(
    (otp: string) => {
      if (otp === '000000') {
        // TODO:  make request
        closeModal();
        navigateToFinish();
      }
    },
    [navigateToFinish],
  );

  const activateLoan = useCallback(() => {
    openModal({
      element: <OTPModal onFinished={onFinished} />,
      withKeyboard: true,
      disableDynamicSizing: true,
      disablePanning: true,
    });
  }, [onFinished]);

  const handlePress = useCallback(() => {
    isLastStep ? activateLoan() : navigateTo();
  }, [activateLoan, isLastStep, navigateTo]);

  // temp
  const pdf = useMemo(() => {
    return isLastStep ? history : schedule;
  }, [isLastStep]);

  return {
    handlePress,
    isChecked,
    setIsChecked,
    pdf,
  };
};
