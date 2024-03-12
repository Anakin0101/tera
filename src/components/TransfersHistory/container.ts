import { useMemo } from 'react';
import { useListCustomerTransfersQuery } from 'services/apis';

export const enum TransferListTypeEnum {
  receive = 1,
  send = 0,
}

export const useTransfersHistoryServices = (transferType: number) => {
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

  return {
    isLoading: isLoading || isFetching,
    data: data?.customerTransferList || [],
  };
};
