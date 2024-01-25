import { useAppSelector } from 'store/hooks/useAppSelector';
import { useGetPaymentServicesQuery } from 'services/apis/paymentsAPI/paymentsAPI';
import { useEffect } from 'react';

export const useNewPayment = () => {
  const { isAdult = false } = useAppSelector(state => state.profile?.userProfileInfo) || {};

  const {
    data: providersGroups,
    isLoading,
    refetch,
    isFetching,
  } = useGetPaymentServicesQuery({ isAdult });

  useEffect(() => {
    refetch();
  }, [refetch]);

  return {
    providersGroups,
    isLoading: isLoading || isFetching,
  };
};
