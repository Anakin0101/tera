import { useEffect, useState } from 'react';
import { useRoute } from '@react-navigation/native';

import { MainStackRouteProps } from 'navigation/types';
import { useLazyCheckTransferStatusQuery, useLazyGetMoneyTransferInfoQuery } from 'services/apis';
import { TransferListTypeEnum } from 'components/TransfersHistory/container';
import { Transfer, TransferInfo } from 'services/apis/moneyTransfersAPI/moneyTransfersAPI.types';
import { openToast } from 'utils/toast';

export const useMoneyTransferDetails = () => {
  const { params } = useRoute<MainStackRouteProps<'MoneyTransferDetailsScreen'>>();
  const { transferDetails, transferType } = params;
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [transferInfo, setTransferInfo] = useState<TransferInfo>();
  const [transfer, setTransfer] = useState<Transfer>();

  const [getMoneyTransferInfoQuery] = useLazyGetMoneyTransferInfoQuery();
  const [checkTransferStatus] = useLazyCheckTransferStatusQuery();

  useEffect(() => {
    try {
      if (transferType === TransferListTypeEnum.receive) {
        checkTransferStatus({ transferId: transferDetails?.transferId })
          .unwrap()
          .then(resp => {
            if (resp.transferInfo) {
              setTransferInfo(resp.transferInfo);
            }
            setIsLoading(false);
          })
          .catch(ex => {
            setIsLoading(false);
            if ('data' in ex && ex?.data?.title) {
              openToast(ex.data.title, 'error');
            }
          });
      } else {
        getMoneyTransferInfoQuery({ internalTransferId: transferDetails?.transferId })
          .unwrap()
          .then(resp => {
            if (resp.transfer) {
              setTransfer(resp.transfer);
              setIsLoading(false);
            }
          })
          .catch(ex => {
            setIsLoading(false);
            if ('data' in ex && ex?.data?.title) {
              openToast(ex.data.title, 'error');
            }
          });
      }
    } catch (e) {
      console.warn('check transfer details', e);
      setIsLoading(false);
    }
  }, [
    checkTransferStatus,
    getMoneyTransferInfoQuery,
    transferDetails.status,
    transferDetails?.transferId,
    transferDetails.transferType,
    transferType,
  ]);

  return {
    isLoading,
    transferInfo,
    transfer,
    transferType,
    transferDetails,
  };
};
