import { useNavigation } from '@react-navigation/native';
import { APPROVED_LOAN_DETAILS_SCREEN, LOAN_REQUEST_SCREEN } from 'navigation/ScreenNames';
import { useCallback, useMemo } from 'react';
import { useGetOffersQuery } from 'services/apis';
import { OfferTypeEnum } from 'services/apis/productsAPI/productsAPI.types';
import { ModalStackScreenProps } from 'navigation/types';
import { useAppSelector } from 'store/hooks/useAppSelector';

export const useLoans = () => {
  const { navigate } = useNavigation<ModalStackScreenProps<'LoanRequestScreen'>>();
  const { loans, totalDebtGEL, overdrafts, creditCards } = useAppSelector(state => state.products);
  const data = [...overdrafts, ...creditCards, ...loans];
  const { data: offers } = useGetOffersQuery();

  const handleNewLoanPress = useCallback(() => {
    navigate(LOAN_REQUEST_SCREEN);
  }, [navigate]);

  const handleActivateLoanPress = useCallback(() => {
    navigate(APPROVED_LOAN_DETAILS_SCREEN);
  }, [navigate]);

  const creditDisbursements = useMemo(() => {
    return offers?.filter(offer => offer.type === OfferTypeEnum.CreditDisbursement);
  }, [offers]);

  return {
    loans,
    totalDebtGEL,
    data,
    handleNewLoanPress,
    handleActivateLoanPress,
    creditDisbursements,
  };
};
