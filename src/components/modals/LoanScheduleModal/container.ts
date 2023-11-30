import { skipToken } from '@reduxjs/toolkit/dist/query';
import { useMemo } from 'react';
import { useGetLoanScheduleQuery } from 'services/apis/productsAPI/productsAPI';
import { isDateBefore } from 'utils/formatDate';

export const useLoanSchedules = (creditId: number) => {
  const { data: loanSchedule } = useGetLoanScheduleQuery(creditId ?? skipToken);

  const totalPayable = useMemo(() => {
    const current = loanSchedule?.find(item => isDateBefore(item.nextPaymentDay));
    return current?.balance || 0;
  }, [loanSchedule]);

  return {
    loanSchedule,
    totalPayable,
  };
};
