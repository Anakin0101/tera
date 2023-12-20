import React, { useEffect } from 'react';
import { Bookmark, Calendar, Download, Repeat } from 'assets/SVGs';
import { useMemo } from 'react';
import { useAppDispatch } from 'store/hooks/useAppDispatch';
import { setSelectedTransaction } from 'store/slices/products';

export const useTransactionDetails = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    return () => {
      dispatch(setSelectedTransaction(null));
    };
  }, [dispatch]);

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
