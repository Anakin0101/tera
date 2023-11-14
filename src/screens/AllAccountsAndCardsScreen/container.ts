import { skipToken } from '@reduxjs/toolkit/dist/query';
import { useGetOffersQuery } from 'services/apis/productsAPI/productsAPI';
import { useAppSelector } from 'store/hooks/useAppSelector';

export const useAllAcounts = () => {
  const { customerId } = useAppSelector(state => state.profile);
  const { data: offers } = useGetOffersQuery(customerId ?? skipToken);
  const { groupedAccountsByIban, totalAvailableBalanceGEL } = useAppSelector(
    state => state.products,
  );

  return {
    groupedAccountsByIban,
    totalAvailableBalanceGEL,
    offers,
  };
};
