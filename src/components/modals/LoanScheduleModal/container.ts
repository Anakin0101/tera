import { useCallback, useEffect, useMemo } from 'react';
import {
  useGetLoanHistoryQuery,
  useGetLoanScheduleQuery,
  usePrintLoanPaymentsMutation,
  usePrintLoanSchedulesMutation,
} from 'services/apis/productsAPI/productsAPI';
import { useCulture } from 'hooks/useCulture';
import { downloadPdf } from 'utils/downloadPdf';
import { FileFormatEnum } from 'services/apis/productsAPI/productsAPI.types';
import { isDateBefore } from 'utils/formatDate';

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

  const data = useMemo(() => {
    return showHistory ? loanHistory : loanSchedule;
  }, [loanHistory, loanSchedule, showHistory]);

  const currentId = useMemo(() => {
    if (showHistory) {
      return;
    }

    return loanSchedule?.find(item => isDateBefore(item?.nextPaymentDay))?.id;
  }, [loanSchedule, showHistory]);

  return {
    data,
    downloadLoanSchedules,
    currentId,
  };
};
