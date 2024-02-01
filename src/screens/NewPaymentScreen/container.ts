import { useAppSelector } from 'store/hooks/useAppSelector';
import { useGetPaymentServicesQuery } from 'services/apis/paymentsAPI/paymentsAPI';
import { useEffect, useMemo } from 'react';

export const useNewPayment = () => {
  const { isAdult = false } = useAppSelector(state => state.profile?.userProfileInfo) || {};

  const { data, isLoading, refetch, isFetching } = useGetPaymentServicesQuery({ isAdult });

  useEffect(() => {
    refetch();
  }, [refetch]);

  const sortedProvidersGroups = useMemo(() => {
    let newArray = data?.providersGroups || [];
    if (newArray.length) {
      return [...newArray].sort((a, b) => a?.order - b?.order) || [];
    } else {
      return newArray;
    }
  }, [data?.providersGroups]);

  return {
    providersGroups: sortedProvidersGroups,
    isLoading: isLoading || isFetching,
  };
};
