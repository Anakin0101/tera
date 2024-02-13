import { useAppSelector } from 'store/hooks/useAppSelector';
import { useMemo } from 'react';
import { useGetPaymentServicesQuery } from 'services/apis';

export const useNewPayment = () => {
  const { isAdult = false } = useAppSelector(state => state.profile?.userProfileInfo) || {};

  const { data, isLoading, isFetching } = useGetPaymentServicesQuery({ isAdult });

  const sortedProvidersGroups = useMemo(() => {
    let newArray = data?.providersGroups || [];
    if (newArray.length) {
      return [...newArray].sort((a, b) => a?.order - b?.order) || [];
    } else {
      return newArray;
    }
  }, [data?.providersGroups]);

  const parkingAndFinesProviderItem = useMemo(() => {
    return sortedProvidersGroups.filter(item => item.id === 13)?.[0];
  }, [sortedProvidersGroups]);

  return {
    providersGroups: sortedProvidersGroups,
    isLoading: isLoading || isFetching,
    parkingAndFinesProviderItem,
  };
};
