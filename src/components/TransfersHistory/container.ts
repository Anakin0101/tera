import { useNavigation } from '@react-navigation/native';
import { MODAL_STACK, MONEY_TRANSFER_DETAILS_SCREEN } from 'navigation/ScreenNames';
import { MainStackScreenProps } from 'navigation/types';
import { useCallback, useMemo } from 'react';
import { useListCustomerTransfersQuery } from 'services/apis';
import { MoneyTransferList } from 'services/apis/moneyTransfersAPI/moneyTransfersAPI.types';

export const enum TransferListTypeEnum {
  receive = 1,
  send = 0,
}

export const useTransfersHistoryServices = (transferType: number) => {
  const { navigate } = useNavigation<MainStackScreenProps<'ModalStack'>>();

  const requestData = useMemo(
    () => ({
      transferType: transferType,
      minAmount: 0,
      maxAmount: 10000000000,
      startDate: '2023-04-30T09:50:01.251Z',
      endDate: new Date().toISOString(),
      page: 0,
      itemsPerPage: 1000000,
      sortField: 1,
      sortOrder: 1,
    }),
    [transferType],
  );

  const { data, isLoading, isFetching } = useListCustomerTransfersQuery(requestData);

  const openTransferDetails = useCallback(
    (item: MoneyTransferList) => {
      navigate(MODAL_STACK, {
        screen: MONEY_TRANSFER_DETAILS_SCREEN,
        params: {
          transferDetails: item,
          transferType,
        },
      });
    },
    [navigate, transferType],
  );

  return {
    isLoading: isLoading || isFetching,
    data: data?.customerTransferList || [],
    openTransferDetails,
  };
};
