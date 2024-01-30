import React, { useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';
import { OTPModal } from 'components/index';
import { getISOString } from 'utils/formatDate';
import { closeModal, openModal } from 'utils/modal';
import { useRequestForLoanMutation } from 'services/apis';
import { useAppSelector } from 'store/hooks/useAppSelector';
import { LOAN_REQUEST_ACCEPTED_SCREEN } from 'navigation/ScreenNames';
import { ProductsStackScreenProps } from 'navigation/types';

export const useNewLoanDetails = () => {
  const { navigate } = useNavigation<ProductsStackScreenProps<'LoanRequestAcceptedScreen'>>();
  const newLoan = useAppSelector(state => state.loan);
  const [requestForLoan] = useRequestForLoanMutation();

  const handleRequestLoan = useCallback(() => {
    requestForLoan({
      sendOtp: true,
    });

    openModal({
      element: (
        <OTPModal
          onFinished={code => {
            if (code === '000000') {
              requestForLoan({
                sendOtp: false,
                amount: parseFloat(newLoan?.amount),
                monthlyNetIncome: parseFloat(newLoan?.income),
                interval: parseFloat(newLoan?.duration),
                productsGroupId: newLoan?.productsGroupId || 0,
                currency: newLoan?.currency,
                employerName: newLoan?.workplace,
                position: newLoan?.position,
                allowToCheckCreditInfo: true,
                allowToCheckRevenue: true,
                allowToCheckMessageInfo: true,
                paymentDate: getISOString(newLoan?.paymentDate),
                incomeType: newLoan?.typeOfIncome?.[0].type,
                otp: code,
              })
                .unwrap()
                .then(() => {
                  closeModal();
                  navigate(LOAN_REQUEST_ACCEPTED_SCREEN);
                });
            }
          }}
        />
      ),
      disableDynamicSizing: true,
      disablePanning: true,
    });
  }, [navigate, newLoan, requestForLoan]);

  return {
    newLoan,
    handleRequestLoan,
  };
};
