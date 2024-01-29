import { useNavigation } from '@react-navigation/native';
import { PRODUCTS_SCREEN } from 'navigation/ScreenNames';
import { ProductsStackScreenProps } from 'navigation/types';
import { useAppSelector } from 'store/hooks/useAppSelector';

export const useLoanRequestAccepted = () => {
  const { loanType } = useAppSelector(state => state.loan);
  const { reset } = useNavigation<ProductsStackScreenProps<'ProductsScreen'>>();

  const handleHomePress = () => {
    reset({
      index: 0,
      routes: [{ name: PRODUCTS_SCREEN }],
    });
  };

  return {
    loanType,
    handleHomePress,
  };
};
