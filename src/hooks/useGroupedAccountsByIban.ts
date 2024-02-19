import { useGetAccountsByCustomerIdQuery } from 'services/apis/productsAPI/productsAPI';
import { useAppSelector } from 'store/hooks/useAppSelector';

export const useGroupedAccountsByIban = () => {
  const { groupedAccountsByIban } = useAppSelector(state => state.products);
  const {
    data: accounts,
    isLoading: isLoadingAccounts,
    refetch,
  } = useGetAccountsByCustomerIdQuery();

  return {
    accounts,
    isLoadingAccounts,
    groupedAccountsByIban,
    refetch,
  };
};
