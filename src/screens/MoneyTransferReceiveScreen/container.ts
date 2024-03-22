import { useMemo } from 'react';
import { useGetTwrMTSystemsQuery } from 'services/apis';
import { mtReceiveSystemList } from 'utils/moneyTransfer';

export const useMoneyTransferReceive = () => {
  const { data, isLoading } = useGetTwrMTSystemsQuery();

  const mtSystemArray = useMemo(() => {
    return mtReceiveSystemList.filter(item =>
      data?.mtSystem?.some(arrItem => arrItem.mtSystem === item?.key),
    );
  }, [data?.mtSystem]);

  return {
    mtSystemArray,
    isLoading: isLoading,
  };
};
