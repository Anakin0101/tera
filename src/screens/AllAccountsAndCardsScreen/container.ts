import { useGetOffersQuery } from 'services/apis/productsAPI/productsAPI';
import { useAppSelector } from 'store/hooks/useAppSelector';

export const useAllAcounts = () => {
  const { data: offers } = useGetOffersQuery();
  const { groupedAccountsByIban, totalAvailableBalanceGEL } = useAppSelector(
    state => state.products,
  );

  return {
    groupedAccountsByIban,
    totalAvailableBalanceGEL,
    offers,
  };
};
