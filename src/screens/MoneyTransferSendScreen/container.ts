import { useMemo } from 'react';
import { useGetTsMTSystemsQuery } from 'services/apis';
import { mtSendSystemList } from 'utils/moneyTransfer';

export const useMoneyTransferSend = () => {
  const { data, isLoading } = useGetTsMTSystemsQuery();

  const mtSystemArray = useMemo(() => {
    return mtSendSystemList.filter(item =>
      data?.mtSystem?.some(arrItem => arrItem?.mtSystem === item?.id),
    );
  }, [data?.mtSystem]);

  return {
    mtSystemArray,
    isLoading: isLoading,
  };
};
