import React, { useCallback } from 'react';
import { OTPModal } from 'components/index';
import { useAppSelector } from 'store/hooks/useAppSelector';
import { closeModal, openModal } from 'utils/modal';
import { useNavigation } from '@react-navigation/native';
import { ProductsStackScreenProps } from 'navigation/types';
import { LOAN_REQUEST_ACCEPTED_SCREEN } from 'navigation/ScreenNames';

export const useNewLoanDetails = () => {
  const { navigate } = useNavigation<ProductsStackScreenProps<'LoanRequestAcceptedScreen'>>();
  const newLoan = useAppSelector(state => state.loan);

  const handleRequestLoan = useCallback(() => {
    openModal({
      element: (
        <OTPModal
          onFinished={code => {
            if (code === '000000') {
              closeModal();
              navigate(LOAN_REQUEST_ACCEPTED_SCREEN);
            }
          }}
        />
      ),
      disableDynamicSizing: true,
      disablePanning: true,
    });
  }, [navigate]);

  return {
    newLoan,
    handleRequestLoan,
  };
};
