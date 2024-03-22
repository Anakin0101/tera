import React, { useCallback, useEffect } from 'react';
import { Bookmark, Calendar, Download, Repeat } from 'assets/SVGs';
import { useMemo } from 'react';
import { useAppDispatch } from 'store/hooks/useAppDispatch';
import { setSelectedTransaction } from 'store/slices/products';
import { usePrintOpsMutation } from 'services/apis';
import { useCulture } from 'hooks/useCulture';
import { useAppSelector } from 'store/hooks/useAppSelector';
import { downloadPdf } from 'utils/downloadPdf';
import { extractUUIDAndExtension } from 'utils/transactionUtils/extractUUIDAndExtension';
import { LoadingIconComponent } from 'components/LoadingView';
import { openToast } from 'utils/toast';
import { useTranslation } from 'react-i18next';

export const useTransactionDetails = () => {
  const dispatch = useAppDispatch();
  const { selectedTransaction: operation } = useAppSelector(state => state.products);
  const [printOps, { isLoading: printOpsLoading }] = usePrintOpsMutation();
  const { culture } = useCulture();
  const { t } = useTranslation();
  useEffect(() => {
    return () => {
      dispatch(setSelectedTransaction(null));
    };
  }, [dispatch]);

  const downloadTransactionReceipt = useCallback(async () => {
    if (operation?.id) {
      try {
        await printOps({ params: { opId: operation.id }, body: { culture } })
          .unwrap()
          .then(fileId => {
            const extractedFieldId = extractUUIDAndExtension(fileId?.fileId);

            const title = `Transaction_receipt_${operation.id}_${extractedFieldId}`;
            downloadPdf(extractedFieldId, title);
          });
      } catch (err) {
        openToast(`${t('transactionDetails.downloadReceiptError')}`, 'error');
        console.warn('Error during printOps: ', err);
      }
    }
  }, [culture, operation?.id, printOps, t]);

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
        icon: printOpsLoading ? <LoadingIconComponent size={24} /> : <Download />,
        handlePress: () => downloadTransactionReceipt(),
      },
    ];
  }, [downloadTransactionReceipt, printOpsLoading]);

  return {
    actions,
  };
};
