import { useNavigation } from '@react-navigation/native';
import { LOAN_REQUEST_SCREEN } from 'navigation/ScreenNames';
import { useCallback, useMemo } from 'react';
import { useGetOffersQuery } from 'services/apis';
import { OfferTypeEnum } from 'services/apis/productsAPI/productsAPI.types';
import { ModalStackScreenProps } from 'navigation/types';
import { useAppSelector } from 'store/hooks/useAppSelector';

export const useLoans = () => {
  const { navigate } = useNavigation<ModalStackScreenProps<'LoanRequestScreen'>>();
  const { loans, totalDebtGEL, overdrafts, creditCards } = useAppSelector(state => state.products);
  const { data: offers } = useGetOffersQuery();

  const creditDisbursements = useMemo(() => {
    return offers?.filter(offer => offer.type === OfferTypeEnum.CreditDisbursement) || [];
  }, [offers]);

  const allLoans = [...overdrafts, ...creditCards, ...loans, ...creditDisbursements];

  const handleNewLoanPress = useCallback(() => {
    navigate(LOAN_REQUEST_SCREEN);
  }, [navigate]);

  return {
    loans,
    totalDebtGEL,
    allLoans,
    handleNewLoanPress,
    creditDisbursements,
  };
};
