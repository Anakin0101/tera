import { useNavigation } from '@react-navigation/native';
import { LOAN_AMOUNT_SCREEN } from 'navigation/ScreenNames';
import { ProductsStackScreenProps } from 'navigation/types';

export const useLoanRequest = () => {
  const { navigate } = useNavigation<ProductsStackScreenProps<'LoanAmountScreen'>>();

  const handleNextPress = () => {
    navigate(LOAN_AMOUNT_SCREEN);
  };

  return { handleNextPress };
};
