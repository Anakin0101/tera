import React, { useEffect } from 'react';
import { Bookmark, Calendar, Download, Repeat } from 'assets/SVGs';
import { useMemo } from 'react';
import { useGetTransactionDetailsMutation } from 'services/apis/productsAPI/productsAPI';

export const useTransactionDetails = () => {
  const [getTransactionDetails] = useGetTransactionDetailsMutation();

  useEffect(() => {
    getTransactionDetails(604933834);
  }, [getTransactionDetails]);

  const actions = useMemo(() => {
    return [
      {
        title: 'transactionDetails.refund',
        icon: <Repeat />,
        handlePress: () => {},
      },
      {
        title: 'transactionDetails.automaticTransfers',
        icon: <Calendar />,
        handlePress: () => {},
      },
      {
        title: 'transactionDetails.saveAsTemplate',
        icon: <Bookmark />,
        handlePress: () => {},
      },
      {
        title: 'transactionDetails.downloadReceipt',
        icon: <Download />,
        handlePress: () => {},
      },
    ];
  }, []);

  return {
    actions,
  };
};
