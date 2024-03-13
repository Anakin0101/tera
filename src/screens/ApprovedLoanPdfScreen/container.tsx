import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import {
  MODAL_STACK,
  APPROVED_LOAN_PDF_SCREEN,
  ACTIVATE_LOAN_SUCCESS_SCREEN,
} from 'navigation/ScreenNames';
import { useCulture } from 'hooks';
import { MainStackScreenProps, ModalStackRouteProps } from 'navigation/types';
import { OTPModal } from 'components/modals';
import { closeModal, openModal } from 'utils/modal';
import {
  useGetCreditProductOfferAgreementQuery,
  useGetCreditProductOfferScheduleMutation,
  useLazyActivateCreditProductOfferQuery,
} from 'services/apis';

export const useApproveLoanPdf = () => {
  const { culture } = useCulture();
  const { push, navigate } = useNavigation<MainStackScreenProps<'ModalStack'>>();
  const { params } = useRoute<ModalStackRouteProps<'ApprovedLoanPdfScreen'>>();
  const { isLastStep, creditDisbursementId } = params || {};
  const [isChecked, setIsChecked] = useState(false);
  const { data: agreementFileId } = useGetCreditProductOfferAgreementQuery({
    creditDisbursementId,
    culture,
  });
  const [getCreditProductOfferSchedule, { data: scheduleFileId }] =
    useGetCreditProductOfferScheduleMutation();
  const [activateCreditProductOffer] = useLazyActivateCreditProductOfferQuery();

  const fetchOfferSchedule = useCallback(() => {
    if (isLastStep) {
      getCreditProductOfferSchedule({
        id: creditDisbursementId,
        culture,
      });
    }
  }, [creditDisbursementId, culture, getCreditProductOfferSchedule, isLastStep]);

  useEffect(() => {
    fetchOfferSchedule();
  }, [fetchOfferSchedule]);

  const navigateTo = useCallback(() => {
    push(MODAL_STACK, {
      screen: APPROVED_LOAN_PDF_SCREEN,
      params: { isLastStep: true, creditDisbursementId },
    });
  }, [creditDisbursementId, push]);

  const navigateToFinish = useCallback(() => {
    navigate(MODAL_STACK, { screen: ACTIVATE_LOAN_SUCCESS_SCREEN });
  }, [navigate]);

  const onFinished = useCallback(
    (otp: string) => {
      activateCreditProductOffer({
        sendOtp: true,
      });

      // TODO change condition
      if (otp === '000000') {
        activateCreditProductOffer({
          sendOtp: false,
          id: creditDisbursementId,
          otp,
          culture,
        })
          .unwrap()
          .then(() => {
            closeModal();
            navigateToFinish();
          });
      }
    },
    [activateCreditProductOffer, creditDisbursementId, culture, navigateToFinish],
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

  const pdf = useMemo(() => {
    return isLastStep ? scheduleFileId : agreementFileId;
  }, [agreementFileId, isLastStep, scheduleFileId]);

  return {
    handlePress,
    isChecked,
    setIsChecked,
    pdf,
  };
};
