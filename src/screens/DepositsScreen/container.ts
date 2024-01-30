import { useNavigation } from '@react-navigation/native';
import { SELECT_DEPOSIT_SCREEN } from 'navigation/ScreenNames';
import { ProductsStackScreenProps } from 'navigation/types';
import { useCallback } from 'react';
import { useAppSelector } from 'store/hooks/useAppSelector';

export const useDepositsScreen = () => {
  const { navigate } = useNavigation<ProductsStackScreenProps<'SelectDepositScreen'>>();
  const { deposits, totalDepositsGEL } = useAppSelector(state => state.products);

  const handleNewDepositPress = useCallback(() => {
    navigate(SELECT_DEPOSIT_SCREEN);
  }, [navigate]);

  return {
    deposits,
    totalDepositsGEL,
    handleNewDepositPress,
  };
};
