import { useMemo } from 'react';
import { useGetRatesQuery } from 'services/apis';
import { groupRates } from 'utils/groupData';

export const useExchangeRates = () => {
  const { data: rates, isLoading: isRatesLoading } = useGetRatesQuery();

  const groupedRates = useMemo(() => {
    return groupRates(rates);
  }, [rates]);

  return {
    rates,
    isRatesLoading,
    groupedRates,
  };
};
