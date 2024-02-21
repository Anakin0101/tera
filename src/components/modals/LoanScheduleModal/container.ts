import { useCallback, useEffect, useMemo } from 'react';
import {
  useGetLoanHistoryQuery,
  useGetLoanScheduleQuery,
  usePrintLoanPaymentsMutation,
  usePrintLoanSchedulesMutation,
} from 'services/apis/productsAPI/productsAPI';
import { isDateBefore } from 'utils/formatDate';
import { useCulture } from 'hooks/useCulture';
import { downloadPdf } from 'utils/downloadPdf';
import { FileFormatEnum } from 'services/apis/productsAPI/productsAPI.types';

export const useLoanSchedules = (creditId: number, showHistory?: boolean) => {
  const { data: loanSchedule } = useGetLoanScheduleQuery(creditId, { skip: showHistory });
  const { data: loanHistory } = useGetLoanHistoryQuery(creditId, { skip: !showHistory });
  const { culture } = useCulture();
  const [printLoanSchedules, { data: scheduleFileId }] = usePrintLoanSchedulesMutation();
  const [printLoanPayments, { data: paymentsFileId }] = usePrintLoanPaymentsMutation();

  const getFileId = useCallback(() => {
    const payload = {
      culture,
      loanId: creditId,
      fileFormat: FileFormatEnum.Pdf,
    };

    if (showHistory) {
      printLoanPayments(payload);
    } else {
      printLoanSchedules(payload);
    }
  }, [creditId, culture, printLoanPayments, printLoanSchedules, showHistory]);

  useEffect(() => {
    getFileId();
  }, [getFileId]);

  const downloadLoanSchedules = useCallback(() => {
    const fileId = showHistory ? paymentsFileId : scheduleFileId;

    if (!fileId) {
      return;
    }

    const id = fileId?.slice(-10);
    const title = showHistory ? `Loan History-${id}` : `Loan Schedule-${id}`;

    downloadPdf(fileId, title);
  }, [paymentsFileId, scheduleFileId, showHistory]);

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
    downloadLoanSchedules,
  };
};
