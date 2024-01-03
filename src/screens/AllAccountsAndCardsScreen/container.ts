import { skipToken } from '@reduxjs/toolkit/dist/query';
import { useGetOffersQuery } from 'services/apis/productsAPI/productsAPI';
import { useAppSelector } from 'store/hooks/useAppSelector';

export const useAllAcounts = () => {
  const userProfileInfo = useAppSelector(state => state.profile.userProfileInfo);
  const customerId = userProfileInfo?.customerId;
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
