import React, { useLayoutEffect } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { ModalStackRouteProps, ModalStackScreenProps } from 'navigation/types';
import { useAppSelector } from 'store/hooks/useAppSelector';
import { HeaderRight } from './HeaderRight';
import { useGetBannersQuery } from 'services/apis';
import { useCulture } from 'hooks/useCulture';

export const useAllAcounts = () => {
  const { culture: language } = useCulture();
  const { groupedAccountsByIban } = useAppSelector(state => state.products);
  const { setOptions } = useNavigation<ModalStackScreenProps<'AllAccountsAndCardsScreen'>>();
  const { params } = useRoute<ModalStackRouteProps<'AllAccountsAndCardsScreen'>>();
  const { groupedUserBalance } = params || {};

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
    banners: banners?.data || [],
    bannersLoading,
    groupedUserBalance,
  };
};
