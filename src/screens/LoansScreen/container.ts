import { useNavigation } from '@react-navigation/native';
import { APPROVED_LOAN_DETAILS_SCREEN, LOAN_REQUEST_SCREEN } from 'navigation/ScreenNames';
import { ProductsStackScreenProps } from 'navigation/types';
import { useCallback } from 'react';
import { useAppSelector } from 'store/hooks/useAppSelector';

export const useLoans = () => {
  const { navigate } = useNavigation<ProductsStackScreenProps<'LoanRequestScreen'>>();
  const { loans, totalDebtGEL, overdrafts, creditCards } = useAppSelector(state => state.products);
  const data = [...overdrafts, ...creditCards, ...loans];

  const handleNewLoanPress = useCallback(() => {
    navigate(LOAN_REQUEST_SCREEN);
  }, [navigate]);

  const handleActivateLoanPress = useCallback(() => {
    navigate(APPROVED_LOAN_DETAILS_SCREEN);
  }, [navigate]);

  return {
    loans,
    totalDebtGEL,
    data,
    handleNewLoanPress,
    handleActivateLoanPress,
  };
};
