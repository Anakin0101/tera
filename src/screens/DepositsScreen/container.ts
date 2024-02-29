import { useNavigation } from '@react-navigation/native';
import { useCulture } from 'hooks';
import { SELECT_DEPOSIT_SCREEN } from 'navigation/ScreenNames';
import { ProductsStackScreenProps } from 'navigation/types';
import { useCallback } from 'react';
import { useGetBannersQuery } from 'services/apis';
import { useAppSelector } from 'store/hooks/useAppSelector';

export const useDepositsScreen = () => {
  const { culture: language } = useCulture();
  const { navigate } = useNavigation<ProductsStackScreenProps<'SelectDepositScreen'>>();
  const { deposits, totalDepositsGEL } = useAppSelector(state => state.products);
  const { data: banners, isLoading: bannersLoading } = useGetBannersQuery({
    language,
    channel: 'internet-bank',
    page: 'dashboard-main',
    isCorporate: false,
  });

  const handleNewDepositPress = useCallback(() => {
    navigate(SELECT_DEPOSIT_SCREEN);
  }, [navigate]);

  return {
    deposits,
    totalDepositsGEL,
    handleNewDepositPress,
    banners: banners?.data || [],
    bannersLoading,
  };
};
