import React, { useCallback } from 'react';
import { OTPModal } from 'components/index';
import { useAppSelector } from 'store/hooks/useAppSelector';
import { openModal } from 'utils/modal';

export const useNewLoanDetails = () => {
  const newLoan = useAppSelector(state => state.loan);

  const handleRequestLoan = useCallback(() => {
    openModal({
      element: (
        <OTPModal
          onFinished={code => {
            if (code === '000000') {
            }
          }}
        />
      ),
      disableDynamicSizing: true,
      disablePanning: true,
    });
  }, []);

  return {
    newLoan,
    handleRequestLoan,
  };
};
