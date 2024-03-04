import { useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';
import { APPROVED_LOAN_PDF_SCREEN, MODAL_STACK } from 'navigation/ScreenNames';
import { MainStackScreenProps } from 'navigation/types';

export const useApproveLoanDetails = () => {
  const { navigate } = useNavigation<MainStackScreenProps<'ModalStack'>>();

  const handlePress = useCallback(() => {
    navigate(MODAL_STACK, {
      screen: APPROVED_LOAN_PDF_SCREEN,
    });
  }, [navigate]);

  return { handlePress };
};
