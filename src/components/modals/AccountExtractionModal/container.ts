import { useCallback, useEffect, useMemo, useState } from 'react';
import dayjs from 'dayjs';
import { useCulture } from 'hooks';
import { groupTransactionsByDate } from 'utils/groupData';
import { useGetCustomerOperationsMutation, useGetStatementMutation } from 'services/apis';
import { getCurrentDateISO, getDateThreeMonthAgeISO, getISOString } from 'utils/formatDate';
import {
  Account,
  FileFormatEnum,
  CustomerOperationsReq,
} from 'services/apis/productsAPI/productsAPI.types';
import { downloadPdf } from 'utils/downloadPdf';
import { closeModal } from 'utils/modal';
import { EXCEL_EXT, EXCEL_MIME_TYPE, PDF_EXT, PDF_MIME_TYPE } from 'constants/common';

const getStartDateByTemplateId = (id: number) => {
  let value = 1;
  let unit: dayjs.ManipulateType = 'month';

  switch (id) {
    case 1:
      value = 3;
      break;
    case 2:
      value = 6;
      break;
    case 3:
      unit = 'year';
      break;
  }

  return dayjs().subtract(value, unit).toISOString();
};

export const useAccountExtraction = (selectedAccountFromCard: Account) => {
  const { culture } = useCulture();
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [selectedTemplateId, setSelectedTemplateId] = useState<number | null>(null);
  const [fileFormat, setFileFormat] = useState<FileFormatEnum>();
  const [getCustomerOperations, { data: customerOperations, isLoading: isLoadingOps }] =
    useGetCustomerOperationsMutation();
  const [getStatement] = useGetStatementMutation();
  const [selectedAccount, setSelectedAccount] = useState(selectedAccountFromCard);

  const getCustomerOps = useCallback(() => {
    const request: CustomerOperationsReq = {
      count: 100,
      startDate: selectedTemplateId
        ? getStartDateByTemplateId(selectedTemplateId)
        : startDate
        ? getISOString(startDate)
        : getDateThreeMonthAgeISO(),
      endDate: endDate ? getISOString(endDate) : getCurrentDateISO(),
      accountNumber: selectedAccountFromCard?.accountNumber,
      currency: selectedAccountFromCard?.ccy,
      culture,
    };

    getCustomerOperations(request);
  }, [
    selectedAccountFromCard?.accountNumber,
    selectedAccountFromCard?.ccy,
    culture,
    endDate,
    startDate,
    selectedTemplateId,
    getCustomerOperations,
  ]);

  useEffect(() => {
    getCustomerOps();
  }, [getCustomerOps]);

  const sections = useMemo(() => {
    if (!customerOperations) {
      return [];
    }
    const groupedTransactions = groupTransactionsByDate(customerOperations);
    return groupedTransactions;
  }, [customerOperations]);

  const isDisabledDownload = useMemo(() => {
    return !fileFormat || isLoadingOps || !sections.length;
  }, [fileFormat, isLoadingOps, sections.length]);

  const downloadStatement = useCallback(() => {
    if (!fileFormat || !sections.length) {
      return;
    }
    closeModal();
    getStatement({
      culture,
      accountNumber: selectedAccount?.accountNumber,
      currency: selectedAccount?.ccy,
      startDate: selectedTemplateId
        ? getStartDateByTemplateId(selectedTemplateId)
        : startDate
        ? getISOString(startDate)
        : getDateThreeMonthAgeISO(),
      endDate: endDate ? getISOString(endDate) : getCurrentDateISO(),
      fileFormat,
      otp: '',
      isTeraWallet: false,
    })
      .unwrap()
      .then(fileId => {
        const id = fileId?.slice(-10);
        const title = `Statement_${selectedAccountFromCard?.ccy}_${id}`;
        downloadPdf(
          fileId,
          title,
          fileFormat === FileFormatEnum.Excel ? EXCEL_EXT : PDF_EXT,
          fileFormat === FileFormatEnum.Excel ? EXCEL_MIME_TYPE : PDF_MIME_TYPE,
        );
      });
  }, [
    culture,
    endDate,
    fileFormat,
    getStatement,
    sections.length,
    selectedAccount?.accountNumber,
    selectedAccount?.ccy,
    selectedAccountFromCard?.ccy,
    selectedTemplateId,
    startDate,
  ]);

  return {
    isLoadingOps,
    sections,
    isDisabledDownload,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    selectedTemplateId,
    setSelectedTemplateId,
    fileFormat,
    setFileFormat,
    selectedAccount,
    setSelectedAccount,
    downloadStatement,
  };
};
