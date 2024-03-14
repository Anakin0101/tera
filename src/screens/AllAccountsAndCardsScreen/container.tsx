import React, { useLayoutEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { ModalStackScreenProps } from 'navigation/types';
import { useAppSelector } from 'store/hooks/useAppSelector';
import { HeaderRight } from './HeaderRight';
import { useGetBannersQuery } from 'services/apis';
import { useCulture } from 'hooks/useCulture';

export const useAllAcounts = () => {
  const { culture: language } = useCulture();
  const { groupedAccountsByIban, totalAvailableBalanceGEL } = useAppSelector(
    state => state.products,
  );
  const { setOptions } = useNavigation<ModalStackScreenProps<'AllAccountsAndCardsScreen'>>();

  const { data: banners, isLoading: bannersLoading } = useGetBannersQuery({
    language,
    channel: 'internet-bank',
    page: 'dashboard-main',
    isCorporate: false,
  });

  useLayoutEffect(() => {
    setOptions({
      headerRight: () => <HeaderRight onPress={() => {}} />,
    });
  }, [setOptions]);

  return {
    groupedAccountsByIban,
    totalAvailableBalanceGEL,
    banners: banners?.data || [],
    bannersLoading,
  };
};
