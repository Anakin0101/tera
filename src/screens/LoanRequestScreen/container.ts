import { useNavigation } from '@react-navigation/native';
import { LOAN_AMOUNT_SCREEN } from 'navigation/ScreenNames';
import { ModalStackScreenProps } from 'navigation/types';

export const useLoanRequest = () => {
  const { navigate } = useNavigation<ModalStackScreenProps<'LoanAmountScreen'>>();

  const handleNextPress = () => {
    navigate(LOAN_AMOUNT_SCREEN);
  };

  return { handleNextPress };
};
