import { useMemo } from 'react';
import {
  useGetLoanHistoryQuery,
  useGetLoanScheduleQuery,
} from 'services/apis/productsAPI/productsAPI';
import { isDateBefore } from 'utils/formatDate';

export const useLoanSchedules = (creditId: number, showHistory?: boolean) => {
  const { data: loanSchedule } = useGetLoanScheduleQuery(creditId, { skip: showHistory });
  const { data: loanHistory } = useGetLoanHistoryQuery(creditId, { skip: !showHistory });

  const data = showHistory ? loanHistory : loanSchedule;

  const totalPayable = useMemo(() => {
    const current = loanSchedule?.find(item => isDateBefore(item.nextPaymentDay));
    return current?.balance || 0;
  }, [loanSchedule]);

  const totalPaid = useMemo(() => {
    return loanHistory?.reduce((acc, cur) => acc + cur.total, 0) || 0;
  }, [loanHistory]);

  const total = showHistory ? totalPaid : totalPayable;

  return {
    data,
    total,
  };
};
